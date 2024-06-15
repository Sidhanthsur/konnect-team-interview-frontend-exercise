<script setup lang="ts">
import { type Service } from '@/constants/serviceTypes'
import ServiceCatalogPublishStatus from '@/components/ServiceCatalogPublishStatus.vue'
import ServiceCatalogRuntimeLog from '@/components/ServiceCatalogRuntimeLog.vue'
import ServiceCatalogDeveloper from '@/components/ServiceCatalogDeveloper.vue'
import { useServiceDetailsStore } from '@/stores/serviceDetails'
import { useRouter } from 'vue-router'
import { computed, defineProps, ref, defineAsyncComponent } from 'vue'

const DeveloperDetailsModal = defineAsyncComponent(
  () => import('@/components/modals/DeveloperDetailsModal.vue'),
)

const props = defineProps<{ service: Service }>()

const router = useRouter()
const isDeveloperModalVisible = ref(false)
const uniqueDevelopers = computed(() => {
  return props.service.versions
    .filter((version) => version.developer)
    .map((version) => version.developer)
    .filter(
      (developer, index, self) =>
        index === self.findIndex((t) => t.id === developer.id),
    )
})

const setVersionsInServiceDetailsStore = (service: Service) => {
  if (!service.versions.length) {
    alert('No versions available for this service')
    return
  }
  const serviceDetailsStore = useServiceDetailsStore()
  serviceDetailsStore.versions = service.versions
  router.push({ name: 'serviceDetails' })
}
</script>

<template>
  <div
    class="service-catalog-product__card"
    @click="setVersionsInServiceDetailsStore(service)"
  >
    <div>
      <div class="service-catalog-product__top-header">
        <!-- Published status -->
        <ServiceCatalogPublishStatus :published="service.published" />
        <!--Version-->
        <div
          v-if="service?.versions?.length"
          class="service-catalog-product__version"
        >
          <p>
            {{
              `${service.versions.length} ${
                service.versions.length > 1 ? "versions" : "Version"
              }`
            }}
          </p>
        </div>
      </div>

      <!--Name-->
      <div class="service-catalog-product__name">
        {{ service.name }}
      </div>
      <!--Description-->
      <div class="service-catalog-product__description">
        {{ service.description }}
      </div>
    </div>

    <!--Bottom -->
    <div class="service-catalog-product__bottom">
      <!--Runtime log-->
      <ServiceCatalogRuntimeLog :metrics="service.metrics" />
      <ServiceCatalogDeveloper
        v-if="service.versions.length"
        :unique-developers="uniqueDevelopers"
        :versions="service.versions"
        @on-developer-clicked="
          (event) => {
            event.stopPropagation();
            isDeveloperModalVisible = true;
          }
        "
      />
    </div>
  </div>
  <DeveloperDetailsModal
    v-if="isDeveloperModalVisible"
    :developers="uniqueDevelopers"
    @on-close="isDeveloperModalVisible = false"
  />
</template>

<style lang="scss" scoped>
.service-catalog-product__card {
  background-color: white;
  border-radius: 0.8rem;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  height: 23.2rem;
  justify-content: space-between;
  justify-self: center;
  padding: 1.6rem;
  width: 42.6rem;

  // for tablet
  @media (max-width: 1024px) {
    height: 19.72rem;
    width: 35.6rem;
  }

  // for mobile
  @media (max-width: 768px) {
    width: 32.04rem;
  }
}

.service-catalog-product__top-header {
  align-items: center;
  display: flex;
  height: 3.3rem;
  justify-content: space-between;
}

.service-catalog-product__version {
  align-items: center;
  background: rgba(242, 246, 254, 1);
  border-radius: 1.6rem;
  color: rgba(88, 136, 219, 1);
  cursor: pointer;
  display: flex;
  font-size: 1.3rem;
  height: 3.3rem;
  justify-content: center;
  width: 8.8rem;
}

.service-catalog-product__name {
  color: rgba(60, 69, 87, 1);
  font-size: 2rem;
  font-weight: 500;
  margin-top: 1.2rem;
}

.service-catalog-product__description {
  color: rgba(112, 120, 136, 1);
  font-size: 1.3rem;
  font-weight: 400;
  margin-top: 0.8rem;
}

.service-catalog-product__bottom {
  align-items: center;
  display: flex;
  justify-content: space-between;
}
</style>
