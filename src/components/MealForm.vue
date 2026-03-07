<script lang="ts" setup>
import { ref } from 'vue';
const mealName = ref('');
const mealDescription = ref('');
const handleMealSubmit = () => {
  console.log('Meal Name:', mealName.value);
  console.log('Meal Description:', mealDescription.value);
}
</script>

<template>
  <div class="w-2/3 mx-auto mt-10 py-6 px-20 bg-white rounded-lg shadow-md">
    <h1 class="text-2xl font-bold mb-8">Add New Meal</h1>
    <form class="space-y-4 flex flex-col gap-2" @submit.prevent="handleMealSubmit">
      <div class="flex flex-col">
        <label for="meal-name" class="block text-sm font-medium text-gray-700">Meal Name</label>
        <input
          type="text"
          id="meal-name"
          class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          required
          :v-model="mealName">
      </div>
      <div class="flex flex-col">
        <label for="meal-description" class="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          id="meal-description"
          rows="3"
          class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          :v-model="mealDescription">
        </textarea>
      </div>
      <button
        type="submit"
        class="w-2/6 self-end inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
        Add Meal
      </button>
    </form>
  </div>
</template>

<style lang="scss" scoped>

</style>
