<script setup lang="ts">
import tickImage from '@/assets/tick.svg'
import crossImage from '@/assets/cross.svg'

defineProps<{ published: boolean }>()
</script>
<template>
  <div class="">
    <!-- Published status -->
    <div
      v-if="published"
      class="service-catalog-publish-status__container"
    >
      <img
        alt="Tick"
        :src="tickImage"
      >
      <span class="service-catalog-publish-status__title">Published to portal</span>
    </div>

    <div
      v-else
      class="service-catalog-publish-status__container"
    >
      <img
        alt="Tick"
        :src="crossImage"
      >
      <span class="service-catalog-publish-status__title">Unpublished</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.service-catalog-publish-status__container {
  display: flex;
  align-items: center;
}
.service-catalog-publish-status__title {
  font-size: 12px;
  font-weight: 400;
  color: rgba(60, 69, 87, 0.7);
  margin-left: 5px;
}
</style>
