import type { NavigationItem } from '../config/navigation'

type PageModule = Record<string, unknown>
type PageImporter = () => Promise<PageModule>

export interface AppRouteItem {
  path: string
  component: string
}

const pageModules = import.meta.glob('../pages/**/*.tsx') as Record<string, PageImporter>

export function resolveComponent(
  componentPath: string,
): () => Promise<{ default: any }> {
  const modulePath = `../pages/${componentPath}.tsx`
  const importModule = pageModules[modulePath]

  if (!importModule) {
    throw new Error(`Page not found: ${componentPath}`)
  }

  return async () => {
    const mod = await importModule()

    // Priority:
    // 1) default export
    // 2) named export using file name
    if (mod.default) {
      return { default: mod.default }
    }

    const exportName = componentPath.split('/').pop()
    if (exportName && mod[exportName]) {
      return { default: mod[exportName] }
    }

    throw new Error(`Component export not found in ${componentPath}`)
  }
}

export function extractRoutes(navigationItems: NavigationItem[]): AppRouteItem[] {
  const routes: AppRouteItem[] = []

  const visit = (items: NavigationItem[]) => {
    for (const item of items) {
      if (item.path && item.component) {
        routes.push({ path: item.path, component: item.component })
      }

      if (item.children?.length) {
        visit(item.children)
      }
    }
  }

  visit(navigationItems)
  return routes
}
