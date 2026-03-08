import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useMealPlannerStore } from '@/stores/mealPlanner.store'
import { getMonthGrid, getMonthLabel } from '@/utils/calendar.utils'

export function useCalendar() {
  const store = useMealPlannerStore()
  const { currentMonth, selectedDate } = storeToRefs(store)

  const monthLabel = computed(() => getMonthLabel(currentMonth.value))

  const calendarCells = computed(() =>
    getMonthGrid(currentMonth.value, selectedDate.value),
  )

  return {
    monthLabel,
    calendarCells,
    selectedDate,
    setSelectedDate: store.setSelectedDate,
    goToPreviousMonth: store.goToPreviousMonth,
    goToNextMonth: store.goToNextMonth,
  }
}
