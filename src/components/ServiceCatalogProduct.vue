<script setup lang="ts">
import { type Service } from "@/constants/serviceTypes";
import ServiceCatalogPublishStatus from "@/components/ServiceCatalogPublishStatus.vue";
defineProps<{ service: Service }>();
</script>

<template>
  <div class="service-catalog-product__card">
    <!-- Published status -->
    <ServiceCatalogPublishStatus :published="service.published" />
  </div>
</template>

<style lang="scss" scoped>
.service-catalog-product__card {
  background-color: white;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  margin: 1rem;
  padding: 1.6rem;
  width: 28rem;
  height: 14.5rem;
}
</style>
