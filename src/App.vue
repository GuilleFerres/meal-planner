<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/" class="menu-item">Inicio</RouterLink>
        <RouterLink to="/platos-favoritos" class="menu-item">Platos favoritos</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped lang="scss">
.wrapper {
  nav {
    width: 100%;
    position: sticky;
    top: 0;
    margin: 0 auto;
    padding: 1rem 5rem;
    display: flex;
    gap: 2rem;
    background-color: #007BFF;
    .menu-item {
      text-decoration: none;
      color: white;
      font-weight: 500;
      transition: color 0.3s;

      &:hover {
        color: #FFD700;
      }
    }
  }
}

</style>
