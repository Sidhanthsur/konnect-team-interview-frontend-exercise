<script setup lang="ts">
import { computed } from "vue";
import { type Developer } from "@/constants/serviceTypes";
import Dialog from "@/components/modals/Dialog.vue";
const props = defineProps<{ developers: Developer[] }>();
defineEmits(["onClose"]);
</script>

<template>
  <Dialog @onClose="$emit('onClose')" title="Developers">
    <div class="service-catalog-developer">
      <template v-for="{ avatar, name } in props.developers">
        <div class="developer-details-modal__content">
          <img
            class="service-catalog-developer__avatars"
            :src="avatar"
            :alt="name"
          />
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
