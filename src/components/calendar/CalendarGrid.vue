<script setup lang="ts">
import CalendarDayCell from './CalendarDayCell.vue'
import type { CalendarCell } from '@/types/calendar.types'
import type { MealEntry } from '@/types/meal-plan.types'

defineProps<{
  cells: CalendarCell[]
  getMealsByDate: (date: string) => MealEntry[]
}>()

const emit = defineEmits<{
  select: [date: string]
}>()
</script>

<template>
  <div class="calendar-grid bg-white rounded-lg shadow-md py-6 px-10">
    <CalendarDayCell
      v-for="cell in cells"
      :key="cell.date?.toString()"
      :cell="cell"
      :meals="getMealsByDate(cell.date || '')"
      @select="emit('select', $event)"
    />
  </div>
</template>

<style scoped>
.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 2rem;
}
</style>
