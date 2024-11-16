
<template>
  <USelectMenu v-model="currentLocale" :options="locales" option-attribute="name"  @change="(locale) => setLocale(locale.code)">
  </USelectMenu>
</template>

<script setup>
const { locales, locale, setLocale } = useI18n()
const currentLocale = ref(locales.value.find(l => l.code === locale.value))
</script>