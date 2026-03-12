<script setup lang="ts">
import { computed } from 'vue'
import type { CalendarCell } from '@/types/calendar.types'
import type { MealEntry } from '@/types/meal-plan.types'
import { capitalizeFirstLetter } from '@/utils/capitalize.utils'

const props = defineProps<{
  cell: CalendarCell
  meals: MealEntry[],
  isWeekly?: boolean
}>()

const emit = defineEmits<{
  select: [date: string],
  selectMeal: [meal: MealEntry | null],
  delete: [{ mealId: string }]
}>()

const mealTypeOrder = ['desayuno', 'snack', 'almuerzo', 'cena']

const sortedMeals = computed(() => {
  return [...props.meals].sort((a, b) => {
    const indexA = mealTypeOrder.indexOf(a.type.toLowerCase())
    const indexB = mealTypeOrder.indexOf(b.type.toLowerCase())
    return (indexA === -1 ? mealTypeOrder.length : indexA) - (indexB === -1 ? mealTypeOrder.length : indexB)
  })
})

const viewDetails = (meal: MealEntry) => {
  props.isWeekly ?
    emit('selectMeal', meal) :
    emit('select', props.cell.date || '')

}

const deleteDish = (meal: MealEntry) => {
  emit('delete', { mealId: meal.id })
}

const openDayDetailsModal = () => {
  if (!props.isWeekly || props.meals.length === 0 ) {
    emit('select', props.cell.date || '')
  }
}
</script>

<template>
  <button
    class="calendar-day-cell"
    :class="{
      'is-outside': !cell.isCurrentMonth,
      'is-today': cell.isToday,
      'is-selected': cell.isSelected,
      'is-weekly': isWeekly
    }"
    @click="openDayDetailsModal()"
  >
    <span>{{ cell.dayNumber }}</span>
    <span v-if="meals.length && isWeekly" class="has-meal">
      <ul>
        <li v-for="meal of sortedMeals" :key="meal.id">
          <span class="text-sm">
            <i class="type">
              {{capitalizeFirstLetter(meal.type)}}
            </i>
          </span>
          <span>
            {{ meal.name }}
          </span>
          <span class="ml-4 actions">
            <i
              class="fa-regular fa-eye icon-eye"
              @click="viewDetails(meal)">
            </i>
            <i
              class="fa-regular fa-trash-can icon-trash"
              @click="deleteDish(meal)">
            </i>
          </span>
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
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
  }

  .calendar-day-cell.is-weekly {
    padding: 1rem;
    align-items: flex-start;
    overflow-y: auto;
    &:not(.is-today) {
      cursor: pointer;
    }
  }

  .calendar-day-cell:hover:not(.is-weekly):not(.is-today) {
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
     cursor: pointer;
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
    list-style: none;
    font-size: 0.85rem;
    margin-top: 1rem;
  }

  .calendar-day-cell.is-weekly li {
    padding: 1rem 0;
    border-top: 1px solid #eee;
    text-align: start;
    display: flex;
    justify-content: space-between;
    position: relative; /* allow absolute children */
  }

  .calendar-day-cell.is-weekly li .actions {
    opacity: 0;
    transition: opacity 0.2s ease;
  }

  .calendar-day-cell.is-weekly li:hover .actions {
    opacity: 1;
  }

  .calendar-day-cell:not(.is-weekly) .has-meal {
    display: inline-block;
    width: 8px;
    height: 8px;
    background-color: #eeea0e;
    border-radius: 50%;
  }
  .type {
    font-weight: 900;
    margin-right: 0.75rem;
  }

  .icon-eye, .icon-trash {
    font-size: 1rem;
    cursor: pointer;
  }

  .icon-trash {
    margin-left: 0.5rem;
    color: white;
  }
</style>
