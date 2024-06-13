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
      <div class="service-catalog__search-input">
        <img src="@/assets/search.svg" alt="search" width="20" height="20" />
        <input
          class="service-catalog__search-input-box"
          v-model="searchQuery"
          data-testid="search-input"
          placeholder="Search services"
        />
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
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch, watchEffect } from "vue";
import useServices from "@/composables/useServices";
import ServiceCatalogProduct from "@/components/ServiceCatalogProduct.vue";

export default defineComponent({
  name: "ServiceCatalog",
  components: {
    ServiceCatalogProduct,
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

    // Set the search string to a Vue ref
    const searchQuery = ref("");

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
    };
  },
});
</script>

<style lang="scss" scoped>
.service-catalog {
  background-color: #efefef;
  padding: 20px;
  max-width: 1400px;
}

.catalog {
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  margin: 20px 0 0 0;
}

.service {
  border: 1px solid #999;
  border-radius: 10px;
  margin: 6px;
  padding: 8px 16px;
  width: 200px;

  p:first-of-type {
    color: #333;
    font-weight: 700;
  }

  p {
    color: #666;
  }
}

input {
  padding: 8px 4px;
}

.service-catalog__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.service-catalog__cards-container {
  // show 9 products per page
  // 3 products per row
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  row-gap: 12px;
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
  font-size: 16px;
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
  height: 44px;
  padding: 0 8px;
}

.service-catalog__search-input-box {
  border: none;
  width: 100%;
  color: #6f7787;
  font-size: 14px;

  &:focus {
    outline: none;
  }
}
</style>
