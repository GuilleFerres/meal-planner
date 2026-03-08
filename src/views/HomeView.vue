<script setup lang="ts">
import MealCalendar from '@/components/calendar/CalendarComponent.vue';
import MealForm from '@/components/MealForm.vue';
</script>

<template>
  <main class="flex flex-col items-center min-h-screen bg-gray-100 py-24 px-32 gap-8">
    <MealForm />
    <MealCalendar />
  </main>
</template>
