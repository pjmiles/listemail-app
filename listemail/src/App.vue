<script setup>
import { RouterLink, RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue'

</script>

<template>
  <header>
    <nav>
      <div>
        <NavBar />
      </div>

    </nav>
  </header>
  <RouterView />
</template>

<style scoped></style>
