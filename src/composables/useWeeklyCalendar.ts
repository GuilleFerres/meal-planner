import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useMealPlannerStore } from '@/stores/mealPlanner.store'
import { getWeekGrid, getWeekLabel } from '@/utils/calendar.utils'

export function useWeeklyCalendar() {
  const store = useMealPlannerStore()
  const { currentWeek, selectedDate } = storeToRefs(store)

  const weekLabel = computed(() => getWeekLabel(currentWeek.value))

  const weekCells = computed(() =>
    getWeekGrid(currentWeek.value, selectedDate.value),
  )

  return {
    weekLabel,
    weekCells,
    selectedDate,
    setSelectedDate: store.setSelectedDate,
    goToPreviousWeek: store.goToPreviousWeek,
    goToNextWeek: store.goToNextWeek,
  }
}
