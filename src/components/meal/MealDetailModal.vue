<script lang="ts" setup>
import { computed } from 'vue'
import ModalComponent from '@/components/ui/ModalComponent.vue';
import { useMealPlannerStore } from '@/stores/mealPlanner.store';
import MealCard from '@/components/meal/MealCard.vue';

const mealStore = useMealPlannerStore();
const selectedMeal = computed(() => mealStore.selectedMeal);
</script>

<template>
  <div class="meal-detail-modal">
    <ModalComponent :modalTitle="'Detalles de la comida:'" @close="$emit('close')">
      <template #content>
        <div v-if="selectedMeal" class="meal-detail-content">
          <MealCard :meal="selectedMeal" />
        </div>
        <p v-else class="text-gray-500 text-lg">No se ha seleccionado ninguna comida.</p>
       </template>
    </ModalComponent>
  </div>
</template>

<style lang="scss" scoped>

</style>
