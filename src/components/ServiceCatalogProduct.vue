<script setup lang="ts">
import { type Service } from "@/constants/serviceTypes";
import ServiceCatalogPublishStatus from "@/components/ServiceCatalogPublishStatus.vue";
import ServiceCatalogRuntimeLog from "@/components/ServiceCatalogRuntimeLog.vue";
import ServiceCatalogDeveloper from "@/components/ServiceCatalogDeveloper.vue";
import { useServiceDetailsStore } from "@/stores/serviceDetails";
import { useRouter } from "vue-router";

defineProps<{ service: Service }>();

const serviceDetailsStore = useServiceDetailsStore();
const router = useRouter();

const setVersionsInServiceDetailsStore = (service: Service) => {
  serviceDetailsStore.versions = service.versions;
  router.push({ name: "serviceDetails" });
};
</script>

<template>
  <div class="service-catalog-product__card">
    <div>
      <div class="service-catalog-product__top-header">
        <!-- Published status -->
        <ServiceCatalogPublishStatus :published="service.published" />
        <!--Version-->
        <div
          class="service-catalog-product__version"
          v-if="service?.versions?.length"
          @click="setVersionsInServiceDetailsStore(service)"
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
      />
    </div>
  </div>
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
