<script setup lang="ts">
import { ref, watch } from 'vue'
import CalendarDayCell from './CalendarDayCell.vue'
import type { CalendarCell } from '@/types/calendar.types'
import type { MealEntry } from '@/types/meal-plan.types'
import { useMealPlannerStore } from '@/stores/mealPlanner.store'
import DaySelected from './DaySelected.vue'

const store = useMealPlannerStore()

defineProps<{
  cells: CalendarCell[]
  getMealsByDate: (date: string) => MealEntry[]
  isWeekly?: boolean
}>()

const showModal = ref(false)

const emit = defineEmits<{
  select: [date: string]
}>()

const closeModal = () => {
  showModal.value = false
}

const deleteMeal = ({ mealId }: { mealId: string }) => {
  if(!mealId) return;
  store.deleteMeal(mealId)

}

watch(() => store.selectedDate, (newDate) => {
  showModal.value = !!newDate
})
</script>

<template>
  <div class="relative">
    <div class="calendar-grid bg-white rounded-lg shadow-md py-6 px-10"
      :class="{
        'gap-4': !isWeekly,
        'gap-0': isWeekly,
        'is-weekly': isWeekly
      }">
      <CalendarDayCell
        v-for="cell in cells"
        :key="cell.date?.toString()"
        :cell="cell"
        :meals="getMealsByDate(cell.date || '')"
        :is-weekly="isWeekly"
        @select="emit('select', $event)"
        @delete="deleteMeal($event)"
      />
    </div>
    <DaySelected v-if="showModal" @close="closeModal()" />
  </div>
</template>

<style scoped>
.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
 &.is-weekly {
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>
