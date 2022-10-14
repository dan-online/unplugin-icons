import { defineNuxtModule, isNuxt3 } from '@nuxt/kit'
import { name } from '../package.json'

import type { Options } from './types'
import unplugin from '.'

export default defineNuxtModule<Options>({
  meta: {
    name,
    configKey: 'unplugin',
  },
  defaults: {},
  setup: (options, nuxtApp) => {
    if (isNuxt3(nuxtApp))
      options.compiler = 'vue3'

    // install webpack plugin
    nuxtApp.hook('webpack:config', (configs: any[]) => {
      configs.forEach((config) => {
        config.plugins = config.plugins || []
        config.plugins.unshift(unplugin.webpack(options))
      })
    })

    // install vite plugin
    nuxtApp.hook('vite:extend', async (vite: any) => {
      vite.config.plugins = vite.config.plugins || []
      vite.config.plugins.push(unplugin.vite(options))
    })
  },
})
