<script setup lang="ts">
import { type Metrics } from '@/constants/serviceTypes'
defineProps<{ metrics: Metrics }>()

const formatRequests = (requests: number) => {
  if (requests > 1000000) {
    return `${Math.round(requests / 1000000)}m`
  } else if (requests > 1000) {
    return `${Math.round(requests / 1000)}k`
  }
  return requests
}
</script>

<template>
  <ul class="service-catalog-runtime-log__log">
    <template v-if="metrics">
      <li>
        <span class="service-catalog-runtime-log__log-value">{{ metrics.latency }}ms</span>
        latency
      </li>
      <li>
        <span class="service-catalog-runtime-log__log-value">{{ (metrics.uptime * 100).toFixed(2) }}%
        </span>
        uptime
      </li>
      <li>
        <span class="service-catalog-runtime-log__log-value">{{
          formatRequests(metrics.requests)
        }}</span>
        requests
        <span v-if="metrics.errors">·
          <span class="service-catalog-runtime-log__log-value">{{ metrics.errors.toFixed(2) }}%</span>
          errors
        </span>
      </li>
    </template>
    <li v-else>
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
  padding-left: 1.6rem;
}

.service-catalog-runtime-log__marker--disable::marker {
  color: rgba(182, 182, 189, 1);
}

.service-catalog-runtime-log__marker--disable {
  color: rgba(112, 120, 136, 1);
  font-weight: 600;
}

.service-catalog-runtime-log__log {
  font-size: 12px;
  font-weight: 600;
  color: rgba(112, 120, 136, 1);
}

.service-catalog-runtime-log__log-value {
  color: rgba(60, 69, 87, 1);
}
</style>
