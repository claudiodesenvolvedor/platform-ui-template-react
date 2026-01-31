import { createContext, useContext, useEffect, useMemo } from 'react'
import type { ReactNode } from 'react'
import { getTheme, theme } from './theme'
import type { BrandName } from './theme'

export type Theme = typeof theme

const ThemeContext = createContext<Theme>(theme)

const applyThemeToRoot = (currentTheme: Theme) => {
  const root = document.documentElement

  root.style.setProperty('--color-primary', currentTheme.colors.primary)
  root.style.setProperty('--color-secondary', currentTheme.colors.secondary)
  root.style.setProperty('--color-background', currentTheme.colors.background)
  root.style.setProperty('--color-card', currentTheme.colors.card)
  root.style.setProperty('--color-text', currentTheme.colors.text)
  root.style.setProperty('--color-highlight', currentTheme.colors.highlight)
  root.style.setProperty('--color-danger', currentTheme.colors.danger)
  root.style.setProperty(
    '--color-text-secondary',
    currentTheme.colors.textSecondary,
  )
  root.style.setProperty('--color-border', currentTheme.colors.border)
  root.style.setProperty('--color-success', currentTheme.colors.success)
  root.style.setProperty('--color-warning', currentTheme.colors.warning)
  root.style.setProperty('--color-cta', currentTheme.colors.cta)

  root.style.setProperty('--font-family-base', currentTheme.typography.fontFamily)
  root.style.setProperty('--font-size-sm', currentTheme.typography.fontSizeSm)
  root.style.setProperty('--font-size-md', currentTheme.typography.fontSizeMd)
  root.style.setProperty('--font-size-lg', currentTheme.typography.fontSizeLg)
  root.style.setProperty('--font-size-xl', currentTheme.typography.fontSizeXl)
  root.style.setProperty(
    '--font-weight-regular',
    currentTheme.typography.fontWeightRegular,
  )
  root.style.setProperty(
    '--font-weight-medium',
    currentTheme.typography.fontWeightMedium,
  )
  root.style.setProperty(
    '--font-weight-semibold',
    currentTheme.typography.fontWeightSemibold,
  )
  root.style.setProperty('--line-height-base', currentTheme.typography.lineHeightBase)

  root.style.setProperty('--spacing-xs', currentTheme.spacing.xs)
  root.style.setProperty('--spacing-sm', currentTheme.spacing.sm)
  root.style.setProperty('--spacing-md', currentTheme.spacing.md)
  root.style.setProperty('--spacing-lg', currentTheme.spacing.lg)
  root.style.setProperty('--spacing-xl', currentTheme.spacing.xl)

  root.style.setProperty('--radius-sm', currentTheme.radius.sm)
  root.style.setProperty('--radius-md', currentTheme.radius.md)
  root.style.setProperty('--radius-lg', currentTheme.radius.lg)

  root.style.setProperty('--layout-header-height', currentTheme.layout.headerHeight)
  root.style.setProperty('--layout-sidebar-width', currentTheme.layout.sidebarWidth)
  root.style.setProperty('--layout-card-radius', currentTheme.layout.cardRadius)
  root.style.setProperty('--layout-button-radius', currentTheme.layout.buttonRadius)

  root.style.setProperty('--shadow-card', currentTheme.shadow.card)
}

type ThemeProviderProps = {
  children: ReactNode
  brand?: BrandName
}

export const ThemeProvider = ({
  children,
  brand = 'corporate',
}: ThemeProviderProps) => {
  const value = useMemo(() => getTheme(brand), [brand])

  useEffect(() => {
    applyThemeToRoot(value)
  }, [value])

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export const useTheme = () => useContext(ThemeContext)
