import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'

type FeatureFlags = Record<string, boolean>

type FeatureFlagContextType = {
  featureFlags: FeatureFlags
  setFeatureFlags: (flags: FeatureFlags) => void
}

let globalFeatureFlags: FeatureFlags = {}
const listeners = new Set<(flags: FeatureFlags) => void>()

const setGlobalFeatureFlags = (flags: FeatureFlags) => {
  globalFeatureFlags = flags
  listeners.forEach((listener) => listener(globalFeatureFlags))
}

const subscribe = (listener: (flags: FeatureFlags) => void) => {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

const defaultContextValue: FeatureFlagContextType = {
  featureFlags: globalFeatureFlags,
  setFeatureFlags: setGlobalFeatureFlags,
}

const FeatureFlagContext = createContext<FeatureFlagContextType>(defaultContextValue)

export const FeatureFlagProvider = ({ children }: { children: ReactNode }) => {
  const [featureFlags, setFeatureFlagsState] = useState<FeatureFlags>(globalFeatureFlags)

  useEffect(() => {
    return subscribe(setFeatureFlagsState)
  }, [])

  const value = useMemo<FeatureFlagContextType>(
    () => ({
      featureFlags,
      setFeatureFlags: setGlobalFeatureFlags,
    }),
    [featureFlags],
  )

  return (
    <FeatureFlagContext.Provider value={value}>
      {children}
    </FeatureFlagContext.Provider>
  )
}

export const useFeatureFlags = () => useContext(FeatureFlagContext)
