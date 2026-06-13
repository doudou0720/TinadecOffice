export type ConnectionKind = 'api-key' | 'cli' | 'local-server' | 'public-api'

export type ProviderCategory = 'cloud-api' | 'local-server' | 'agent-cli' | 'custom'

export interface ProviderTemplate {
  driver: string
  display_name_key: string
  summary_key: string
  connection_kind: ConnectionKind
  category: ProviderCategory
  default_base_url: string | null
  default_model: string | null
  capabilities: string[]
  brand_color: string
  brand_bg: string
  icon: string
  fields: {
    base_url: boolean
    model: boolean
    api_key: boolean
    binary_path: boolean
    home_path: boolean
    server_url: boolean
    launch_args: boolean
  }
  placeholders: {
    base_url?: string
    model?: string
    api_key?: string
    binary_path?: string
    home_path?: string
    server_url?: string
    launch_args?: string
  }
}

function hexToRgba(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `rgba(${r},${g},${b},${alpha})`
}

export const PROVIDER_TEMPLATES: ProviderTemplate[] = [
  {
    driver: 'openai-compatible',
    display_name_key: 'providers.openaiCompatible',
    summary_key: 'providers.openaiCompatibleSummary',
    connection_kind: 'api-key',
    category: 'cloud-api',
    default_base_url: 'https://api.openai.com/v1',
    default_model: 'gpt-5.4-mini',
    capabilities: ['chat', 'streaming', 'tool-calls'],
    brand_color: '#10a37f',
    brand_bg: hexToRgba('#10a37f', 0.12),
    icon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.562 10.188c.25-.688.313-1.376.25-2.063c-.062-.687-.312-1.375-.625-2c-.562-.937-1.375-1.687-2.312-2.125c-1-.437-2.063-.562-3.125-.312c-.5-.5-1.063-.938-1.688-1.25S11.687 2 11 2a5.17 5.17 0 0 0-3 .938c-.875.624-1.5 1.5-1.813 2.5c-.75.187-1.375.5-2 .875c-.562.437-1 1-1.375 1.562c-.562.938-.75 2-.625 3.063a5.44 5.44 0 0 0 1.25 2.874a4.7 4.7 0 0 0-.25 2.063c.063.688.313 1.375.625 2c.563.938 1.375 1.688 2.313 2.125c1 .438 2.062.563 3.125.313c.5.5 1.062.937 1.687 1.25S12.312 22 13 22a5.17 5.17 0 0 0 3-.937c.875-.625 1.5-1.5 1.812-2.5a4.54 4.54 0 0 0 1.938-.875c.562-.438 1.062-.938 1.375-1.563c.562-.937.75-2 .625-3.062c-.125-1.063-.5-2.063-1.188-2.876m-7.5 10.5c-1 0-1.75-.313-2.437-.875c0 0 .062-.063.125-.063l4-2.312a.5.5 0 0 0 .25-.25a.57.57 0 0 0 .062-.313V11.25l1.688 1v4.625a3.685 3.685 0 0 1-3.688 3.813M5 17.25c-.438-.75-.625-1.625-.438-2.5c0 0 .063.063.125.063l4 2.312a.56.56 0 0 0 .313.063c.125 0 .25 0 .312-.063l4.875-2.812v1.937l-4.062 2.375A3.7 3.7 0 0 1 7.312 19c-1-.25-1.812-.875-2.312-1.75M3.937 8.563a3.8 3.8 0 0 1 1.938-1.626v4.751c0 .124 0 .25.062.312a.5.5 0 0 0 .25.25l4.875 2.813l-1.687 1l-4-2.313a3.7 3.7 0 0 1-1.75-2.25c-.25-.937-.188-2.062.312-2.937M17.75 11.75l-4.875-2.812l1.687-1l4 2.312c.625.375 1.125.875 1.438 1.5s.5 1.313.437 2.063a3.7 3.7 0 0 1-.75 1.937c-.437.563-1 1-1.687 1.25v-4.75c0-.125 0-.25-.063-.312c0 0-.062-.126-.187-.188m1.687-2.5s-.062-.062-.125-.062l-4-2.313c-.125-.062-.187-.062-.312-.062s-.25 0-.313.062L9.812 9.688V7.75l4.063-2.375c.625-.375 1.312-.5 2.062-.5c.688 0 1.375.25 2 .688c.563.437 1.063 1 1.313 1.625s.312 1.375.187 2.062m-10.5 3.5l-1.687-1V7.063c0-.688.187-1.438.562-2C8.187 4.438 8.75 4 9.375 3.688a3.37 3.37 0 0 1 2.062-.313c.688.063 1.375.375 1.938.813c0 0-.063.062-.125.062l-4 2.313a.5.5 0 0 0-.25.25c-.063.125-.063.187-.063.312zm.875-2L12 9.5l2.187 1.25v2.5L12 14.5l-2.188-1.25z"/></svg>`,
    fields: { base_url: true, model: true, api_key: true, binary_path: false, home_path: false, server_url: false, launch_args: false },
    placeholders: { base_url: 'https://api.openai.com/v1', model: 'gpt-5.4-mini', api_key: 'sk-...' }
  },
  {
    driver: 'anthropic',
    display_name_key: 'providers.anthropic',
    summary_key: 'providers.anthropicSummary',
    connection_kind: 'api-key',
    category: 'cloud-api',
    default_base_url: 'https://api.anthropic.com/v1',
    default_model: 'claude-sonnet-4-6',
    capabilities: ['chat', 'streaming', 'reasoning', 'tool-calls'],
    brand_color: '#d97706',
    brand_bg: hexToRgba('#d97706', 0.12),
    icon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.3041 3.541h-3.6718l6.696 16.918H24Zm-10.6082 0L0 20.459h3.7442l1.3693-3.5527h7.0052l1.3693 3.5528h3.7442L10.5363 3.5409Zm-.3712 10.2232 2.2914-5.9456 2.2914 5.9456Z"/></svg>`,
    fields: { base_url: true, model: true, api_key: true, binary_path: false, home_path: false, server_url: false, launch_args: false },
    placeholders: { base_url: 'https://api.anthropic.com/v1', model: 'claude-sonnet-4-6 / claude-opus-4', api_key: 'sk-ant-...' }
  },
  {
    driver: 'google',
    display_name_key: 'providers.googleGemini',
    summary_key: 'providers.googleGeminiSummary',
    connection_kind: 'api-key',
    category: 'cloud-api',
    default_base_url: 'https://generativelanguage.googleapis.com/v1beta/openai',
    default_model: 'gemini-2.5-pro',
    capabilities: ['chat', 'streaming', 'reasoning', 'tool-calls'],
    brand_color: '#4285f4',
    brand_bg: hexToRgba('#4285f4', 0.12),
    icon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"/></svg>`,
    fields: { base_url: true, model: true, api_key: true, binary_path: false, home_path: false, server_url: false, launch_args: false },
    placeholders: { base_url: 'https://generativelanguage.googleapis.com/v1beta/openai', model: 'gemini-2.5-pro / gemini-2.5-flash', api_key: 'AIza...' }
  },
  {
    driver: 'deepseek',
    display_name_key: 'providers.deepseek',
    summary_key: 'providers.deepseekSummary',
    connection_kind: 'api-key',
    category: 'cloud-api',
    default_base_url: 'https://api.deepseek.com/v1',
    default_model: 'deepseek-chat',
    capabilities: ['chat', 'streaming', 'reasoning', 'tool-calls'],
    brand_color: '#4d6bfe',
    brand_bg: hexToRgba('#4d6bfe', 0.12),
    icon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.748 4.651c-.254-.124-.364.113-.512.233-.051.04-.094.09-.137.137-.372.397-.806.657-1.373.626-.829-.046-1.537.214-2.163.848-.133-.782-.575-1.248-1.247-1.548-.352-.155-.708-.311-.955-.65-.172-.24-.219-.509-.305-.774-.055-.16-.11-.323-.293-.35-.2-.031-.278.136-.356.276-.313.572-.434 1.202-.422 1.84.027 1.436.633 2.58 1.838 3.393.137.094.172.187.129.323-.082.28-.18.553-.266.833-.055.179-.137.218-.328.14a5.5 5.5 0 0 1-1.737-1.179c-.857-.828-1.631-1.743-2.597-2.46a12 12 0 0 0-.689-.47c-.985-.957.13-1.743.387-1.836.27-.098.094-.433-.778-.428-.872.003-1.67.295-2.687.685a3 3 0 0 1-.465.136 9.6 9.6 0 0 0-2.883-.101c-1.885.21-3.39 1.1-4.497 2.622C.082 8.776-.231 10.854.152 13.02c.403 2.284 1.568 4.175 3.36 5.653 1.857 1.533 3.997 2.284 6.438 2.14 1.482-.085 3.132-.284 4.994-1.86.47.234.962.328 1.78.398.629.058 1.235-.031 1.705-.129.735-.155.684-.836.418-.961-2.155-1.004-1.682-.595-2.112-.926 1.095-1.295 2.768-3.598 3.284-6.733.05-.346.115-.834.108-1.114-.004-.171.035-.238.23-.257a4.2 4.2 0 0 0 1.545-.475c1.397-.763 1.96-2.016 2.093-3.517.02-.23-.004-.467-.247-.588M11.58 18.168c-2.088-1.642-3.101-2.183-3.52-2.16-.39.024-.32.472-.234.763.09.288.207.487.371.74.114.167.192.416-.113.603-.673.416-1.842-.14-1.897-.168-1.361-.801-2.5-1.86-3.301-3.306-.775-1.393-1.225-2.888-1.299-4.482-.02-.385.094-.522.477-.592a4.7 4.7 0 0 1 1.53-.038c2.131.311 3.946 1.264 5.467 2.774.868.86 1.525 1.887 2.202 2.89.72 1.066 1.494 2.082 2.48 2.915.348.291.626.513.892.677-.802.09-2.14.109-3.055-.615zm1.001-6.44a.306.306 0 0 1 .415-.287.3.3 0 0 1 .113.074.3.3 0 0 1 .086.214c0 .17-.136.307-.308.307a.303.303 0 0 1-.306-.307m3.11 1.596c-.2.081-.4.151-.591.16a1.25 1.25 0 0 1-.798-.254c-.274-.23-.47-.358-.551-.758a1.7 1.7 0 0 1 .015-.588c.07-.327-.007-.537-.238-.727-.188-.156-.426-.199-.689-.199a.6.6 0 0 1-.254-.078.253.253 0 0 1-.114-.358 1 1 0 0 1 .192-.21c.356-.202.767-.136 1.146.016.352.144.618.408 1.001.782.392.451.462.576.685.915.176.264.336.536.446.848.066.194-.02.353-.25.45"/></svg>`,
    fields: { base_url: true, model: true, api_key: true, binary_path: false, home_path: false, server_url: false, launch_args: false },
    placeholders: { base_url: 'https://api.deepseek.com/v1', model: 'deepseek-chat / deepseek-reasoner', api_key: 'sk-...' }
  },
  {
    driver: 'openrouter',
    display_name_key: 'providers.openrouter',
    summary_key: 'providers.openrouterSummary',
    connection_kind: 'api-key',
    category: 'cloud-api',
    default_base_url: 'https://openrouter.ai/api/v1',
    default_model: 'openai/gpt-5',
    capabilities: ['chat', 'streaming', 'routing', 'tool-calls'],
    brand_color: '#6366f1',
    brand_bg: hexToRgba('#6366f1', 0.12),
    icon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M16.778 1.844v1.919q-.569-.026-1.138-.032-.708-.008-1.415.037c-1.93.126-4.023.728-6.149 2.237-2.911 2.066-2.731 1.95-4.14 2.75-.396.223-1.342.574-2.185.798-.841.225-1.753.333-1.751.333v4.229s.768.108 1.61.333c.842.224 1.789.575 2.185.799 1.41.798 1.228.683 4.14 2.75 2.126 1.509 4.22 2.11 6.148 2.236.88.058 1.716.041 2.555.005v1.918l7.222-4.168-7.222-4.17v2.176c-.86.038-1.611.065-2.278.021-1.364-.09-2.417-.357-3.979-1.465-2.244-1.593-2.866-2.027-3.68-2.508.889-.518 1.449-.906 3.822-2.59 1.56-1.109 2.614-1.377 3.978-1.466.667-.044 1.418-.017 2.278.02v2.176L24 6.014Z"/></svg>`,
    fields: { base_url: true, model: true, api_key: true, binary_path: false, home_path: false, server_url: false, launch_args: false },
    placeholders: { base_url: 'https://openrouter.ai/api/v1', model: 'openai/gpt-5 / anthropic/claude-sonnet-4', api_key: 'sk-or-...' }
  },
  {
    driver: 'pollinations',
    display_name_key: 'providers.pollinations',
    summary_key: 'providers.pollinationsSummary',
    connection_kind: 'public-api',
    category: 'cloud-api',
    default_base_url: 'https://gen.pollinations.ai/v1',
    default_model: 'openai',
    capabilities: ['chat', 'streaming', 'public-api', 'no-api-key'],
    brand_color: '#e11d48',
    brand_bg: hexToRgba('#e11d48', 0.12),
    icon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.25c.38 0 .72.22.88.56l1.83 3.92 4.29.55c.37.05.68.3.8.66.12.35.02.74-.25 1l-3.13 2.99.8 4.25c.07.37-.08.74-.39.96a.96.96 0 0 1-1.03.05L12 15.13l-3.8 2.05a.96.96 0 0 1-1.03-.05.97.97 0 0 1-.39-.96l.8-4.25-3.13-2.99a.96.96 0 0 1-.25-1c.12-.36.43-.61.8-.66l4.29-.55 1.83-3.92c.16-.34.5-.56.88-.56Zm0 3.28-1.23 2.63a.96.96 0 0 1-.75.55l-2.88.37 2.1 2c.24.23.35.56.29.88L9 14.82l2.54-1.37c.29-.16.63-.16.92 0L15 14.82l-.53-2.86c-.06-.32.05-.65.29-.88l2.1-2-2.88-.37a.96.96 0 0 1-.75-.55L12 5.53Z"/></svg>`,
    fields: { base_url: true, model: true, api_key: false, binary_path: false, home_path: false, server_url: false, launch_args: false },
    placeholders: { base_url: 'https://gen.pollinations.ai/v1', model: 'openai / openai-large / mistral' }
  },
  {
    driver: 'groq',
    display_name_key: 'providers.groq',
    summary_key: 'providers.groqSummary',
    connection_kind: 'api-key',
    category: 'cloud-api',
    default_base_url: 'https://api.groq.com/openai/v1',
    default_model: 'llama-3.3-70b-versatile',
    capabilities: ['chat', 'streaming', 'fast'],
    brand_color: '#f55036',
    brand_bg: hexToRgba('#f55036', 0.12),
    icon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 3v18h18V3zm11.72 13.37c-.41.38-.82.66-1.33.87l-.21.09c-.83.3-1.82.21-2.63-.1c-.45-.21-.82-.46-1.19-.8c.33-.41.66-.75 1.07-1.07l.27.21c.5.35 1 .47 1.61.41c.62-.12 1.12-.4 1.52-.9c.37-.61.41-1.09.41-1.8V10.4c0-.72-.15-1.18-.6-1.74c-.61-.49-1.17-.74-1.96-.7c-.66.11-1.19.42-1.59.95c-.33.53-.48 1.07-.37 1.69c.2.68.45 1.25 1.07 1.61c.52.27.98.32 1.56.33h.25c.2.02.4.02.61.03V14c-1.49.06-2.65.06-3.84-.97a4.22 4.22 0 0 1-1.23-2.8c.04-.88.35-1.6.86-2.32l.15-.23c1.43-1.51 3.7-1.61 5.31-.31l.17.14c.58.52.96 1.25 1.08 2.01c0 .16.01.33.01.49v3.6c0 1.05-.3 1.95-1.02 2.74Z"/></svg>`,
    fields: { base_url: true, model: true, api_key: true, binary_path: false, home_path: false, server_url: false, launch_args: false },
    placeholders: { base_url: 'https://api.groq.com/openai/v1', model: 'llama-3.3-70b-versatile', api_key: 'gsk_...' }
  },
  {
    driver: 'togetherai',
    display_name_key: 'providers.togetherAi',
    summary_key: 'providers.togetherAiSummary',
    connection_kind: 'api-key',
    category: 'cloud-api',
    default_base_url: 'https://api.together.xyz/v1',
    default_model: 'meta-llama/Llama-3.3-70B-Instruct-Turbo',
    capabilities: ['chat', 'streaming', 'tool-calls'],
    brand_color: '#0081f1',
    brand_bg: hexToRgba('#0081f1', 0.12),
    icon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>`,
    fields: { base_url: true, model: true, api_key: true, binary_path: false, home_path: false, server_url: false, launch_args: false },
    placeholders: { base_url: 'https://api.together.xyz/v1', model: 'meta-llama/Llama-3.3-70B-Instruct-Turbo', api_key: 'together_...' }
  },
  {
    driver: 'fireworks',
    display_name_key: 'providers.fireworksAi',
    summary_key: 'providers.fireworksAiSummary',
    connection_kind: 'api-key',
    category: 'cloud-api',
    default_base_url: 'https://api.fireworks.ai/inference/v1',
    default_model: 'accounts/fireworks/models/deepseek-v3',
    capabilities: ['chat', 'streaming'],
    brand_color: '#ff6b35',
    brand_bg: hexToRgba('#ff6b35', 0.12),
    icon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2zm0 3.84l1.74 4.17 4.49.38-3.41 2.96 1.03 4.39L12 15.4 8.15 17.74l1.03-4.39-3.41-2.96 4.49-.38L12 5.84z"/></svg>`,
    fields: { base_url: true, model: true, api_key: true, binary_path: false, home_path: false, server_url: false, launch_args: false },
    placeholders: { base_url: 'https://api.fireworks.ai/inference/v1', model: 'accounts/fireworks/models/...', api_key: 'fw_...' }
  },
  {
    driver: 'xai',
    display_name_key: 'providers.xai',
    summary_key: 'providers.xaiSummary',
    connection_kind: 'api-key',
    category: 'cloud-api',
    default_base_url: 'https://api.x.ai/v1',
    default_model: 'grok-3',
    capabilities: ['chat', 'streaming', 'tool-calls'],
    brand_color: '#1d9bf0',
    brand_bg: hexToRgba('#1d9bf0', 0.12),
    icon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M3.8 21h3.8l1.9-2.71l-1.9-2.71zm0-12.2L12.34 21h3.8L7.6 8.8zM17.4 21h2.49l.31-16.64l-3.11 4.44zm-6.96-9.49l1.9 2.71L20.2 3h-3.8z"/></svg>`,
    fields: { base_url: true, model: true, api_key: true, binary_path: false, home_path: false, server_url: false, launch_args: false },
    placeholders: { base_url: 'https://api.x.ai/v1', model: 'grok-3 / grok-3-mini', api_key: 'xai-...' }
  },
  {
    driver: 'mistral',
    display_name_key: 'providers.mistral',
    summary_key: 'providers.mistralSummary',
    connection_kind: 'api-key',
    category: 'cloud-api',
    default_base_url: 'https://api.mistral.ai/v1',
    default_model: 'mistral-large-latest',
    capabilities: ['chat', 'streaming', 'tool-calls'],
    brand_color: '#ff7000',
    brand_bg: hexToRgba('#ff7000', 0.12),
    icon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.143 3.429v3.428h-3.429v3.429h-3.428V6.857H6.857V3.43H3.43v13.714H0v3.428h10.286v-3.428H6.857v-3.429h3.429v3.429h3.429v-3.429h3.428v3.429h-3.428v3.428H24v-3.428h-3.43V3.429z"/></svg>`,
    fields: { base_url: true, model: true, api_key: true, binary_path: false, home_path: false, server_url: false, launch_args: false },
    placeholders: { base_url: 'https://api.mistral.ai/v1', model: 'mistral-large-latest / codestral-latest', api_key: 'mistral_...' }
  },
  {
    driver: 'cohere',
    display_name_key: 'providers.cohere',
    summary_key: 'providers.cohereSummary',
    connection_kind: 'api-key',
    category: 'cloud-api',
    default_base_url: 'https://api.cohere.ai/v1',
    default_model: 'command-r-plus',
    capabilities: ['chat', 'streaming', 'tool-calls', 'rag'],
    brand_color: '#39d353',
    brand_bg: hexToRgba('#39d353', 0.12),
    icon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/></svg>`,
    fields: { base_url: true, model: true, api_key: true, binary_path: false, home_path: false, server_url: false, launch_args: false },
    placeholders: { base_url: 'https://api.cohere.ai/v1', model: 'command-r-plus', api_key: 'co_...' }
  },
  {
    driver: 'qwen',
    display_name_key: 'providers.qwen',
    summary_key: 'providers.qwenSummary',
    connection_kind: 'api-key',
    category: 'cloud-api',
    default_base_url: 'https://dashscope.aliyuncs.com/compatible-mode/v1',
    default_model: 'qwen-max',
    capabilities: ['chat', 'streaming', 'reasoning', 'tool-calls'],
    brand_color: '#6236ff',
    brand_bg: hexToRgba('#6236ff', 0.12),
    icon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.919 14.545 20.817 9.17l1.47-2.544a.56.56 0 0 0 0-.566l-1.633-2.83a.57.57 0 0 0-.49-.283h-6.207L12.487.402a.57.57 0 0 0-.49-.284H8.732a.56.56 0 0 0-.49.284L5.139 5.775h-2.94a.56.56 0 0 0-.49.284L.077 8.887a.56.56 0 0 0 0 .567L3.18 14.83l-1.47 2.545a.56.56 0 0 0 0 .566l1.634 2.83a.57.57 0 0 0 .49.283h6.205l1.47 2.545a.57.57 0 0 0 .49.284h3.266a.57.57 0 0 0 .49-.284l3.104-5.375h2.94a.57.57 0 0 0 .49-.283l1.634-2.828a.55.55 0 0 0-.004-.568M8.733.686l1.634 2.828-1.634 2.828H21.8L20.164 9.17H7.425L5.63 6.06Zm1.306 19.801-6.205-.002 1.634-2.83h3.265L2.201 6.344h3.267q3.182 5.517 6.367 11.032zm10.124-5.66L18.53 12l-6.532 11.315-1.634-2.83c2.129-3.673 4.25-7.351 6.373-11.028h3.592l3.102 5.374z"/></svg>`,
    fields: { base_url: true, model: true, api_key: true, binary_path: false, home_path: false, server_url: false, launch_args: false },
    placeholders: { base_url: 'https://dashscope.aliyuncs.com/compatible-mode/v1', model: 'qwen-max / qwen-plus / qwen-turbo', api_key: 'sk-...' }
  },
  {
    driver: 'azure-openai',
    display_name_key: 'providers.azureOpenai',
    summary_key: 'providers.azureOpenaiSummary',
    connection_kind: 'api-key',
    category: 'cloud-api',
    default_base_url: 'https://YOUR_RESOURCE.openai.azure.com/openai/deployments/YOUR_DEPLOYMENT',
    default_model: 'gpt-5.4-mini',
    capabilities: ['chat', 'streaming', 'tool-calls', 'enterprise'],
    brand_color: '#0078d4',
    brand_bg: hexToRgba('#0078d4', 0.12),
    icon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M13.05 4.24L6.56 18.05L2 18l5.09-8.76zm.7 1.09L22 19.76H6.74l9.3-1.66l-4.87-5.79z"/></svg>`,
    fields: { base_url: true, model: true, api_key: true, binary_path: false, home_path: false, server_url: false, launch_args: false },
    placeholders: { base_url: 'https://YOUR_RESOURCE.openai.azure.com/...', model: 'gpt-5.4-mini', api_key: 'azure-api-key' }
  },
  {
    driver: 'aws-bedrock',
    display_name_key: 'providers.awsBedrock',
    summary_key: 'providers.awsBedrockSummary',
    connection_kind: 'api-key',
    category: 'cloud-api',
    default_base_url: 'https://bedrock-runtime.us-east-1.amazonaws.com',
    default_model: 'anthropic.claude-sonnet-4-20250514',
    capabilities: ['chat', 'streaming', 'enterprise'],
    brand_color: '#ff9900',
    brand_bg: hexToRgba('#ff9900', 0.12),
    icon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7.64 10.38c0 .25.02.45.07.62c.05.12.12.28.21.46c.04.04.05.1.05.15c0 .07-.04.13-.13.2l-.42.28c-.06.04-.12.06-.17.06c-.07 0-.13-.04-.2-.1c-.09-.1-.17-.2-.24-.31c-.06-.11-.13-.24-.2-.39c-.52.61-1.17.92-1.96.92c-.56 0-1-.16-1.33-.48c-.32-.32-.49-.75-.49-1.29c0-.55.2-1 .6-1.36c.41-.34.95-.52 1.63-.52c.23 0 .44.02.71.06c.23.03.5.08.76.14v-.48c0-.51-.1-.84-.31-1.07c-.22-.21-.57-.3-1.08-.3c-.24 0-.48.03-.72.08c-.25.06-.49.13-.72.23c-.11.04-.2.07-.23.08c-.05.02-.08.02-.11.02c-.09 0-.14-.06-.14-.2v-.33c0-.1.01-.18.05-.23q.045-.075.18-.12c.24-.14.51-.24.84-.32a4 4 0 0 1 1.04-.13q1.185 0 1.74.54c.37.36.55.91.55 1.64v2.15zm-2.7 1.02c.22 0 .44-.04.68-.12s.45-.23.63-.43c.11-.13.19-.27.25-.43c0-.16.05-.35.05-.58v-.27c-.2-.07-.4-.07-.62-.12a7 7 0 0 0-.62-.04c-.45 0-.77.09-.99.27s-.32.43-.32.76c0 .32.07.56.24.71c.16.17.39.25.7.25m5.34.71a.6.6 0 0 1-.28-.06c-.03-.05-.08-.14-.12-.26L8.32 6.65c-.04-.15-.06-.22-.06-.27c0-.11.05-.17.16-.17h.65c.13 0 .22.02.26.07c.06.04.1.13.14.26l1.11 4.4l1.04-4.4c.03-.13.07-.22.13-.26c.05-.04.14-.07.25-.07h.55c.12 0 .21.02.26.07c.05.04.1.13.13.26L14 11l1.14-4.46c.04-.13.09-.22.13-.26c.06-.04.14-.07.26-.07h.62c.11 0 .17.06.17.17c0 .03-.01.07-.02.12c0 0-.02.08-.04.15l-1.61 5.14c-.04.14-.08.21-.15.26c-.04.04-.13.07-.24.07h-.57c-.13 0-.19-.02-.27-.07a.45.45 0 0 1-.12-.26L12.27 7.5l-1.03 4.28q-.045.195-.12.27a.5.5 0 0 1-.27.06zm8.55.18c-.33 0-.7-.04-1.03-.12s-.59-.17-.76-.26a.5.5 0 0 1-.21-.19a.4.4 0 0 1-.04-.18v-.34c0-.14.05-.2.15-.2h.12c.04 0 .1.05.17.08c.22.1.47.18.73.23c.27.05.54.08.79.08c.42 0 .75-.07.97-.22c.23-.17.35-.36.35-.63c0-.19-.07-.34-.18-.47c-.12-.12-.35-.24-.67-.34l-.97-.3c-.48-.16-.84-.38-1.06-.68a1.58 1.58 0 0 1-.33-.97c0-.28.06-.52.18-.73c.12-.22.28-.4.46-.55c.22-.15.44-.26.71-.34q.39-.12.84-.12q.21 0 .45.03c.14.02.28.05.42.07c.14.04.26.07.38.11s.2.08.28.12c.09.05.16.1.2.16s.06.13.06.22v.32q0 .21-.15.21c-.05 0-.14-.03-.26-.08c-.39-.18-.82-.28-1.3-.28c-.39 0-.69.07-.91.19c-.21.14-.33.34-.33.6c0 .19.07.35.2.47c.13.13.38.25.73.35l.94.3c.48.15.83.37 1.05.65c.22.29.33.62.33 1c0 .29-.06.55-.17.77c-.12.23-.28.42-.47.57c-.21.16-.45.28-.73.36c-.3.09-.61.13-.95.13"/></svg>`,
    fields: { base_url: true, model: true, api_key: true, binary_path: false, home_path: false, server_url: false, launch_args: false },
    placeholders: { base_url: 'https://bedrock-runtime.us-east-1.amazonaws.com', model: 'anthropic.claude-sonnet-4-20250514', api_key: 'AWS_ACCESS_KEY_ID' }
  },
  {
    driver: 'github-copilot',
    display_name_key: 'providers.githubCopilot',
    summary_key: 'providers.githubCopilotSummary',
    connection_kind: 'api-key',
    category: 'cloud-api',
    default_base_url: 'https://api.githubcopilot.com',
    default_model: 'gpt-4.1',
    capabilities: ['chat', 'streaming', 'tool-calls'],
    brand_color: '#6e40c9',
    brand_bg: hexToRgba('#6e40c9', 0.12),
    icon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.922 16.997C23.061 18.492 18.063 22.02 12 22.02 5.937 22.02.939 18.492.078 16.997A.641.641 0 0 1 0 16.741v-2.869a.883.883 0 0 1 .053-.22c.372-.935 1.347-2.292 2.605-2.656.167-.429.414-1.055.644-1.517a10.098 10.098 0 0 1-.052-1.086c0-1.331.282-2.499 1.132-3.368.397-.406.89-.717 1.474-.952C7.255 2.937 9.248 1.98 11.978 1.98c2.731 0 4.767.957 6.166 2.093.584.235 1.077.546 1.474.952.85.869 1.132 2.037 1.132 3.368 0 .368-.014.733-.052 1.086.23.462.477 1.088.644 1.517 1.258.364 2.233 1.721 2.605 2.656a.841.841 0 0 1 .053.22v2.869a.641.641 0 0 1-.078.256Zm-11.75-5.992h-.344a4.359 4.359 0 0 1-.355.508c-.77.947-1.918 1.492-3.508 1.492-1.725 0-2.989-.359-3.782-1.259a2.137 2.137 0 0 1-.085-.104L4 11.746v6.585c1.435.779 4.514 2.179 8 2.179 3.486 0 6.565-1.4 8-2.179v-6.585l-.098-.104s-.033.045-.085.104c-.793.9-2.057 1.259-3.782 1.259-1.59 0-2.738-.545-3.508-1.492a4.359 4.359 0 0 1-.355-.508Zm2.328 3.25c.549 0 1 .451 1 1v2c0 .549-.451 1-1 1-.549 0-1-.451-1-1v-2c0-.549.451-1 1-1Zm-5 0c.549 0 1 .451 1 1v2c0 .549-.451 1-1 1-.549 0-1-.451-1-1v-2c0-.549.451-1 1-1Zm3.313-6.185c.136 1.057.403 1.913.878 2.497.442.544 1.134.938 2.344.938 1.573 0 2.292-.337 2.657-.751.384-.435.558-1.15.558-2.361 0-1.14-.243-1.847-.705-2.319-.477-.488-1.319-.862-2.824-1.025-1.487-.161-2.192.138-2.533.529-.269.307-.437.808-.438 1.578v.021c0 .265.021.562.063.893Zm-1.626 0c.042-.331.063-.628.063-.894v-.02c-.001-.77-.169-1.271-.438-1.578-.341-.391-1.046-.69-2.533-.529-1.505.163-2.347.537-2.824 1.025-.462.472-.705 1.179-.705 2.319 0 1.211.175 1.926.558 2.361.365.414 1.084.751 2.657.751 1.21 0 1.902-.394 2.344-.938.475-.584.742-1.44.878-2.497Z"/></svg>`,
    fields: { base_url: true, model: true, api_key: true, binary_path: false, home_path: false, server_url: false, launch_args: false },
    placeholders: { base_url: 'https://api.githubcopilot.com', model: 'gpt-4.1 / claude-sonnet-4', api_key: 'ghu_...' }
  },
  {
    driver: 'ollama',
    display_name_key: 'providers.ollama',
    summary_key: 'providers.ollamaSummary',
    connection_kind: 'local-server',
    category: 'local-server',
    default_base_url: 'http://localhost:11434/v1',
    default_model: 'llama3.2',
    capabilities: ['chat', 'local', 'no-api-key'],
    brand_color: '#c8a87c',
    brand_bg: hexToRgba('#c8a87c', 0.12),
    icon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M16.361 10.26a.894.894 0 0 0-.558.47l-.072.148.001.207c0 .193.004.217.059.353.076.193.152.312.291.448.24.238.51.3.872.205a.86.86 0 0 0 .517-.436.752.752 0 0 0 .08-.498c-.064-.453-.33-.782-.724-.897a1.06 1.06 0 0 0-.466 0zm-9.203.005c-.305.096-.533.32-.65.639a1.187 1.187 0 0 0-.06.52c.057.309.31.59.598.667.362.095.632.033.872-.205.14-.136.215-.255.291-.448.055-.136.059-.16.059-.353l.001-.207-.072-.148a.894.894 0 0 0-.565-.472 1.02 1.02 0 0 0-.474.007Zm4.184 2c-.131.071-.223.25-.195.383.031.143.157.288.353.407.105.063.112.072.117.136.004.038-.01.146-.029.243-.02.094-.036.194-.036.222.002.074.07.195.143.253.064.052.076.054.255.059.164.005.198.001.264-.03.169-.082.212-.234.15-.525-.052-.243-.042-.28.087-.355.137-.08.281-.219.324-.314a.365.365 0 0 0-.175-.48.394.394 0 0 0-.181-.033c-.126 0-.207.03-.355.124l-.085.053-.053-.032c-.219-.13-.259-.145-.391-.143a.396.396 0 0 0-.193.032zm.39-2.195c-.373.036-.475.05-.654.086-.291.06-.68.195-.951.328-.94.46-1.589 1.226-1.787 2.114-.04.176-.045.234-.045.53 0 .294.005.357.043.524.264 1.16 1.332 2.017 2.714 2.173.3.033 1.596.033 1.896 0 1.11-.125 2.064-.727 2.493-1.571.114-.226.169-.372.22-.602.039-.167.044-.23.044-.523 0-.297-.005-.355-.045-.531-.288-1.29-1.539-2.304-3.072-2.497a6.873 6.873 0 0 0-.855-.031zm.645.937a3.283 3.283 0 0 1 1.44.514c.223.148.537.458.671.662.166.251.26.508.303.82.02.143.01.251-.043.482-.08.345-.332.705-.672.957a3.115 3.115 0 0 1-.689.348c-.382.122-.632.144-1.525.138-.582-.006-.686-.01-.853-.042-.57-.107-1.022-.334-1.35-.68-.264-.28-.385-.535-.45-.946-.03-.192.025-.509.137-.776.136-.326.488-.73.836-.963.403-.269.934-.46 1.422-.512.187-.02.586-.02.773-.002zm-5.503-11a1.653 1.653 0 0 0-.683.298C5.617.74 5.173 1.666 4.985 2.819c-.07.436-.119 1.04-.119 1.503 0 .544.064 1.24.155 1.721.02.107.031.202.023.208a8.12 8.12 0 0 1-.187.152 5.324 5.324 0 0 0-.949 1.02 5.49 5.49 0 0 0-.94 2.339 6.625 6.625 0 0 0-.023 1.357c.091.78.325 1.438.727 2.04l.13.195-.037.064c-.269.452-.498 1.105-.605 1.732-.084.496-.095.629-.095 1.294 0 .67.009.803.088 1.266.095.555.288 1.143.503 1.534.071.128.243.393.264.407.007.003-.014.067-.046.141a7.405 7.405 0 0 0-.548 1.873c-.062.417-.071.552-.071.991 0 .56.031.832.148 1.279L3.42 24h1.478l-.05-.091c-.297-.552-.325-1.575-.068-2.597.117-.472.25-.819.498-1.296l.148-.29v-.177c0-.165-.003-.184-.057-.293a.915.915 0 0 0-.194-.25 1.74 1.74 0 0 1-.385-.543c-.424-.92-.506-2.286-.208-3.451.124-.486.329-.918.544-1.154a.787.787 0 0 0 .223-.531c0-.195-.07-.355-.224-.522a3.136 3.136 0 0 1-.817-1.729c-.14-.96.114-2.005.69-2.834.563-.814 1.353-1.336 2.237-1.475.199-.033.57-.028.776.01.226.04.367.028.512-.041.179-.085.268-.19.374-.431.093-.215.165-.333.36-.576.234-.29.46-.489.822-.729.413-.27.884-.467 1.352-.561.17-.035.25-.04.569-.04.319 0 .398.005.569.04a4.07 4.07 0 0 1 1.914.997c.117.109.398.457.488.602.034.057.095.177.132.267.105.241.195.346.374.43.14.068.286.082.503.045.343-.058.607-.053.943.016 1.144.23 2.14 1.173 2.581 2.437.385 1.108.276 2.267-.296 3.153-.097.15-.193.27-.333.419-.301.322-.301.722-.001 1.053.493.539.801 1.866.708 3.036-.062.772-.26 1.463-.533 1.854a2.096 2.096 0 0 1-.224.258.916.916 0 0 0-.194.25c-.054.109-.057.128-.057.293v.178l.148.29c.248.476.38.823.498 1.295.253 1.008.231 2.01-.059 2.581a.845.845 0 0 0-.044.098c0 .006.329.009.732.009h.73l.02-.074.036-.134c.019-.076.057-.3.088-.516.029-.217.029-1.016 0-1.258-.11-.875-.295-1.57-.597-2.226-.032-.074-.053-.138-.046-.141.008-.005.057-.074.108-.152.376-.569.607-1.284.724-2.228.031-.26.031-1.378 0-1.628-.083-.645-.182-1.082-.348-1.525a6.083 6.083 0 0 0-.329-.7l-.038-.064.131-.194c.402-.604.636-1.262.727-2.04a6.625 6.625 0 0 0-.024-1.358 5.512 5.512 0 0 0-.939-2.339 5.325 5.325 0 0 0-.95-1.02 8.097 8.097 0 0 1-.186-.152.692.692 0 0 1 .023-.208c.208-1.087.201-2.443-.017-3.503-.19-.924-.535-1.658-.98-2.082-.354-.338-.716-.482-1.15-.455-.996.059-1.8 1.205-2.116 3.01a6.805 6.805 0 0 0-.097.726c0 .036-.007.066-.015.066a.96.96 0 0 1-.149-.078A4.857 4.857 0 0 0 12 3.03c-.832 0-1.687.243-2.456.698a.958.958 0 0 1-.148.078c-.008 0-.015-.03-.015-.066a6.71 6.71 0 0 0-.097-.725C8.997 1.392 8.337.319 7.46.048a2.096 2.096 0 0 0-.585-.041Zm.293 1.402c.248.197.523.759.682 1.388.03.113.06.244.069.292.007.047.026.152.041.233.067.365.098.76.102 1.24l.002.475-.12.175-.118.178h-.278c-.324 0-.646.041-.954.124l-.238.06c-.033.007-.038-.003-.057-.144a8.438 8.438 0 0 1 .016-2.323c.124-.788.413-1.501.696-1.711.067-.05.079-.049.157.013zm9.825-.012c.17.126.358.46.498.888.28.854.36 2.028.212 3.145-.019.14-.024.151-.057.144l-.238-.06a3.693 3.693 0 0 0-.954-.124h-.278l-.119-.178-.119-.175.002-.474c.004-.669.066-1.19.214-1.772.157-.623.434-1.185.68-1.382.078-.062.09-.063.159-.012z"/></svg>`,
    fields: { base_url: true, model: true, api_key: false, binary_path: false, home_path: false, server_url: false, launch_args: false },
    placeholders: { base_url: 'http://localhost:11434/v1', model: 'llama3.2 / qwen2.5 / mistral' }
  },
  {
    driver: 'vllm',
    display_name_key: 'providers.vllm',
    summary_key: 'providers.vllmSummary',
    connection_kind: 'local-server',
    category: 'local-server',
    default_base_url: 'http://localhost:8000/v1',
    default_model: 'default',
    capabilities: ['chat', 'local', 'no-api-key'],
    brand_color: '#7c3aed',
    brand_bg: hexToRgba('#7c3aed', 0.12),
    icon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="m23.6 0-8.721 4.59L9.829 24h7.41zM9.83 24V5.142H.4Z"/></svg>`,
    fields: { base_url: true, model: true, api_key: false, binary_path: false, home_path: false, server_url: false, launch_args: false },
    placeholders: { base_url: 'http://localhost:8000/v1', model: 'default' }
  },
  {
    driver: 'sglang',
    display_name_key: 'providers.sglang',
    summary_key: 'providers.sglangSummary',
    connection_kind: 'local-server',
    category: 'local-server',
    default_base_url: 'http://localhost:30000/v1',
    default_model: 'default',
    capabilities: ['chat', 'local', 'no-api-key'],
    brand_color: '#f59e0b',
    brand_bg: hexToRgba('#f59e0b', 0.12),
    icon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/></svg>`,
    fields: { base_url: true, model: true, api_key: false, binary_path: false, home_path: false, server_url: false, launch_args: false },
    placeholders: { base_url: 'http://localhost:30000/v1', model: 'default' }
  },
  {
    driver: 'lmstudio',
    display_name_key: 'providers.lmStudio',
    summary_key: 'providers.lmStudioSummary',
    connection_kind: 'local-server',
    category: 'local-server',
    default_base_url: 'http://localhost:1234/v1',
    default_model: 'default',
    capabilities: ['chat', 'local', 'no-api-key'],
    brand_color: '#00d4aa',
    brand_bg: hexToRgba('#00d4aa', 0.12),
    icon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 2v2h1v14c0 1.1.9 2 2 2h4c1.1 0 2-.9 2-2V4h1V2H7zm4 14c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm2-4H9V4h4v8z"/></svg>`,
    fields: { base_url: true, model: true, api_key: false, binary_path: false, home_path: false, server_url: false, launch_args: false },
    placeholders: { base_url: 'http://localhost:1234/v1', model: 'default' }
  },
  {
    driver: 'llamacpp',
    display_name_key: 'providers.llamaCpp',
    summary_key: 'providers.llamaCppSummary',
    connection_kind: 'local-server',
    category: 'local-server',
    default_base_url: 'http://localhost:8080/v1',
    default_model: 'default',
    capabilities: ['chat', 'local', 'no-api-key'],
    brand_color: '#16a34a',
    brand_bg: hexToRgba('#16a34a', 0.12),
    icon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M5 6.5C5 4.57 6.57 3 8.5 3h7A3.5 3.5 0 0 1 19 6.5V8h1.25c.41 0 .75.34.75.75v6.5c0 .41-.34.75-.75.75H19v1.5a3.5 3.5 0 0 1-3.5 3.5h-7A3.5 3.5 0 0 1 5 17.5V16H3.75a.75.75 0 0 1-.75-.75v-6.5c0-.41.34-.75.75-.75H5V6.5Zm2 0V8h10V6.5C17 5.67 16.33 5 15.5 5h-7C7.67 5 7 5.67 7 6.5ZM7 16v1.5c0 .83.67 1.5 1.5 1.5h7c.83 0 1.5-.67 1.5-1.5V16H7Zm-2-2h14v-4H5v4Zm4.25-3.25h1.5v2.5h-1.5v-2.5Zm4 0h1.5v2.5h-1.5v-2.5Z"/></svg>`,
    fields: { base_url: true, model: true, api_key: false, binary_path: false, home_path: false, server_url: false, launch_args: false },
    placeholders: { base_url: 'http://localhost:8080/v1', model: 'default' }
  },
  {
    driver: 'codex-cli',
    display_name_key: 'providers.codexCli',
    summary_key: 'providers.codexCliSummary',
    connection_kind: 'cli',
    category: 'agent-cli',
    default_base_url: null,
    default_model: 'gpt-5.4',
    capabilities: ['agent', 'cli', 'workspace'],
    brand_color: '#10a37f',
    brand_bg: hexToRgba('#10a37f', 0.12),
    icon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8h16v10zm-2-1h-6v-2h6v2zM7.5 17l-1.41-1.41L8.67 13l-2.59-2.59L7.5 9l4 4-4 4z"/></svg>`,
    fields: { base_url: false, model: false, api_key: false, binary_path: true, home_path: true, server_url: false, launch_args: false },
    placeholders: { binary_path: 'codex', home_path: '~/.codex-work' }
  },
  {
    driver: 'claude-cli',
    display_name_key: 'providers.claudeCli',
    summary_key: 'providers.claudeCliSummary',
    connection_kind: 'cli',
    category: 'agent-cli',
    default_base_url: null,
    default_model: 'claude-sonnet-4-6',
    capabilities: ['agent', 'cli', 'workspace'],
    brand_color: '#d97706',
    brand_bg: hexToRgba('#d97706', 0.12),
    icon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="m4.7144 15.9555 4.7174-2.6471.079-.2307-.079-.1275h-.2307l-.7893-.0486-2.6956-.0729-2.3375-.0971-2.2646-.1214-.5707-.1215-.5343-.7042.0546-.3522.4797-.3218.686.0608 1.5179.1032 2.2767.1578 1.6514.0972 2.4468.255h.3886l.0546-.1579-.1336-.0971-.1032-.0972L6.973 9.8356l-2.55-1.6879-1.3356-.9714-.7225-.4918-.3643-.4614-.1578-1.0078.6557-.7225.8803.0607.2246.0607.8925.686 1.9064 1.4754 2.4893 1.8336.3643.3035.1457-.1032.0182-.0728-.164-.2733-1.3539-2.4467-1.445-2.4893-.6435-1.032-.17-.6194c-.0607-.255-.1032-.4674-.1032-.7285L6.287.1335 6.6997 0l.9957.1336.419.3642.6192 1.4147 1.0018 2.2282 1.5543 3.0296.4553.8985.2429.8318.091.255h.1579v-.1457l.1275-1.706.2368-2.0947.2307-2.6957.0789-.7589.3764-.9107.7468-.4918.5828.2793.4797.686-.0668.4433-.2853 1.8517-.5586 2.9021-.3643 1.9429h.2125l.2429-.2429.9835-1.3053 1.6514-2.0643.7286-.8196.85-.9046.5464-.4311h1.0321l.759 1.1293-.34 1.1657-1.0625 1.3478-.8804 1.1414-1.2628 1.7-.7893 1.36.0729.1093.1882-.0183 2.8535-.607 1.5421-.2794 1.8396-.3157.8318.3886.091.3946-.3278.8075-1.967.4857-2.3072.4614-3.4364.8136-.0425.0304.0486.0607 1.5482.1457.6618.0364h1.621l3.0175.2247.7892.522.4736.6376-.079.4857-1.2142.6193-1.6393-.3886-3.825-.9107-1.3113-.3279h-.1822v.1093l1.0929 1.0686 2.0035 1.8092 2.5075 2.3314.1275.5768-.3218.4554-.34-.0486-2.2039-1.6575-.85-.7468-1.9246-1.621h-.1275v.17l.4432.6496 2.3436 3.5214.1214 1.0807-.17.3521-.6071.2125-.6679-.1214-1.3721-1.9246L14.38 17.959l-1.1414-1.9428-.1397.079-.674 7.2552-.3156.3703-.7286.2793-.6071-.4614-.3218-.7468.3218-1.4753.3886-1.9246.3157-1.53.2853-1.9004.17-.6314-.0121-.0425-.1397.0182-1.4328 1.9672-2.1796 2.9446-1.7243 1.8456-.4128.164-.7164-.3704.0667-.6618.4008-.5889 2.386-3.0357 1.4389-1.882.929-1.0868-.0062-.1579h-.0546l-6.3385 4.1164-1.1293.1457-.4857-.4554.0608-.7467.2307-.2429 1.9064-1.3114Z"/></svg>`,
    fields: { base_url: false, model: false, api_key: false, binary_path: true, home_path: true, server_url: false, launch_args: false },
    placeholders: { binary_path: 'claude', home_path: '~/.claude-work' }
  },
  {
    driver: 'cursor-acp',
    display_name_key: 'providers.cursorAcp',
    summary_key: 'providers.cursorAcpSummary',
    connection_kind: 'cli',
    category: 'agent-cli',
    default_base_url: null,
    default_model: 'auto',
    capabilities: ['agent', 'cli', 'acp'],
    brand_color: '#6366f1',
    brand_bg: hexToRgba('#6366f1', 0.12),
    icon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M11.503.131 1.891 5.678a.84.84 0 0 0-.42.726v11.188c0 .3.162.575.42.724l9.609 5.55a1 1 0 0 0 .998 0l9.61-5.55a.84.84 0 0 0 .42-.724V6.404a.84.84 0 0 0-.42-.726L12.497.131a1.01 1.01 0 0 0-.996 0M2.657 6.338h18.55c.263 0 .43.287.297.515L12.23 22.918c-.062.107-.229.064-.229-.06V12.335a.59.59 0 0 0-.295-.51l-9.11-5.257c-.109-.063-.064-.23.061-.23"/></svg>`,
    fields: { base_url: false, model: false, api_key: false, binary_path: true, home_path: false, server_url: false, launch_args: true },
    placeholders: { binary_path: 'cursor-agent', launch_args: '--acp-port 0' }
  },
  {
    driver: 'opencode',
    display_name_key: 'providers.opencode',
    summary_key: 'providers.opencodeSummary',
    connection_kind: 'cli',
    category: 'agent-cli',
    default_base_url: 'http://127.0.0.1:4096',
    default_model: 'openai/gpt-5',
    capabilities: ['agent', 'cli', 'server'],
    brand_color: '#22d3ee',
    brand_bg: hexToRgba('#22d3ee', 0.12),
    icon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/></svg>`,
    fields: { base_url: false, model: false, api_key: false, binary_path: true, home_path: false, server_url: true, launch_args: true },
    placeholders: { binary_path: 'opencode', server_url: 'http://127.0.0.1:4096', launch_args: 'serve --port 4096' }
  },
  {
    driver: 'custom',
    display_name_key: 'providers.custom',
    summary_key: 'providers.customSummary',
    connection_kind: 'api-key',
    category: 'custom',
    default_base_url: '',
    default_model: '',
    capabilities: ['chat', 'streaming'],
    brand_color: '#8b949e',
    brand_bg: hexToRgba('#8b949e', 0.10),
    icon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.07.62-.07.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/></svg>`,
    fields: { base_url: true, model: true, api_key: true, binary_path: false, home_path: false, server_url: false, launch_args: false },
    placeholders: { base_url: 'https://your-api-endpoint.com/v1', model: 'model-name', api_key: 'your-api-key' }
  }
]

export function findTemplate(driver: string): ProviderTemplate | undefined {
  return PROVIDER_TEMPLATES.find((t) => t.driver === driver)
}

export const PROVIDER_CATEGORIES: { key: ProviderCategory; labelKey: string }[] = [
  { key: 'cloud-api', labelKey: 'settings.categoryCloudApi' },
  { key: 'local-server', labelKey: 'settings.categoryLocalServer' },
  { key: 'agent-cli', labelKey: 'settings.categoryAgentCli' },
  { key: 'custom', labelKey: 'settings.categoryCustom' }
]
