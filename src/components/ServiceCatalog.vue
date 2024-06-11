<template>
  <div class="service-catalog">
    <h1>Service Catalog</h1>
    <input
      v-model="searchQuery"
      class="search-input"
      data-testid="search-input"
      placeholder="Search services"
    />

    <div v-if="chunkedServices[currentPage]?.length">
      <ul class="catalog">
        <li
          v-for="service in chunkedServices[currentPage]"
          :key="service.id"
          class="service"
        >
          <div>
            <p>
              {{ service.name }}
            </p>
            <p>{{ service.description }}</p>
          </div>
        </li>
      </ul>

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
import type { R } from "vitest/dist/reporters-1evA5lom.js";

export default defineComponent({
  name: "ServiceCatalog",
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
  margin: 2rem auto;
  max-width: 1366px;
  padding: 0 20px;
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
</style>
