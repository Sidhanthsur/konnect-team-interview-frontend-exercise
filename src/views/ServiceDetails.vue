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
    <router-link class="service-details__back" to="/">← Go Back</router-link>
    <div class="service-details__card">
      <h2 class="service-details__title">Versions ({{ versions.length }})</h2>
      <ul class="service-details__versions-list">
        <li
          v-for="version in versions"
          :key="version.id"
          class="service-details__version"
        >
          <div class="service-details__detail-name">v{{ version.name }}</div>
          <div class="service-details__detail-description">
            {{ version.description }}
          </div>
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

          <div
            class="service-details__developer"
            :class="{
              'service-details__developer--empty-img': !version.developer,
            }"
          >
            <img
              v-if="version.developer"
              :src="version.developer.avatar"
              :alt="version.developer.name"
              class="service-details__developer-avatar"
            />
            <div>
              <span
                v-if="version.developer"
                class="service-details__developer-name"
                >{{ version.developer.name }}</span
              >
              <!-- Show the updated relative from today like 2 days ago etc-->
              <div class="service-details__updated-at">
                {{ timeDifference(new Date(version.updated_at)) }}
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<style scoped>
.service-details {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 2rem 4rem;

  @media (max-width: 768px) {
    padding: 0;
    padding-top: 2rem;
  }
}

.service-details__card {
  background: #fff;
  border-radius: 0.8rem;
  padding: 2rem;
  box-shadow: 0 0.4rem 1.2rem rgba(0, 0, 0, 0.1);
  margin-top: 1.6rem;
}
.service-details__version {
  display: flex;
  border-bottom: 1px solid #f1f1f5;
  padding-bottom: 1.2rem;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    div {
      margin-bottom: 1rem;
    }
  }
}

.service-details__developer {
  display: flex;
  margin-left: 20rem;

  @media (max-width: 1024px) {
    margin-left: 15rem;
  }

  @media (max-width: 768px) {
    margin-left: 0;
  }
}

.service-details__version:last-child {
  border-bottom: none;
}

.service-details__back {
  font-size: 1.6rem;
  color: #1155cb;
  margin-bottom: 1rem;
  text-decoration: none;
  font-weight: 600;
}

.service-details__versions-list {
  padding: 0;
  max-width: 80rem;
}

.service-details__http-tag {
  background: #f8f8fa;
  font-size: 1rem;
  font-weight: 500;
  color: #1155cb;
  padding: 0.5rem;
  border-radius: 0.4rem;
}

.service-details__developer--empty-img {
  align-items: center;
}

.service-details__developer-avatar {
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  margin-left: 0.5rem;
  margin-right: 1rem;
}

.service-details__detail-name {
  font-size: 1.3rem;
  font-weight: 600;
  color: #262626;
  width: 6rem;
}

.service-details__detail-description {
  width: 24rem;
  color: #8a8a8a;
  font-size: 1.2rem;
  font-weight: 400;
  margin-right: 3rem;
}

.service-details__developer-name {
  font-weight: 600;
  font-size: 1.3rem;
  color: #3c4557;
}

.service-details__updated-at {
  color: #8a8a8a;
  font-size: 1.2rem;
  font-weight: 400;
}
</style>
