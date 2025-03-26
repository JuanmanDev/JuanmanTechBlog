<script setup lang="ts">
const links = [{
  label: 'Resources',
  children: [{
    label: 'Help center'
  }, {
    label: 'Docs'
  }, {
    label: 'Roadmap'
  }, {
    label: 'Changelog'
  }]
}, {
  label: 'Features',
  children: [{
    label: 'Affiliates'
  }, {
    label: 'Portal'
  }, {
    label: 'Jobs'
  }, {
    label: 'Sponsors'
  }]
}, {
  label: 'Company',
  children: [{
    label: 'About'
  }, {
    label: 'Pricing'
  }, {
    label: 'Careers'
  }, {
    label: 'Blog'
  }]
}]

const toast = useToast()

const email = ref('')
const loading = ref(false)

function onSubmit() {
  loading.value = true

  setTimeout(() => {
    toast.add({
      title: 'Subscribed!',
      description: 'You\'ve been subscribed to our newsletter.'
    })

    loading.value = false
  }, 1000)
}
</script>

<template>
  <footer class="border-t border-neutral-200 dark:border-neutral-800 z-50 lg:!border-transparent bg-neutral-50/75 dark:bg-neutral-950/75 backdrop-blur w-full py-2">
    <div class="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-2 h-[--header-height]">
      <p class="text-neutral-700 dark:text-neutral-300 text-sm ">
        Copyright © {{ new Date().getFullYear() }}. All rights reserved.
      </p>
      <p class="text-neutral-900 dark:text-white">
        Made with ❤️ by Juanman Béc
      </p>
      <div>
        <ButtonsColorModeButton size="sm" />

        <UButton
          to="https://github.com/JuanmanDev/JuanmanTechBlog?ref=juanman.tech_footer"
          target="_blank"
          icon="i-simple-icons-github"
          aria-label="GitHub"
          color="neutral" variant="ghost"
        />
      </div>
    </div>
  </footer>
</template>
