<script setup lang="ts">
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
        src="@/assets/tick.svg"
      >
      <span class="service-catalog-publish-status__title">Published to portal</span>
    </div>

    <div
      v-else
      class="service-catalog-publish-status__container"
    >
      <img
        alt="Cross"
        src="@/assets/cross.svg"
      >
      <span class="service-catalog-publish-status__title">Unpublished</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.service-catalog-publish-status__container {
  align-items: center;
  display: flex;
}
.service-catalog-publish-status__title {
  color: rgba(60, 69, 87, 0.7);
  font-size: 1.2rem;
  font-weight: 400;
  margin-left: 0.5rem;
}
</style>
