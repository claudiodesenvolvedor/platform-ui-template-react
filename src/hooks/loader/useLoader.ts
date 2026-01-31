import { useContext } from 'react'
import { LoaderContextConsumer } from './LoaderContext'

export const useLoader = () => {
  const context = useContext(LoaderContextConsumer)

  if (!context) {
    throw new Error('useLoader deve ser usado dentro de LoaderProvider')
  }

  return context
}
