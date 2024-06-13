<script setup lang="ts">
import { useServiceDetailsStore } from "@/stores/serviceDetails";
import { onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
const serviceDetailsStore = useServiceDetailsStore();
const router = useRouter();
const versions = serviceDetailsStore.versions;

onMounted(() => {
  if (!serviceDetailsStore.versions.length) {
    router.push({ name: "home" });
  }
});

function timeDifference(previous: Date) {
  let current = +new Date();
  let msPerMinute = 60 * 1000;
  let msPerHour = msPerMinute * 60;
  let msPerDay = msPerHour * 24;
  let msPerMonth = msPerDay * 30;
  let msPerYear = msPerDay * 365;

  let elapsed = current - +previous;

  if (elapsed < msPerMinute) {
    let value = Math.round(elapsed / 1000);
    return value + ` ${value > 1 ? "seconds" : "second"} ago`;
  } else if (elapsed < msPerHour) {
    let value = Math.round(elapsed / msPerMinute);
    return value + ` ${value > 1 ? "minutes" : "minute"} ago`;
  } else if (elapsed < msPerDay) {
    let value = Math.round(elapsed / msPerHour);
    return value + ` ${value > 1 ? "hours" : "hour"} ago`;
  } else if (elapsed < msPerMonth) {
    let value = Math.round(elapsed / msPerDay);
    return value + ` ${value > 1 ? "days" : "day"} ago`;
  } else if (elapsed < msPerYear) {
    let value = Math.round(elapsed / msPerMonth);
    return value + ` ${value > 1 ? "months" : "month"} ago`;
  } else {
    let value = Math.round(elapsed / msPerYear);
    return value + ` ${value > 1 ? "years" : "year"} ago`;
  }
}

onUnmounted(() => {
  serviceDetailsStore.resetVersions();
});
</script>
<template>
  <div class="service-details">
    <h2 class="service-details__title">Versions ({{ versions.length }})</h2>
    <div class="service-details__versions">
      <h3 class="service-details__versions-title">Versions</h3>
      <ul class="service-details__versions-list">
        <li
          v-for="version in versions"
          :key="version.id"
          class="service-details__version"
        >
          <div>v{{ version.name }}</div>
          <div>{{ version.description }}</div>
          <div>
            <span class="service-details__http-tag">HTTP</span>
            <span
              :style="{
                background: '#BDD3F9',
                marginLeft: '0.5rem',
              }"
              class="service-details__http-tag"
              >REST</span
            >
          </div>

          <div v-if="version.developer" class="service-details__developer">
            <img
              :src="version.developer.avatar"
              :alt="version.developer.name"
              class="service-details__developer-avatar"
            />
            <div>
              <span>{{ version.developer.name }}</span>
              <!-- Show the updated relative from today like 2 days ago etc-->
              <div>{{ timeDifference(new Date(version.updated_at)) }}</div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<style scoped>
.service-details__version {
  display: flex;
}

.service-details__http-tag {
  background: #f8f8fa;
  font-size: 1rem;
  font-weight: 500;
  color: #1155cb;
  padding: 0.5rem;
  border-radius: 0.4rem;
}

.service-details__developer {
  display: flex;
}

.service-details__developer-avatar {
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  margin-left: 0.5rem;
}
</style>
