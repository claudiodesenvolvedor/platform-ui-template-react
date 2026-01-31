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
  corporate: {
    label: 'Corporate',
    colors: {
      primary: '#006B8F',
      secondary: '#007E7A',
      background: '#F4F6F8',
      card: '#FFFFFF',
      text: '#1F2933',
      highlight: '#FFC94A',
      danger: '#DC2626',
    },
  },
} as const

export type BrandName = keyof typeof brands

export const getTheme = (brand: BrandName = 'corporate') => ({
  colors: brands[brand].colors,
  typography: tokens.typography,
  spacing: tokens.spacing,
  radius: tokens.radius,
})

export const theme = getTheme()
