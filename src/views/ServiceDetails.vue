<script setup lang="ts">
import { useServiceDetailsStore } from "@/stores/serviceDetails";
import { onUnmounted } from "vue";
const serviceDetailsStore = useServiceDetailsStore();
const versions = serviceDetailsStore.versions;

onUnmounted(() => {
  serviceDetailsStore.resetVersions();
});
</script>
<template>
  <div class="service-details">
    <h2 class="service-details__title">Service Details</h2>
    <div class="service-details__versions">
      <h3 class="service-details__versions-title">Versions</h3>
      <ul class="service-details__versions-list">
        <li
          v-for="version in versions"
          :key="version.id"
          class="service-details__version"
        >
          <h4 class="service-details__version-title">{{ version.name }}</h4>
          <p class="service-details__version-description">
            {{ version.description }}
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>
