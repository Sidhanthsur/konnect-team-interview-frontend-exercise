<script setup lang="ts">
import { computed } from "vue";
import { type Version } from "@/constants/serviceTypes";
const props = defineProps<{ versions: Version[] }>();

// write a computed to get all the developer's avatar from the versions
const developerAvatars = computed(() => {
  return props.versions.map((version) => version.developer?.avatar ?? "");
});

// if more than 3 developers, only show the first 3
// and then add a "+" sign to indicate there are more developers
const developerAvatarsToShow = computed(() => {
  if (developerAvatars.value.length > 3) {
    return developerAvatars.value.slice(0, 2).concat(["+"]);
  }
  return developerAvatars.value;
});
</script>

<template>
  <div class="service-catalog-developer">
    <template v-for="avatar in developerAvatarsToShow">
      <div
        class="service-catalog-developer__avatars service-catalog-developer__avatars--plus"
        v-if="avatar === '+'"
      >
        + {{ developerAvatars.length - 2 }}
      </div>
      <img
        v-else-if="avatar"
        class="service-catalog-developer__avatars"
        :src="avatar"
        alt="Developer avatar"
      />
    </template>
  </div>
</template>

<style scoped>
.service-catalog-developer {
  display: flex;
}
.service-catalog-developer__avatars {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgba(241, 241, 248, 1);
}

.service-catalog-developer__avatars--plus {
  color: rgba(119, 125, 138, 1);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  font-weight: 600;
}

.service-catalog-developer__avatars + .service-catalog-developer__avatars {
  margin-left: -12px;
}
</style>
