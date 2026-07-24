import { lazy, ComponentType } from 'react'

/**
 * A wrapper around React.lazy that detects chunk/network loading failures.
 * If a module fails to load (often due to user navigating after a new deployment
 * has deleted the old chunk hash on the server), this helper will force a full page
 * reload to fetch the latest assets from the server.
 */
export function lazyWithRetry<T extends ComponentType<any>>(
  componentImport: () => Promise<{ default: T }>
) {
  return lazy(async () => {
    try {
      return await componentImport()
    } catch (error: any) {
      console.error('Dynamic chunk import failed:', error)

      // Detect if this error matches a chunk loading or network failure
      const isChunkError =
        error &&
        (error.name === 'ChunkLoadError' ||
          /failed to fetch|dynamically imported|loading chunk/i.test(error.message || ''))

      if (isChunkError) {
        const reloadKey = 'chunk-load-retry-failed'
        const hasAlreadyRetried = sessionStorage.getItem(reloadKey)

        if (!hasAlreadyRetried) {
          sessionStorage.setItem(reloadKey, Date.now().toString())
          console.warn('Attempting page reload to fetch latest assets...')
          window.location.reload()
          
          // Return a pending promise that never resolves to prevent React from 
          // rendering a broken state / error boundary layout before the page reloads.
          return new Promise<{ default: T }>(() => {})
        } else {
          console.error('Already attempted to reload for chunk failure. Preventing infinite loop.')
        }
      }

      throw error
    }
  })
}
