<script setup lang="ts">
import type { CalendarCell } from '@/types/calendar.types'
import type { MealEntry } from '@/types/meal-plan.types'
import { capitalizeFirstLetter } from '@/utils/capitalize.utils'

defineProps<{
  cell: CalendarCell
  meals: MealEntry[],
  isWeekly?: boolean
}>()


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
      'is-weekly': isWeekly,
      'border-radius': !isWeekly
    }"
    @click="emit('select', cell.date || '')"
  >
    <span>{{ cell.dayNumber }}</span>
    <span v-if="meals.length && isWeekly" class="has-meal">
      <ul v-for="meal of meals" :key="meal.id">
        <li>
          <span class="text-sm font-bold">
            {{capitalizeFirstLetter(meal.type)}}:
          </span>
          {{ meal.name }}
        </li>
      </ul>
    </span>
    <span v-if="meals.length && !isWeekly" class="has-meal"></span>
  </button>
</template>
<style scoped lang="scss">
  .calendar-day-cell {
    padding: 0.5rem;
    aspect-ratio: 1/1;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
  }

  .calendar-day-cell.is-weekly {
    aspect-ratio: auto;
    min-height: 180px;
    padding: 1rem;
    align-items: flex-start;
    overflow-y: auto;
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
  }
  .calendar-day-cell:not(.is-weekly).is-today {
    border-radius: 50%;
  }

  .is-selected {
    background-color: tomato;
    color: white;
  }

  .has-meal {
    display: inline-block;
    width: 100%;
  }

  .calendar-day-cell.is-weekly .has-meal {
    width: 100%;
    margin-top: 0.5rem;
    padding: 0;
  }

  .calendar-day-cell.is-weekly ul {
    width: 100%;
    margin: 0;
    list-style: none;
    font-size: 0.85rem;
  }

  .calendar-day-cell.is-weekly li {
    margin: 0.25rem 0;
    word-break: break-word;
  }

  .calendar-day-cell:not(.is-weekly) .has-meal {
    display: inline-block;
    width: 8px;
    height: 8px;
    background-color: #eeea0e;
    border-radius: 50%;
  }
</style>
