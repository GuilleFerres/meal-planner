<script lang="ts" setup>
import { ref } from 'vue';
import dayjs from 'dayjs';
import type { MealEntry, MealType } from '@/types/meal-plan.types';
import { mealPlannerService } from '@/services/mealPlanner.service';
import { useMealPlannerStore } from '@/stores/mealPlanner.store';

const mealName = ref<string>('');
const mealIngredients = ref<string>('');
const mealType = ref<MealType>('almuerzo' as MealType);
const mealDate = ref<string>(dayjs().format('YYYY-MM-DD'));
const mealNotes = ref<string>('');
const mealStore = useMealPlannerStore();

const { mealTypes } = mealStore;

const handleMealSubmit = () => {
  const newMeal: MealEntry = {
    id: Date.now().toString(),
    name: mealName.value,
    ingredients: mealIngredients.value,
    type: mealType.value,
    date: mealDate.value
  };
  mealPlannerService.saveMeals([newMeal]);
  mealStore.addMeal(newMeal);
}
</script>

<template>
  <div class="w-2/3 mx-auto mt-10 py-6 px-20 bg-white rounded-lg shadow-md">
    <h1 class="text-2xl font-bold mb-6">Añadir comida</h1>
    <form class="flex flex-col gap-3" @submit.prevent="handleMealSubmit">
      <div class="flex flex-col">
        <label for="meal-name" class="block text-sm font-medium text-gray-700">Nombre</label>
        <input
          type="text"
          id="meal-name"
          required
          v-model="mealName">
      </div>
      <div>
        <label for="meal-type" class="block text-sm font-medium text-gray-700">Tipo de comida</label>
        <select
          id="meal-type"
          v-model="mealType">
          <option v-for="type in mealTypes" :key="type" :value="type">
            {{ type }}
          </option>
        </select>
      </div>
      <div>
        <label for="meal-date" class="block text-sm font-medium text-gray-700">Fecha</label>
        <input
          type="date"
          id="meal-date"
          v-model="mealDate">
      </div>
      <div class="flex flex-col">
        <label for="meal-ingredients" class="block text-sm font-medium text-gray-700">Ingredientes</label>
        <textarea
          id="meal-ingredients"
          rows="3"
          v-model="mealIngredients">
        </textarea>
      </div>
      <div>
        <label for="notes">
          <span class="block text-sm font-medium text-gray-700">Notas</span>
          <span class="text-xs text-gray-500"> (opcional)</span>
          <textarea
            id="notes"
            rows="3"
            v-model="mealNotes">
          </textarea>
        </label>
      </div>
      <button
        type="submit"
        class="w-2/6 self-end inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
        Añadir comida
      </button>
    </form>
  </div>
</template>

<style lang="scss" scoped>
input, select, textarea {
  margin-top: 0.25rem;
  display: block;
  width: 100%;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  padding: 0.5rem;
}

input:focus, select:focus, textarea:focus {
  border-color: #3b82f6;
  outline: 2px solid transparent;
  outline-offset: 2px;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}
</style>
