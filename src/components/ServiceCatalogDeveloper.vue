<script setup lang="ts">
import { computed, watchEffect, ref, watch } from "vue";
import { type Version } from "@/constants/serviceTypes";

const props = defineProps<{ versions: Version[] }>();

const getDevelopers = computed(() => {
  const developers = props.versions
    .filter((version) => version.developer)
    .map((version) => {
      return {
        avatar: version.developer.avatar,
        name: version.developer.name,
        id: version.developer.id,
      };
    })
    .filter(
      (developer, index, self) =>
        index === self.findIndex((t) => t.id === developer.id)
    );

  if (developers.length > 3) {
    developers.splice(2);
    developers.push({ avatar: "+", name: "", id: "" });
    return developers.reverse();
  }
  return developers;
});

const imageReferences = ref<Record<string, boolean>>({});

// add id of developer as key with a boolean value
watchEffect(() => {
  getDevelopers.value.forEach((developer) => {
    if (developer.avatar !== "+") {
      imageReferences.value[developer.id] = false;
    }
  });
});
</script>

<template>
  <div class="service-catalog-developer">
    <template v-for="{ avatar, name, id } in getDevelopers">
      <div
        :style="{
          position: 'relative',
        }"
      >
        <div
          class="service-catalog-developer__avatars service-catalog-developer__avatars--plus"
          v-if="avatar === '+'"
        >
          + {{ props.versions.length - 2 }}
        </div>
        <img
          v-else-if="avatar"
          class="service-catalog-developer__avatars"
          :src="avatar"
          :alt="name"
          :id="id"
          @mouseover="imageReferences[id] = true"
          @mouseleave="imageReferences[id] = false"
        />
        <div
          class="service-catalog-developer__avatars-hover"
          v-if="imageReferences[id]"
        >
          {{ name }}
        </div>
      </div>
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
  margin-left: -14px;
}

.service-catalog-developer__avatars--plus {
  color: rgba(119, 125, 138, 1);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  font-weight: 600;
}

.service-catalog-developer__avatars:nth-child(1) {
  z-index: 2;
}

.service-catalog-developer__avatars:nth-child(2) {
  z-index: 1;
}

.service-catalog-developer__avatars--plus {
  border: 1px solid white;
}

.service-catalog-developer__avatars-hover {
  position: absolute;
  top: -3rem;
  font-size: 8px;
  padding: 0.4rem;
  color: white;
  background-color: rgba(0, 0, 0, 0.5);
  right: 15%;

  &::before {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    border: solid transparent;
    height: 0;
    width: 0;
    border-width: 6px;
    margin-left: -6px;
    border-top-color: rgba(0, 0, 0, 0.5);
  }
}
</style>
