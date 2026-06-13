import { describe, expect, it } from 'vitest'
import { findTemplate, PROVIDER_TEMPLATES } from './providerTemplates'

describe('provider templates', () => {
  it('includes built-in no-login providers without API key fields', () => {
    const pollinations = findTemplate('pollinations')
    const lmStudio = findTemplate('lmstudio')
    const llamaCpp = findTemplate('llamacpp')

    expect(pollinations).toMatchObject({
      connection_kind: 'public-api',
      default_base_url: 'https://gen.pollinations.ai/v1',
      default_model: 'openai'
    })
    expect(pollinations?.fields.api_key).toBe(false)
    expect(pollinations?.capabilities).toContain('no-api-key')
    expect(pollinations?.capabilities).toContain('public-api')

    expect(lmStudio).toMatchObject({
      connection_kind: 'local-server',
      default_base_url: 'http://localhost:1234/v1'
    })
    expect(lmStudio?.fields.api_key).toBe(false)
    expect(lmStudio?.capabilities).toContain('no-api-key')

    expect(llamaCpp).toMatchObject({
      connection_kind: 'local-server',
      default_base_url: 'http://localhost:8080/v1'
    })
    expect(llamaCpp?.fields.api_key).toBe(false)
    expect(llamaCpp?.capabilities).toContain('no-api-key')
  })

  it('keeps provider drivers unique', () => {
    const drivers = PROVIDER_TEMPLATES.map((template) => template.driver)

    expect(new Set(drivers).size).toBe(drivers.length)
  })
})
