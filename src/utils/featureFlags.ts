import { getEnvBoolean } from './env'

type FeatureFlags = Record<string, boolean>

const envFeatureFlags: FeatureFlags = Object.entries(import.meta.env).reduce<FeatureFlags>(
  (accumulator, [envKey, envValue]) => {
    if (!envKey.startsWith('VITE_FEATURE_')) {
      return accumulator
    }

    const normalizedFlag = envKey.replace('VITE_FEATURE_', '').toLowerCase()
    const resolvedValue = getEnvBoolean(String(envValue))

    accumulator[normalizedFlag] = resolvedValue
    accumulator[`${normalizedFlag}_enabled`] = resolvedValue

    return accumulator
  },
  {},
)

export function getFeatureFlag(
  flag: string,
  backendFlags?: Record<string, boolean>,
): boolean {
  const backendValue = backendFlags?.[flag]
  if (typeof backendValue === 'boolean') {
    return backendValue
  }

  const envValue = envFeatureFlags[flag.toLowerCase()]
  if (typeof envValue === 'boolean') {
    return envValue
  }

  return true
}
