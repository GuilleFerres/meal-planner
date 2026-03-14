<script lang="ts" setup>
import { computed, ref } from 'vue';
import { useMealPlannerStore } from '@/stores/mealPlanner.store';
import { capitalizeFirstLetter } from '@/utils/capitalize.utils';
import ModalComponent from '@/components/ui/ModalComponent.vue';
import MealForm from '@/components/MealForm.vue';

const mealStore = useMealPlannerStore();
const openForm = ref(false);

const mealsFromSelectDate = computed(() => mealStore.mealsByDate(mealStore.selectedDate));

const emit = defineEmits<{
  close: []
}>()
const closeModal = () => {
  emit('close');
};
</script>

<template>
  <ModalComponent :modalTitle="'Comidas del día:'" @close="closeModal">
    <template #content>
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
      </div>
      <button class="add-meal-button" @click="openForm = true">
        Agregar Comida
      </button>
    </template>
  </ModalComponent>
  <ModalComponent v-if="openForm" :modalTitle="'Agregar Comida'" @close="openForm = false" max-width="90%">
    <template #content>
      <MealForm @close="openForm = false" />
    </template>
  </ModalComponent>
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
