import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

import dayjs from 'dayjs'
import type { MealEntry } from '@/types/meal-plan.types'
import { mealPlannerService } from '@/services/mealPlanner.service.ts'

export const useMealPlannerStore = defineStore('mealPlanner', () => {
  const selectedDate = ref(dayjs().format('YYYY-MM-DD'))
  const currentMonth = ref(dayjs().startOf('month').format('YYYY-MM-DD'))
  const meals = ref<MealEntry[]>([])
  const mealTypes = ['desayuno', 'almuerzo', 'cena', 'snack']

  const mealsByDate = computed(() => {
    return (date: string) => meals.value.filter(meal => meal.date === date)
  })

  const init = () => {
    meals.value = mealPlannerService.loadMeals()
  }

  const setSelectedDate = (date: string) => {
    debugger;
    selectedDate.value = date
  }

  const setCurrentMonth = (date: string) => {
    currentMonth.value = dayjs(date).startOf('month').format('YYYY-MM-DD')
  }

  const goToPreviousMonth = () => {
    currentMonth.value = dayjs(currentMonth.value).subtract(1, 'month').format('YYYY-MM-DD')
  }

  const goToNextMonth = () => {
    currentMonth.value = dayjs(currentMonth.value).add(1, 'month').format('YYYY-MM-DD')
  }

  const addMeal = (meal: MealEntry) => {
    meals.value.push(meal)
    mealPlannerService.saveMeals(meals.value)
  }

  const updateMeal = (updatedMeal: MealEntry) => {
    const index = meals.value.findIndex(meal => meal.id === updatedMeal.id)

    if (index !== -1) {
      meals.value[index] = updatedMeal
      mealPlannerService.saveMeals(meals.value)
    }
  }

  const deleteMeal = (mealId: string) => {
    meals.value = meals.value.filter(meal => meal.id !== mealId)
    mealPlannerService.saveMeals(meals.value)
  }

  return {
    selectedDate,
    currentMonth,
    meals,
    mealsByDate,
    init,
    setSelectedDate,
    setCurrentMonth,
    goToPreviousMonth,
    goToNextMonth,
    addMeal,
    updateMeal,
    deleteMeal,
    mealTypes
  }
})
