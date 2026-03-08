<script setup lang="ts">
import type { CalendarCell } from '@/types/calendar.types'
import type { MealEntry } from '@/types/meal-plan.types'

const props = defineProps<{
  cell: CalendarCell
  meals: MealEntry[]
}>()

const { cell, meals } = props

const emit = defineEmits<{
  select: [date: string]
}>()
</script>

<template>
  <button
    class="calendar-day-cell"
    :class="{
      'is-outside': !cell.isCurrentMonth,
      'is-today': cell.isToday,
      'is-selected': cell.isSelected,
    }"
    @click="emit('select', cell.date || '')"
  >
    <span>{{ cell.dayNumber }}</span>

    <ul v-if="meals.length">
      <li v-for="meal in meals.slice(0, 3)" :key="meal.id">
        {{ meal.type }} - {{ meal.name }}
      </li>
    </ul>
  </button>
</template>
<style scoped lang="scss">
  .calendar-day-cell {
    padding: 0.5rem;
    aspect-ratio: 1/1;
    cursor: pointer;
  }

  .calendar-day-cell:hover {
    background-color: #e9e9e9;
  }

  .is-outside {
    background-color: #f0f0f0;
    color: #ccc;
  }

  .is-today {
    background-color: #007bff;
    color: white;
    border-radius: 50%;
  }

  .is-selected {
    background-color: tomato;
    color: white;
  }
</style>
