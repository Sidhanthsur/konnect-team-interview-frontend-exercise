<script setup lang="ts">
import { type Developer } from '@/constants/serviceTypes'
import Dialog from '@/components/modals/DialogComponent.vue'
const props = defineProps<{ developers: Developer[] }>()
defineEmits<{
  onClose: [];
}>()
</script>

<template>
  <Dialog
    title="Developers"
    @on-close="$emit('onClose')"
  >
    <div class="service-catalog-developer">
      <template
        v-for="{ avatar, name, id } in props.developers"
        :key="id"
      >
        <div class="developer-details-modal__content">
          <img
            :alt="name"
            class="service-catalog-developer__avatars"
            :src="avatar"
          >
          <div>{{ name }}</div>
        </div>
      </template>
    </div>
  </Dialog>
</template>

<style scoped>
.service-catalog-developer {
  display: flex;
  flex-direction: column;
}
.service-catalog-developer__avatars {
  background: rgba(241, 241, 248, 1);
  border-radius: 50%;
  height: 3.6rem;
  margin-right: 1.2rem;
  width: 3.6rem;
}

.developer-details-modal__content {
  align-items: center;
  display: flex;
  margin-bottom: 1rem;
}
</style>
