<script setup lang="ts">
import { type Developer } from '@/constants/serviceTypes'
import Dialog from '@/components/modals/DialogComponent.vue'
const props = defineProps<{ developers: Developer[] }>()
defineEmits(['onClose'])
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
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgba(241, 241, 248, 1);
  margin-right: 12px;
}

.developer-details-modal__content {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}
</style>
