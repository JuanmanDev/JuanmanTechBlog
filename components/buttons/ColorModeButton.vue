<script lang="ts">
import type { ButtonProps } from '@nuxt/ui'

export interface ColorModeButtonProps extends /** @vue-ignore */ Pick<ButtonProps, 'as' | 'size' | 'disabled' | 'ui'> {
  /**
   * @defaultValue 'neutral'
   */
  color?: ButtonProps['color']
  /**
   * @defaultValue 'ghost'
   */
  variant?: ButtonProps['variant']
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { useColorMode, useAppConfig } from '#imports'

defineOptions({ inheritAttrs: false })

withDefaults(defineProps<ColorModeButtonProps>(), {
  color: 'neutral',
  variant: 'ghost'
})
defineSlots<{
  fallback(props?: {}): any
}>()

const colorMode = useColorMode()
const appConfig = useAppConfig()

const isDark = computed({
  get() {
    return colorMode.value === 'dark'
  },
  set() {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
  }
})
</script>

<template>
  <ClientOnly v-if="!colorMode?.forced">
    <UButton
      :icon="isDark ? 'i-lucide-moon' : 'i-lucide-sun'"
      :color="color"
      :variant="variant"
      v-bind="$attrs"
      aria-label="change theme"
      @click="isDark = !isDark"
    />

    <template #fallback>
      <slot name="fallback">
        <div class="size-8" />
      </slot>
    </template>
  </ClientOnly>
</template>
