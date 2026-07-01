/**
 * Background customization types for TinadecOffice Desktop
 * Supports image, video, and HTML backgrounds with opacity/blur controls
 */

export type BackgroundType = 'none' | 'image' | 'video' | 'html'

export interface BackgroundSettings {
  type: BackgroundType
  source: string           // URL or local file path
  opacity: number          // 0-100
  blur: number             // 0-20px
  size: 'cover' | 'contain' | 'auto'
  position: 'center' | 'top' | 'bottom' | 'left' | 'right'
  repeat: 'no-repeat' | 'repeat' | 'repeat-x' | 'repeat-y'
}

/**
 * Panel material effect type — only three options:
 * - opaque:      Solid background, no transparency, no blur
 * - translucent: Semi-transparent background, adjustable opacity (0-100)
 * - blur:        Frosted glass effect, adjustable blur (0-20px) and opacity (0-100)
 */
export type PanelEffect = 'opaque' | 'translucent' | 'blur'

export interface PanelStyleSettings {
  effect: PanelEffect
  /** Background opacity 0-100 (used by translucent and blur) */
  opacity: number
  /** Backdrop blur strength in px 0-20 (used by blur) */
  blur: number
}

export interface AppearanceSettings {
  theme: 'dark' | 'light' | 'system'
  accentColor: string
  background: BackgroundSettings
  /** Global material effect applied to all panels */
  panelStyle: PanelStyleSettings
}

export const DEFAULT_BACKGROUND_SETTINGS: BackgroundSettings = {
  type: 'none',
  source: '',
  opacity: 100,
  blur: 0,
  size: 'cover',
  position: 'center',
  repeat: 'no-repeat',
}

export const DEFAULT_PANEL_STYLE_SETTINGS: PanelStyleSettings = {
  effect: 'opaque',
  opacity: 80,
  blur: 8,
}
