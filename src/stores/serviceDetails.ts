import type { Version } from '@/constants/serviceTypes'
import { defineStore } from 'pinia'
import { ref } from 'vue'

// Example Pinia store: https://pinia.vuejs.org/
// This code is not utilized in the take-home exercise starter template.

export const useServiceDetailsStore = defineStore('serviceDetails', () => {
  const versions = ref<Version[]>([])

  const resetVersions = () => {
    versions.value = []
  }

  return {
    versions,
    resetVersions,
  }
})
