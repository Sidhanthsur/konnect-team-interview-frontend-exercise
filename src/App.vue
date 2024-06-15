<template>
  <header>
    <div class="nav-bar">
      <router-link to="/">
        <img
          alt="Kong logo"
          src="@/assets/logo.svg"
        >
      </router-link>
    </div>
  </header>
  <main>
    <router-view />
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App',
})
</script>

<style lang="scss" scoped>
.nav-bar {
  height: 70px;
  width: 100%;
  background: linear-gradient(90deg, #09224f 100%, #073382 100%);
  display: flex;
  align-items: center;
}
</style>

<style lang="scss">
// Unscoped styles for html and body
html {
  font-size: 10px;
  margin: 0;
  padding: 0;
}

body {
  font-family: "Inter", sans-serif;
  font-size: 1.6rem;
  font-weight: 400;
  line-height: 1.2;
  margin: 0 auto;
  background-color: #efefef;
}
</style>
