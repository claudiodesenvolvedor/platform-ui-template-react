import type { NavigationItem } from '../config/navigation'
import { navigationItems } from '../config/navigation'
import type { UserRole } from '../hooks/auth/AuthContext'

type BreadcrumbItem = Pick<NavigationItem, 'id' | 'label' | 'path'>

const isItemAllowed = (item: NavigationItem, userRole: UserRole) => {
  if (!item.roles || item.roles.length === 0) {
    return true
  }

  return item.roles.includes(userRole)
}

const sortByOrder = (items: NavigationItem[]) =>
  [...items].sort((a, b) => {
    const left = a.order ?? Number.MAX_SAFE_INTEGER
    const right = b.order ?? Number.MAX_SAFE_INTEGER
    return left - right
  })

const filterNavigationTree = (
  items: NavigationItem[],
  userRole: UserRole,
): NavigationItem[] =>
  sortByOrder(items).reduce<NavigationItem[]>((accumulator, item) => {
    const allowedChildren = item.children
      ? filterNavigationTree(item.children, userRole)
      : undefined
    const allowedByRole = isItemAllowed(item, userRole)
    const hasAllowedChildren = Boolean(allowedChildren && allowedChildren.length > 0)

    if (!allowedByRole && !hasAllowedChildren) {
      return accumulator
    }

    const nextItem: NavigationItem = {
      ...item,
      ...(allowedChildren ? { children: allowedChildren } : {}),
    }

    accumulator.push(nextItem)
    return accumulator
  }, [])

export const getAllowedNavigation = (userRole: UserRole): NavigationItem[] =>
  filterNavigationTree(navigationItems, userRole)

const isPathMatch = (currentPath: string, itemPath?: string) => {
  if (!itemPath) {
    return false
  }

  if (itemPath === '/') {
    return currentPath === '/'
  }

  return currentPath.startsWith(itemPath)
}

const findBreadcrumbTrail = (
  items: NavigationItem[],
  currentPath: string,
): BreadcrumbItem[] => {
  for (const item of sortByOrder(items)) {
    const currentItem: BreadcrumbItem = {
      id: item.id,
      label: item.label,
      path: item.path,
    }

    if (item.children && item.children.length > 0) {
      const nestedTrail = findBreadcrumbTrail(item.children, currentPath)
      if (nestedTrail.length > 0) {
        return [currentItem, ...nestedTrail]
      }
    }

    if (isPathMatch(currentPath, item.path)) {
      return [currentItem]
    }
  }

  return []
}

export const findBreadcrumb = (path: string): BreadcrumbItem[] =>
  findBreadcrumbTrail(navigationItems, path)
