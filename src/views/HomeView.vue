<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import MealCalendar from '@/components/calendar/CalendarComponent.vue'
import WeeklyCalendar from '@/components/calendar/WeeklyCalendar.vue'
import MealForm from '@/components/MealForm.vue'

const route = useRoute()
const isWeekly = computed(() => route.query.weekly === 'true')
</script>

<template>
  <main class="flex flex-col items-center min-h-screen bg-gray-100 py-24 px-32 gap-8">
    <MealForm />
    <MealCalendar v-if="!isWeekly" />
    <WeeklyCalendar v-else />
  </main>
</template>
