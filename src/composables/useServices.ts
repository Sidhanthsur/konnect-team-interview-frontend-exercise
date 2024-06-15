import { ref, onBeforeMount } from 'vue'
import axios from 'axios'

// This composable is a simplified example for the exercise **and could likely be improved**.
// Feel free to leave as-is, modify, or remove this file (and any others) as desired.
// https://vuejs.org/guide/reusability/composables.html

export default function useServices(): any {
  const services = ref<any[]>([])
  const loading = ref<any>(false)
  const error = ref<any>(false)
  const currentPage = ref<number>(1)
  const totalPages = ref<number>(1)
  const lastPage = ref<number>(1)
  const chunkedServices = ref<any[]>([])

  const getServices = async (search?: string): Promise<any> => {
    try {
      // Initialize loading state
      loading.value = true

      // Fetch data from the API
      const { data } = await axios.get(`/api/services${search ? `?q=${search}` : ''}`)

      // Store data in Vue ref
      services.value = data
      // chunk services into groups of 9
      // to display 9 services per page
      chunkedServices.value = services.value.reduce((resultArray: any, item: any, index: number) => {
        const chunkIndex = Math.floor(index / 9)

        if (!resultArray[chunkIndex]) {
          resultArray[chunkIndex] = [] // start a new chunk
        }

        resultArray[chunkIndex].push(item)

        return resultArray
      }, [])
      currentPage.value = 0
      totalPages.value = chunkedServices.value.length
      lastPage.value = chunkedServices.value.length
    } catch (err: any) {
      error.value = true
    } finally {
      // Reset loading state
      loading.value = false
    }
  }

  onBeforeMount(async (): Promise<void> => {
    // Fetch services from the API
    await getServices()
  })

  // Return stateful data
  return {
    services,
    loading,
    error,
    chunkedServices,
    currentPage,
    totalPages,
    lastPage,
    getServices,
  }
}
