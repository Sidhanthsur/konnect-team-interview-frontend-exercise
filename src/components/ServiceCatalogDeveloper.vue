<script setup lang="ts">
import { computed, watchEffect, ref } from 'vue'
import { type Developer, type Version } from '@/constants/serviceTypes'

const emit = defineEmits<{ onDeveloperClicked: [Event] }>()
const props = defineProps<{
  versions: Version[];
  uniqueDevelopers: Developer[];
}>()

const displayDevelopers = computed(() => {
  const developers = [...props.uniqueDevelopers]

  if (developers.length > 3) {
    developers.splice(2)
    developers.push({ avatar: '+', name: '', id: '', email: '' })
    return developers.reverse()
  }
  return developers
})

const imageReferences = ref<Record<string, boolean>>({})

// add id of developer as key with a boolean value
watchEffect(() => {
  displayDevelopers.value.forEach((developer) => {
    if (developer.avatar !== '+') {
      imageReferences.value[developer.id] = false
    }
  })
})
</script>

<template>
  <div
    class="service-catalog-developer"
    @click="emit('onDeveloperClicked', $event)"
  >
    <template
      v-for="{ avatar, name, id } in displayDevelopers"
      :key="id"
    >
      <div
        class="service-catalog-developer__avatar-container"
        :style="{
          position: 'relative',
        }"
      >
        <div
          v-if="avatar === '+'"
          class="service-catalog-developer__avatars service-catalog-developer__avatars--plus"
        >
          + {{ uniqueDevelopers.length - 2 }}
        </div>
        <img
          v-else-if="avatar"
          :id="id"
          :alt="name"
          class="service-catalog-developer__avatars"
          :src="avatar"
          @mouseleave="imageReferences[id] = false"
          @mouseover="imageReferences[id] = true"
        >
        <div
          v-if="imageReferences[id]"
          class="service-catalog-developer__avatars-hover"
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
  background: rgba(241, 241, 248, 1);
  border-radius: 50%;
  height: 3.6rem;
  margin-left: -14px;
  position: relative;
  width: 3.6rem;
}

.service-catalog-developer__avatars--plus {
  align-items: center;
  border: 1px solid white;
  color: rgba(119, 125, 138, 1);
  display: flex;
  font-size: 12px;
  font-weight: 600;
  justify-content: center;
  position: relative;
}

.service-catalog-developer__avatar-container {
  position: relative;

  &:nth-child(1) {
    z-index: 2;
  }
  &:nth-child(2) {
    z-index: 1;
  }
}

.service-catalog-developer__avatars-hover {
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  font-size: 8px;
  padding: 0.4rem;
  position: absolute;
  right: 15%;
  top: -3.6rem;
}
</style>
