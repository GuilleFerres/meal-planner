<script setup lang="ts">
import { ref, watch } from 'vue'
import CalendarDayCell from './CalendarDayCell.vue'
import type { CalendarCell } from '@/types/calendar.types'
import type { MealEntry } from '@/types/meal-plan.types'
import { useMealPlannerStore } from '@/stores/mealPlanner.store'
import DaySelected from './DaySelected.vue'
import MealDetailModal from '@/components/meal/MealDetailModal.vue'

const store = useMealPlannerStore()

defineProps<{
  cells: CalendarCell[]
  getMealsByDate: (date: string) => MealEntry[]
  isWeekly?: boolean
}>()

const showModal = ref(false)

// const emit = defineEmits<{
//   select: [date: string]
// }>()

const closeModal = () => {
  showModal.value = false
}

const deleteMeal = ({ mealId }: { mealId: string }) => {
  if(!mealId) return;
  store.deleteMeal(mealId)

}

const selectedMeal = (meal: MealEntry | null) => {
  // When selecting a specific meal, only show the meal detail modal.
  // Closing any open day modal by clearing the selected date.
  store.setSelectedDate('')
  store.setSelectedMeal(meal)
}

const dayInitials = ['L', 'M', 'X', 'J', 'V', 'S', 'D']

watch(() => store.selectedDate, (newDate) => {
  showModal.value = !!newDate
})
</script>

<template>
  <div class="relative">
    <div v-if="!isWeekly" class="day-headers px-10">
      <div v-for="day in dayInitials" :key="day" class="day-header">{{ day }}</div>
    </div>
    <div class="calendar-grid bg-white rounded-lg shadow-md py-6 md:px-10 px-2"
      :class="{
        'md:gap-4 gap-0': !isWeekly,
        'gap-0': isWeekly,
        'is-weekly': isWeekly
      }">
      <CalendarDayCell
        v-for="cell in cells"
        :key="cell.date?.toString()"
        :cell="cell"
        :meals="getMealsByDate(cell.date || '')"
        :is-weekly="isWeekly"
        @select="store.setSelectedDate"
        @select-meal="selectedMeal($event)"
        @delete="deleteMeal($event)"
      />
    </div>
    <DaySelected v-if="showModal" @close="closeModal()" />
    <MealDetailModal v-if="store.selectedMeal" @close="selectedMeal(null)" />
  </div>
</template>

<style scoped>
.day-headers {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
  margin-bottom: 1rem;
  font-weight: bold;
  text-align: center;
}

.day-header {
  padding: 0.5rem;
}

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
 &.is-weekly {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media (max-width: 1024px) {
  /* .calendar-grid {
    grid-template-columns: repeat(4, 1fr);
  } */
  .calendar-grid.is-weekly {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  /* .calendar-grid {
    grid-template-columns: repeat(2, 1fr);
  } */
  .calendar-grid.is-weekly {
    grid-template-columns: 1fr;
  }
}

/* @media (max-width: 480px) {
  .calendar-grid {
    grid-template-columns: 1fr;
  }
} */
.calendar-grid.is-weekly {
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
}
</style>
