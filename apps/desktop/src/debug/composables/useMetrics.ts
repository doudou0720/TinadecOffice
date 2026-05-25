import { ref } from 'vue'
import type { MetricsResponse, DiagnosticsReport } from '../types/metrics'

/**
 * Composable for fetching metrics and diagnostics data.
 */
export function useMetrics() {
  const gatewayUrl = window.tinadec?.gatewayUrl?.() ?? 'http://127.0.0.1:48730'

  const metrics = ref<MetricsResponse | null>(null)
  const diagnostics = ref<DiagnosticsReport | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function fetchMetrics(metricName: string, windowMs?: number, bucketMs?: number): Promise<void> {
    loading.value = true
    try {
      const params = new URLSearchParams()
      params.set('metricName', metricName)
      if (windowMs) params.set('windowMs', String(windowMs))
      if (bucketMs) params.set('bucketMs', String(bucketMs))

      const response = await fetch(`${gatewayUrl}/api/v1/debug/metrics?${params.toString()}`)
      if (!response.ok) throw new Error(`HTTP ${response.status}`)
      metrics.value = await response.json()
    } catch (e) {
      error.value = `Failed to fetch metrics: ${e}`
    } finally {
      loading.value = false
    }
  }

  async function fetchDiagnostics(): Promise<void> {
    loading.value = true
    try {
      const response = await fetch(`${gatewayUrl}/api/v1/debug/diagnostics`)
      if (!response.ok) throw new Error(`HTTP ${response.status}`)
      diagnostics.value = await response.json()
    } catch (e) {
      error.value = `Failed to fetch diagnostics: ${e}`
    } finally {
      loading.value = false
    }
  }

  async function fetchProcessInfo(): Promise<Record<string, unknown> | null> {
    try {
      const response = await fetch(`${gatewayUrl}/api/v1/debug/processes`)
      if (!response.ok) throw new Error(`HTTP ${response.status}`)
      return await response.json()
    } catch (e) {
      error.value = `Failed to fetch process info: ${e}`
      return null
    }
  }

  return {
    metrics,
    diagnostics,
    loading,
    error,
    fetchMetrics,
    fetchDiagnostics,
    fetchProcessInfo,
  }
}
