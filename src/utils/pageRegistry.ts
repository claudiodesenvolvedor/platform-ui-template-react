import type { UserRole } from '../hooks/auth/AuthContext'

type PageModule = Record<string, any>

type PageImporter = () => Promise<PageModule>

export interface PageRegistryItem {
  path: string
  component: string
  roles?: string[]
  label?: string
  group?: string
  order?: number
  featureFlag?: string
}

export interface NavigationNode {
  id: string
  label: string
  path?: string
  roles?: string[]
  order?: number
  children?: NavigationNode[]
}

const pageModules = import.meta.glob('../pages/**/*.tsx') as Record<string, PageImporter>
let cachedPages: PageRegistryItem[] | null = null

const isUserRole = (value: unknown): value is UserRole =>
  value === 'admin' || value === 'manager' || value === 'viewer'

export async function discoverPages(): Promise<PageRegistryItem[]> {
  const routes: PageRegistryItem[] = []

  for (const modulePath of Object.keys(pageModules)) {
    const importer = pageModules[modulePath]
    const mod = await importer()

    const clean = modulePath.replace('../pages/', '').replace('.tsx', '')
    const segments = clean.split('/')
    const fileName = segments[segments.length - 1]
    const meta = mod.pageMeta
    const featureFlag = meta?.featureFlag
    let path = ''
    let label = ''
    let roles: string[] = ['admin', 'manager', 'viewer']

    if (meta?.path) {
      path = meta.path
      label = meta.label ?? meta.path.replace('/', '')
      roles = Array.isArray(meta.roles)
        ? meta.roles.filter((role: unknown): role is UserRole => isUserRole(role))
        : roles
    } else if (fileName === 'DashboardPage') {
      path = '/'
      label = 'Dashboard'
    } else {
      const name = fileName.replace('Page', '')
      path = `/${name.toLowerCase()}`
      label = name
    }

    routes.push({
      path,
      component: clean,
      roles,
      label,
      group: meta?.group,
      order: meta?.order,
      featureFlag,
    })
  }

  return routes
}

export async function getPages(): Promise<PageRegistryItem[]> {
  if (cachedPages) {
    return cachedPages
  }

  cachedPages = await discoverPages()
  return cachedPages
}

export function buildNavigationFromPages(pages: PageRegistryItem[]): NavigationNode[] {
  const standalone: NavigationNode[] = []
  const grouped = new Map<string, NavigationNode>()

  for (const page of pages) {
    const item: NavigationNode = {
      id: page.path,
      label: page.label ?? page.path.replace('/', ''),
      path: page.path,
      roles: page.roles,
      order: page.order,
    }

    if (!page.group) {
      standalone.push(item)
      continue
    }

    if (!grouped.has(page.group)) {
      grouped.set(page.group, {
        id: page.group,
        label: page.group,
        children: [],
      })
    }

    grouped.get(page.group)?.children?.push(item)
  }

  const sortNodes = (nodes: NavigationNode[]) =>
    [...nodes].sort((left, right) => {
      const leftOrder = left.order ?? Number.MAX_SAFE_INTEGER
      const rightOrder = right.order ?? Number.MAX_SAFE_INTEGER
      if (leftOrder !== rightOrder) {
        return leftOrder - rightOrder
      }
      return left.label.localeCompare(right.label)
    })

  const groupedNodes = Array.from(grouped.values()).map((group) => ({
    ...group,
    children: sortNodes(group.children ?? []),
  }))

  return [...sortNodes(standalone), ...sortNodes(groupedNodes)]
}
