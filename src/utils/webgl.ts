/**
 * Safely checks if the user's browser/device supports WebGL context.
 * Useful to prevent crashes in OGL and React Three Fiber environments on low-end
 * devices or browsers where WebGL is disabled.
 */
export function isWebGLSupported(): boolean {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return false
  }

  try {
    const canvas = document.createElement('canvas')
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    )
  } catch (e) {
    return false
  }
}
