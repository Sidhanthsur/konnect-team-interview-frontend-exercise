<script setup lang="ts">
import { type Metrics } from "@/constants/serviceTypes";
defineProps<{ metrics: Metrics }>();

const formatRequests = (requests: number) => {
  if (requests > 1000000) {
    return `${Math.round(requests / 1000000)}m`;
  } else if (requests > 1000) {
    return `${Math.round(requests / 1000)}k`;
  }
  return requests;
};
</script>

<template>
  <ul>
    <template v-if="metrics">
      <li>
        <span>{{ metrics.latency }} ms latency</span>
      </li>
      <li>
        <span>{{ metrics.uptime }} uptime</span>
      </li>
      <li>
        <span
          >{{ formatRequests(metrics.requests) }} requests
          <span v-if="metrics.errors"
            >. {{ metrics.errors.toFixed(2) }} % errors</span
          ></span
        >
      </li>
    </template>
    <li class="service-catalog-runtime-log__marker--disable" v-else>
      Not configured with runtime yet
    </li>
  </ul>
</template>
<style scoped>
li::marker {
  color: rgba(66, 215, 130, 1);
}

ul {
  font-size: 12px;
  color: rgba(60, 69, 87, 1);
  padding: 1.6rem;
}

.service-catalog-runtime-log__marker--disable::marker {
  color: rgba(182, 182, 189, 1);
}

.service-catalog-runtime-log__marker--disable {
  color: rgba(112, 120, 136, 1);
  font-weight: 600;
}
</style>
