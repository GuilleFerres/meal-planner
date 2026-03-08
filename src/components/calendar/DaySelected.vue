<script lang="ts" setup>
import { computed } from 'vue';
import { useMealPlannerStore } from '@/stores/mealPlanner.store';
import { capitalizeFirstLetter } from '@/utils/capitalize.utils';

const mealStore = useMealPlannerStore();
const mealsFromSelectDate = computed(() => mealStore.mealsByDate(mealStore.selectedDate));
const emit = defineEmits<{
  close: []
}>()
const closeModal = () => {
  emit('close');
};
</script>

<template>
  <div class="overlay" @click="closeModal">
    <div class="meals-day-container" @click.stop>
      <button class="close-button" @click="closeModal">×</button>
      <h3>Comidas del día:</h3>
      <div v-if="mealsFromSelectDate.length > 0">
        <div v-for="meal in mealsFromSelectDate" :key="meal.id">
          <h4>{{ capitalizeFirstLetter(meal.type) }}:</h4>
          <p>
            <span class="section-title">Nombre: </span>
            {{ meal.name }}</p>
          <p>
            <span class="section-title">Ingredientes: </span>
            {{ meal.ingredients }}
          </p>
          <p>
            <span v-if="meal.notes" class="section-title">Notas: </span>
            {{ meal.notes }}
          </p>
        </div>
      </div>
      <div v-else>
        <p>No hay comidas planificadas para este día.</p>
        <button class="add-meal-button" @click="closeModal">
          Agregar Comida
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
}

.meals-day-container {
  padding: 1rem;
  background-color: #f9f9f9;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 90%;
  position: relative;
}

.close-button {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
}

h3 {
  font-size: 1.5rem;
  font-weight: 900;
  margin-bottom: 0.5rem;
}
h4 {
  font-size: 1.25rem;
  font-weight: 600;
  margin-top: 1rem;
  margin-bottom: 0.25rem;
}
p {
  margin: 0.25rem 0;
}
.section-title {
  font-weight: 600;
}
</style>
