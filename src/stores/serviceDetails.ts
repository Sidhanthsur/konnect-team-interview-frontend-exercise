import type { Version } from '@/constants/serviceTypes'
import { defineStore } from 'pinia'
import { ref } from 'vue'

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
