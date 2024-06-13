<script setup lang="ts">
import { computed, ref } from "vue";
import { type Version } from "@/constants/serviceTypes";
import DeveloperDetailsModal from "@/components/modals/DeveloperDetailsModal.vue";
const props = defineProps<{ versions: Version[] }>();
const isDeveloperModalVisible = ref(false);

const uniqueDevelopers = computed(() => {
  return props.versions
    .filter((version) => version.developer)
    .map((version) => version.developer)
    .filter(
      (developer, index, self) =>
        index === self.findIndex((t) => t.id === developer.id)
    );
});

const getDevelopers = computed(() => {
  const developers = [...uniqueDevelopers.value];

  if (developers.length > 3) {
    developers.splice(2);
    developers.push({ avatar: "+", name: "", id: "", email: "" });
    return developers.reverse();
  }
  return developers;
});
</script>

<template>
  <div
    class="service-catalog-developer"
    @click="isDeveloperModalVisible = true"
  >
    <template v-for="{ avatar, name } in getDevelopers">
      <div
        class="service-catalog-developer__avatars service-catalog-developer__avatars--plus"
        v-if="avatar === '+'"
      >
        + {{ uniqueDevelopers.length - 2 }}
      </div>

      <img
        v-else-if="avatar"
        class="service-catalog-developer__avatars"
        :src="avatar"
        :alt="name"
      />
    </template>
  </div>
  <DeveloperDetailsModal
    v-if="isDeveloperModalVisible"
    :developers="uniqueDevelopers"
    @onClose="isDeveloperModalVisible = false"
  />
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
</style>
