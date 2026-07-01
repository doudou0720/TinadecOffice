/**
 * Panel styles management composable for TinadecOffice Desktop.
 *
 * Simplified to a single global material effect: opaque, translucent, blur.
 * The same global setting is applied to all panels (sidebar, chat, context, settings nav).
 *
 * Style application is done via Vue reactive :style bindings
 * (getPanelStyle) — no direct DOM manipulation needed.
 */

import { useStorage } from '@vueuse/core'
import { ref, type Ref } from 'vue'
import {
  type PanelEffect,
  type PanelStyleSettings,
  DEFAULT_PANEL_STYLE_SETTINGS,
} from '../types/background'

// Storage key for the global panel style
const STORAGE_KEY = 'tinadec-panel-style'

/**
 * Get stored global panel style reference (lazy singleton initialization)
 */
let stored: Ref<PanelStyleSettings> | null = null

function getStoredPanelStyle(): Ref<PanelStyleSettings> {
  if (!stored) {
    stored = useStorage<PanelStyleSettings>(STORAGE_KEY, { ...DEFAULT_PANEL_STYLE_SETTINGS })
  }
  return stored
}

/**
 * Clamp a number to the given range.
 */
function clamp(val: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, val))
}

/**
 * Compute inline CSS style object based on the global effect settings.
 *
 * - opaque:      No special styling (solid background from CSS)
 * - translucent: Semi-transparent background using rgba() with configured opacity
 * - blur:        Frosted glass: backdrop-filter blur + semi-transparent background
 */
export function computePanelStyle(settings: PanelStyleSettings): Record<string, string> {
  const style: Record<string, string> = {}
  const alpha = clamp(settings.opacity, 0, 100) / 100

  switch (settings.effect) {
    case 'opaque':
      // Solid background — no inline overrides needed
      break
    case 'translucent':
      style.backgroundColor = `rgba(var(--bg-primary-rgb, 10, 14, 20), ${alpha})`
      break
    case 'blur':
      // Use both standard and -webkit prefixed for Chromium/Electron compatibility
      style.backdropFilter = `blur(${clamp(settings.blur, 0, 20)}px)`
      style.WebkitBackdropFilter = `blur(${clamp(settings.blur, 0, 20)}px)`
      style.backgroundColor = `rgba(var(--bg-primary-rgb, 10, 14, 20), ${alpha})`
      break
  }

  return style
}

export function usePanelStyles() {
  const panelStyle = getStoredPanelStyle()
  const isApplying = ref(false)

  /**
   * Update the global material style settings (partial merge)
   */
  function updatePanelStyle(patch: Partial<PanelStyleSettings>): void {
    panelStyle.value = {
      ...panelStyle.value,
      ...patch,
      // Clamp numeric values
      opacity: patch.opacity !== undefined ? clamp(patch.opacity, 0, 100) : panelStyle.value.opacity,
      blur: patch.blur !== undefined ? clamp(patch.blur, 0, 20) : panelStyle.value.blur,
    }
  }

  /**
   * Set the global effect type.
   * Preserves existing opacity/blur values so switching back restores them.
   */
  function setPanelEffect(effect: PanelEffect): void {
    updatePanelStyle({ effect })
  }

  /**
   * Reset the global material style to defaults
   */
  function resetPanelStyle(): void {
    panelStyle.value = { ...DEFAULT_PANEL_STYLE_SETTINGS }
  }

  /**
   * Get computed inline style for a panel (for Vue :style binding).
   * All panels share the same global material setting.
   */
  function getPanelStyle(_panelName?: string): Record<string, string> {
    return computePanelStyle(panelStyle.value)
  }

  /**
   * Get data attributes for CSS targeting.
   * All panels share the same global material setting.
   */
  function getPanelDataAttributes(_panelName?: string): Record<string, string> {
    return {
      'data-panel-effect': panelStyle.value.effect,
    }
  }

  return {
    // State
    panelStyle,
    isApplying,

    // Methods
    updatePanelStyle,
    setPanelEffect,
    resetPanelStyle,
    getPanelStyle,
    getPanelDataAttributes,
  }
}
