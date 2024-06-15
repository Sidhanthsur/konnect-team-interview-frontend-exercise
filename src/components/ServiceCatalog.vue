<template>
  <div class="service-catalog-page">
    <div class="service-catalog">
      <div class="service-catalog__header">
        <div>
          <h1>Service Hub</h1>
          <span class="service-catalog__sub-title">Organize services, manage and track versioning and API service
            documentation.
            <span
              class="service-catalog__sub-title--link"
              @click="onLearnMoreClick"
            >Learn more</span></span>
        </div>
        <div class="service-catalog__right-section">
          <div class="service-catalog__search-input">
            <img
              alt="search"
              height="20"
              src="@/assets/search.svg"
              width="20"
            >
            <input
              v-model="searchQuery"
              class="service-catalog__search-input-box"
              data-testid="search-input"
              placeholder="Search services"
            >
          </div>

          <button
            class="service-catalog__create-service"
            @click="isCreateServiceModalVisible = true"
          >
            <img
              alt="plus"
              height="20"
              src="@/assets/plus.svg"
              width="20"
            >
            <span>Service Package</span>
          </button>
        </div>
      </div>

      <div v-if="loading">
        <div>Loading...</div>
      </div>

      <div v-else-if="error">
        <div>Oops something went wrong !</div>
      </div>

      <div v-else-if="chunkedServices[currentPage]?.length">
        <div class="service-catalog__cards-container">
          <ServiceCatalogProduct
            v-for="service in chunkedServices[currentPage]"
            :key="service.id"
            :service="service"
          />
        </div>

        <!-- Buttons for going next and previous-->
        <div class="service-catalog__pagination">
          <img
            v-if="currentPage === 0"
            alt="arrow-left"
            src="@/assets/disabled-black.svg"
          >
          <img
            v-else
            alt="arrow-left"
            src="@/assets/enabled-back.svg"
            @click="currentPage -= 1"
          >

          <span class="service-catalog__pagination-title">
            <span
              :style="{
                fontWeight: 600,
                color: '#3c4557',
              }"
            >
              {{ paginatedDisplayInfo }}
            </span>
            {{ `of ${services.length} services` }}
          </span>
          <img
            v-if="currentPage === totalPages - 1"
            alt="arrow-left"
            src="@/assets/disabled-forward.svg"
          >
          <img
            v-else
            alt="arrow-left"
            src="@/assets/enabled-forward.svg"
            @click="currentPage += 1"
          >
        </div>
      </div>
      <div
        v-else
        data-testid="no-results"
      >
        No services
      </div>
    </div>
  </div>
  <CreateServiceModal
    v-if="isCreateServiceModalVisible"
    @on-close="isCreateServiceModalVisible = false"
  />
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  watch,
  defineAsyncComponent,
  computed,
} from 'vue'
import useServices from '@/composables/useServices'
import ServiceCatalogProduct from '@/components/ServiceCatalogProduct.vue'

const CreateServiceModal = defineAsyncComponent(
  () => import('@/components/modals/CreateServiceModal.vue'),
)

export default defineComponent({
  name: 'ServiceCatalog',
  components: {
    ServiceCatalogProduct,
    CreateServiceModal,
  },
  setup() {
    // Import services from the composable
    const {
      services,
      loading,
      chunkedServices,
      currentPage,
      totalPages,
      getServices,
      error,
    } = useServices()

    const debounce = (fn: (...args: any[]) => any) => {
      let timeoutId: ReturnType<typeof setTimeout>
      return function(query?: string) {
        if (timeoutId) {
          clearTimeout(timeoutId)
        }
        timeoutId = setTimeout(() => {
          fn(query)
        }, 1000)
      }
    }

    const debouncedGetServices = debounce(getServices)
    const onLearnMoreClick = () => {
      window.open('https://konghq.com/products/kong-konnect', '_blank')
    }

    const searchQuery = ref('')
    const isCreateServiceModalVisible = ref(false)

    const paginatedDisplayInfo = computed(
      () =>
        `${currentPage.value * 9 + 1} to ${
          currentPage.value * 9 + 9 > services.value.length
            ? chunkedServices.value[currentPage.value].length +
              currentPage.value * 9
            : currentPage.value * 9 + 9
        }`,
    )

    // Watch for changes in the search string
    watch(searchQuery, () => {
      debouncedGetServices(searchQuery.value)
    })

    return {
      services,
      loading,
      searchQuery,
      chunkedServices,
      currentPage,
      totalPages,
      isCreateServiceModalVisible,
      onLearnMoreClick,
      error,
      paginatedDisplayInfo,
    }
  },
})
</script>

<style lang="scss" scoped>
.service-catalog-page {
  background-color: #efefef;
  display: flex;
  justify-content: center;
}
.service-catalog {
  background-color: #efefef;
  padding: 2rem;
}

.service-catalog__header {
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;

  @media (max-width: 1024px) {
    align-items: flex-start;
    flex-direction: column;
  }
}

.service-catalog__right-section {
  display: flex;

  //for mobile
  @media (max-width: 1024px) {
    margin-top: 1.6rem;
  }
}

.service-catalog__cards-container {
  // show 9 products per page
  // 3 products per row
  display: grid;
  gap: 1.2rem;
  grid-template-columns: repeat(3, 1fr);
  // for tablet view
  @media (min-width: 768px) and (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  // for mobile view
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.service-catalog__sub-title {
  color: #3c4557;
  font-size: 1.6rem;
  font-weight: 400;
}

.service-catalog__sub-title--link {
  color: #1456cb;
  cursor: pointer;
}

.service-catalog__search-input {
  align-items: center;
  background-color: #fff;
  border: 1px solid #e7e7ec;
  display: flex;
  height: 4.4rem;
  margin-right: 1rem;
  padding: 0 0.8rem;
}

.service-catalog__search-input-box {
  border: none;
  color: #6f7787;
  font-size: 1.4rem;
  width: 100%;

  &:focus {
    outline: none;
  }
}

.service-catalog__create-service {
  align-items: center;
  background: #07a88d;
  border: none;
  border-radius: 10rem;
  color: white;
  cursor: pointer;
  display: flex;
  font-size: 1.6rem;
  font-weight: 600;
  height: 4.4rem;
  padding: 1.2rem 2.4rem 1.2rem 1.6rem;
}

.service-catalog__pagination {
  align-items: center;
  bottom: 1rem;
  display: flex;
  justify-content: space-between;
  left: 0;
  margin: auto;
  margin-top: 1.2rem;
  max-width: 26.2rem;
  position: sticky;
  right: 0;
}

.service-catalog__pagination-title {
  color: #707888;
  font-size: 1.3rem;
  font-weight: 500;
  opacity: 70%;
}
</style>
