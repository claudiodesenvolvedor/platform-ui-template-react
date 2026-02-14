import { corporateBrand, supervia1Brand, superviaBrand } from './brands'

export const tokens = {
  typography: {
    fontFamily:
      "'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    fontSizeSm: '14px',
    fontSizeMd: '16px',
    fontSizeLg: '20px',
    fontSizeXl: '24px',
    fontWeightRegular: '400',
    fontWeightMedium: '500',
    fontWeightSemibold: '600',
    lineHeightBase: '1.5',
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
  },
  radius: {
    sm: '6px',
    md: '8px',
    lg: '12px',
  },
} as const

export const brands = {
  corporate: corporateBrand,
  supervia: superviaBrand,
  supervia1: supervia1Brand,
} as const

export type BrandName = 'corporate' | 'supervia' | 'supervia1'

const buildTheme = (brand: (typeof brands)[BrandName], brandName: BrandName) => ({
  brandName,
  colors: {
    primary: brand.colors.primary,
    secondary: brand.colors.secondary,
    background: brand.colors.background,
    surface: brand.colors.surface,
    card: brand.colors.surface,
    text: brand.colors.textPrimary,
    warning: brand.colors.warning,
    highlight: brand.colors.warning,
    danger: brand.colors.danger,
    textSecondary: brand.colors.textSecondary,
    border: brand.colors.border,
    success: brand.colors.success,
    cta: brand.colors.cta,
  },
  layout: brand.layout,
  content: brand.content,
  shadow: brand.shadow,
  typography: tokens.typography,
  spacing: tokens.spacing,
  radius: tokens.radius,
})

export const getTheme = (brand: BrandName = 'corporate') => {
  switch (brand) {
    case 'supervia1':
      return buildTheme(supervia1Brand, 'supervia1')
    case 'supervia':
      return buildTheme(superviaBrand, 'supervia')
    case 'corporate':
    default:
      return buildTheme(corporateBrand, 'corporate')
  }
}

export const theme = getTheme()
