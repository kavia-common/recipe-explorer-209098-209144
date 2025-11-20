import { computed } from 'vue';

/**
 * PUBLIC_INTERFACE
 * Returns runtime configuration focusing on public values for browser-safe access.
 */
export function useRuntime() {
  const config = useRuntimeConfig();
  const apiBase = computed(() => (config.public?.apiBase as string) || '');

  return {
    apiBase,
    config,
  };
}
