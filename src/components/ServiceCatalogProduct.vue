<script setup lang="ts">
import { type Service } from "@/constants/serviceTypes";
import ServiceCatalogPublishStatus from "@/components/ServiceCatalogPublishStatus.vue";
import ServiceCatalogRuntimeLog from "@/components/ServiceCatalogRuntimeLog.vue";
import ServiceCatalogDeveloper from "@/components/ServiceCatalogDeveloper.vue";
import { useServiceDetailsStore } from "@/stores/serviceDetails";
import { useRouter } from "vue-router";
import { computed, defineProps, ref, defineAsyncComponent } from "vue";

const DeveloperDetailsModal = defineAsyncComponent(
  () => import("@/components/modals/DeveloperDetailsModal.vue")
);

const props = defineProps<{ service: Service }>();

const serviceDetailsStore = useServiceDetailsStore();
const router = useRouter();
const isDeveloperModalVisible = ref(false);
const uniqueDevelopers = computed(() => {
  return props.service.versions
    .filter((version) => version.developer)
    .map((version) => version.developer)
    .filter(
      (developer, index, self) =>
        index === self.findIndex((t) => t.id === developer.id)
    );
});

const setVersionsInServiceDetailsStore = (service: Service) => {
  serviceDetailsStore.versions = service.versions;
  router.push({ name: "serviceDetails" });
};
</script>

<template>
  <div
    class="service-catalog-product__card"
    @click="setVersionsInServiceDetailsStore(service)"
  >
    <div
      :style="{
        'pointer-events': 'none',
      }"
    >
      <div class="service-catalog-product__top-header">
        <!-- Published status -->
        <ServiceCatalogPublishStatus :published="service.published" />
        <!--Version-->
        <div
          class="service-catalog-product__version"
          v-if="service?.versions?.length"
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
      <div class="service-catalog-product__name">{{ service.name }}</div>
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
        :versions="service.versions"
        :uniqueDevelopers="uniqueDevelopers"
        @onDeveloperClicked="
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
    @onClose="isDeveloperModalVisible = false"
  />
</template>

<style lang="scss" scoped>
.service-catalog-product__card {
  background-color: white;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  justify-self: center;
  padding: 1.6rem;
  width: 42.6rem;
  height: 23.2rem;
  cursor: pointer;

  // for tablet
  @media (max-width: 1024px) {
    width: 35.6rem;
    height: 19.72rem;
  }

  // for mobile
  @media (max-width: 768px) {
    width: 32.04rem;
  }
}

.service-catalog-product__top-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 33px;
}

.service-catalog-product__version {
  height: 33px;
  width: 88px;
  background: rgba(242, 246, 254, 1);
  border-radius: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: rgba(88, 136, 219, 1);
  font-size: 13px;
  cursor: pointer;
}

.service-catalog-product__name {
  font-size: 20px;
  font-weight: 500;
  color: rgba(60, 69, 87, 1);
  margin-top: 12px;
}

.service-catalog-product__description {
  font-size: 13px;
  color: rgba(112, 120, 136, 1);
  font-weight: 400;
  margin-top: 8px;
}

.service-catalog-product__bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
