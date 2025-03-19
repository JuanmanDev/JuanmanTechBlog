export default defineAppConfig({
  ui: {
    primary: 'indigo',
    gray: 'zinc',
    variables: {
      light: {
        background: 'var(--color-neutral-50)'
      },
      dark: {
        background: 'var(--color-neutral-950)'
      }
    },
    button: {
      rounded: 'rounded-full',
      default: {
        size: 'md',
        color: 'black'
      }
    },
    input: {
      rounded: 'rounded-full'
    },
    header: {
      wrapper: 'lg:!border-transparent bg-neutral-50 dark:bg-neutral-950',
      links: {
        wrapper: 'ring-1 ring-neutral-200 dark:ring-neutral-800 px-3 gap-x-0 rounded-full',
        base: 'py-2 px-4 font-medium transition-colors relative after:absolute after:-bottom-px after:inset-x-2 after:h-px after:rounded-full after:opacity-0 after:bg-neutral-900 dark:after:bg-white after:transition-opacity',
        active: 'text-neutral-900 dark:text-white after:opacity-100',
        inactive: 'text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200'
      }
    },
    footer: {
      top: {
        wrapper: 'border-t border-neutral-200 dark:border-neutral-800',
        container: 'py-8 lg:py-16'
      },
      bottom: {
        wrapper: 'border-t border-neutral-200 dark:border-neutral-800'
      }
    },
    pricing: {
      card: {
        highlight: 'ring-neutral-900 dark:ring-white',
        features: {
          item: {
            icon: {
              base: 'text-neutral-900 dark:text-white'
            }
          }
        }
      }
    }
  }
})
