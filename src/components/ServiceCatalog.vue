<template>
  <div class="service-catalog">
    <div class="service-catalog__header">
      <div>
        <h1>Service Hub</h1>
        <span class="service-catalog__sub-title"
          >Organize services, manage and track versioning and API service
          documentation.
          <span class="service-catalog__sub-title--link">Learn more</span></span
        >
      </div>
      <div :style="{ display: 'flex' }">
        <div class="service-catalog__search-input">
          <img src="@/assets/search.svg" alt="search" width="20" height="20" />
          <input
            class="service-catalog__search-input-box"
            v-model="searchQuery"
            data-testid="search-input"
            placeholder="Search services"
          />
        </div>

        <button
          @click="isCreateServiceModalVisible = true"
          class="service-catalog__create-service"
        >
          <img src="@/assets/plus.svg" alt="plus" width="20" height="20" />
          <span>Service Package</span>
        </button>
      </div>
    </div>

    <div v-if="chunkedServices[currentPage]?.length">
      <div class="service-catalog__cards-container">
        <ServiceCatalogProduct
          v-for="service in chunkedServices[currentPage]"
          :key="service.id"
          :service="service"
        />
      </div>

      <!-- Buttons for going next and previos-->
      <div>
        <button @click="currentPage -= 1" :disabled="currentPage === 0">
          Previous
        </button>
        <!-- TODO:sid lets see if you can optimise bottom -->
        <!-- TODO: if only one element do we change the message ?-->
        <span>
          {{
            `Showing ${currentPage * 9 + 1} to ${
              currentPage * 9 + 9 > services.length
                ? chunkedServices[currentPage].length + currentPage * 9
                : currentPage * 9 + 9
            } of ${services.length} services`
          }}
        </span>
        <button
          @click="currentPage += 1"
          :disabled="currentPage === totalPages - 1"
        >
          Next
        </button>
      </div>
    </div>
    <div v-else data-testid="no-results">No services</div>
  </div>
  <CreateServiceModal
    v-if="isCreateServiceModalVisible"
    @onClose="isCreateServiceModalVisible = false"
  />
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  computed,
  watch,
  watchEffect,
  defineAsyncComponent,
} from "vue";
import useServices from "@/composables/useServices";
import ServiceCatalogProduct from "@/components/ServiceCatalogProduct.vue";

const CreateServiceModal = defineAsyncComponent(
  () => import("@/components/modals/CreateServiceModal.vue")
);

export default defineComponent({
  name: "ServiceCatalog",
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
    } = useServices();

    const debounce = (fn: Function) => {
      let timeoutId: ReturnType<typeof setTimeout>;
      return function (query?: string) {
        if (timeoutId) {
          clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
          fn(query);
        }, 1000);
      };
    };

    const debouncedGetServices = debounce(getServices);

    const searchQuery = ref("");
    const isCreateServiceModalVisible = ref(false);

    // Watch for changes in the search string
    watch(searchQuery, () => {
      debouncedGetServices(searchQuery.value);
    });

    return {
      services,
      loading,
      searchQuery,
      chunkedServices,
      currentPage,
      totalPages,
      isCreateServiceModalVisible,
    };
  },
});
</script>

<style lang="scss" scoped>
.service-catalog {
  background-color: #efefef;
  padding: 20px;
  max-width: 140rem;
}

.service-catalog__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.service-catalog__cards-container {
  // show 9 products per page
  // 3 products per row
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  row-gap: 1.2rem;
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
  font-weight: 400;
  font-size: 1.6rem;
  color: #3c4557;
}

.service-catalog__sub-title--link {
  color: #1456cb;
  cursor: pointer;
}

.service-catalog__search-input {
  border: 1px solid #e7e7ec;
  background-color: #fff;
  display: flex;
  align-items: center;
  height: 4.4rem;
  padding: 0 0.8rem;
  margin-right: 1rem;
}

.service-catalog__search-input-box {
  border: none;
  width: 100%;
  color: #6f7787;
  font-size: 1.4rem;

  &:focus {
    outline: none;
  }
}

.service-catalog__create-service {
  height: 4.4rem;
  padding: 1.2rem 2.4rem 1.2rem 1.6rem;
  background: #07a88d;
  display: flex;
  align-items: center;
  border: none;
  font-weight: 600;
  font-size: 1.6rem;
  color: white;
  border-radius: 10rem;
  cursor: pointer;
}
</style>
