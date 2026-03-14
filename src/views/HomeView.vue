<script setup lang="ts">
import MealCalendar from '@/components/calendar/CalendarComponent.vue'
import WeeklyCalendar from '@/components/calendar/WeeklyCalendar.vue'
import MealForm from '@/components/MealForm.vue'

</script>

<template>
  <main class="flex flex-col items-center min-h-screen bg-gray-100 md:py-18 py-6 md:px-12 px-2 gap-8">
    <section class="flex w-full gap-8 flex-wrap">
       <MealForm />
      <MealCalendar />
    </section>
    <WeeklyCalendar />
  </main>
</template>
