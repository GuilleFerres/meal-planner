<script lang="ts" setup>
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useMealPlannerStore } from '../stores/mealPlanner.store'
import MealCard from '@/components/meal/MealCard.vue'

const mealPlannerStore = useMealPlannerStore()
const { favoriteDishes } = storeToRefs(mealPlannerStore)

onMounted(() => {
  mealPlannerStore.getFavoriteDishes()
})
</script>

<template>
  <div class="favorite-dishes-view md:p-20 px-6 py-12">
    <div class="m-auto w-fit px-8 flex flex-col gap-6">
      <h1 class="font-bold text-4xl">Platos favoritos:</h1>
      <ul v-if="favoriteDishes?.dishes.length > 0" class="flex gap-4">
        <li v-for="meal of favoriteDishes.dishes" :key="meal.id" class="flex flex-col gap-2">
          <MealCard :meal="meal" />
        </li>
      </ul>
      <p v-else class="text-gray-500 text-lg">No tienes platos favoritos aún. ¡Agrega algunos para verlos aquí!</p>
    </div>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
