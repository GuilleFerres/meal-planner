<script setup lang="ts">
import { useMealPlannerStore } from '@/stores/mealPlanner.store'
import { useWeeklyCalendar } from '@/composables/useWeeklyCalendar'
import CalendarHeader from './CalendarHeader.vue'
import CalendarGrid from './CalendarGrid.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faArrowAltCircleDown } from '@fortawesome/free-regular-svg-icons'

library.add(faArrowAltCircleDown)
const store = useMealPlannerStore()
const { weekLabel, weekCells } = useWeeklyCalendar()

</script>

<template>
  <section class="w-full">
    <button @click="store.exportWeeklyPlan" class="flex gap-2 items-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-8 mt-8">
      <span>
        Exportar Plan Semanal
      </span>
      <FontAwesomeIcon :icon="['far', 'arrow-alt-circle-down']" class="text-lg" />
    </button>
    <CalendarHeader
      :title="weekLabel"
      @previous="store.goToPreviousWeek"
      @next="store.goToNextWeek"
    />

    <CalendarGrid
      :cells="weekCells"
      :get-meals-by-date="store.mealsByDate"
      :is-weekly="true"
    />
  </section>
</template>
