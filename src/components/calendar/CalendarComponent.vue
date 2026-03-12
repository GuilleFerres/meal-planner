<script setup lang="ts">
import { useMealPlannerStore } from '@/stores/mealPlanner.store'
import { useCalendar } from '@/composables/useCalendar'
import CalendarHeader from './CalendarHeader.vue'
import CalendarGrid from './CalendarGrid.vue'


const store = useMealPlannerStore()
const { monthLabel, calendarCells } = useCalendar()
</script>

<template>
  <section>
    <CalendarHeader
      :title="monthLabel"
      @previous="store.goToPreviousMonth"
      @next="store.goToNextMonth"
    />

    <CalendarGrid
      :cells="calendarCells"
      :get-meals-by-date="store.mealsByDate"
      :is-weekly="false"
    />

  </section>
</template>
