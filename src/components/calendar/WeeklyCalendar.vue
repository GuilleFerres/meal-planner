<script setup lang="ts">
import { useMealPlannerStore } from '@/stores/mealPlanner.store'
import { useWeeklyCalendar } from '@/composables/useWeeklyCalendar'
import CalendarHeader from './CalendarHeader.vue'
import CalendarGrid from './CalendarGrid.vue'

const store = useMealPlannerStore()
const { weekLabel, weekCells } = useWeeklyCalendar()
</script>

<template>
  <section class="w-full">
    <CalendarHeader
      :title="weekLabel"
      @previous="store.goToPreviousWeek"
      @next="store.goToNextWeek"
    />

    <CalendarGrid
      :cells="weekCells"
      :get-meals-by-date="store.mealsByDate"
      :is-weekly="true"
      @select="store.setSelectedDate"
    />
  </section>
</template>
