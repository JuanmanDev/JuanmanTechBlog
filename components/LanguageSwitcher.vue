
<template>
  <USelect
    v-model="currentLocale"
    :items="locales"
    valueKey="code"
    labelKey="name"
    @update:modelValue="(locale) => setLocale(locale)" 
  />
</template>

<script setup>
const { locales, locale, setLocale } = useI18n()
const currentLocale = ref((locales.value.find(l => l.code === locale.value)).code)
</script>