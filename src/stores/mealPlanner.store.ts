import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

import dayjs from 'dayjs'
import type { MealEntry } from '@/types/meal-plan.types'
import { mealPlannerService } from '@/services/mealPlanner.service.ts'

export const useMealPlannerStore = defineStore('mealPlanner', () => {
  const selectedDate = ref('')
  const currentMonth = ref(dayjs().startOf('month').format('YYYY-MM-DD'))
  const currentWeek = ref(dayjs().startOf('week').format('YYYY-MM-DD'))
  const meals = ref<MealEntry[]>([])
  const mealTypes = ['desayuno', 'almuerzo', 'cena', 'snack']
  const toastMessage = ref('')
  const toastTheme = ref<'success' | 'error' | 'info'>('success')

  const mealsByDate = computed(() => {
    return (date: string) => meals.value.filter(meal => meal.date === date)
  })

  const init = () => {
    meals.value = mealPlannerService.loadMeals()
  }

  const setSelectedDate = (date: string) => {
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

  const goToPreviousWeek = () => {
    currentWeek.value = dayjs(currentWeek.value).subtract(1, 'week').format('YYYY-MM-DD')
  }

  const goToNextWeek = () => {
    currentWeek.value = dayjs(currentWeek.value).add(1, 'week').format('YYYY-MM-DD')
  }

  const addMeal = (meal: MealEntry) => {
    try {
      toastMessage.value = 'Comida agregada exitosamente'
      toastTheme.value = 'success'
    } catch (error) {
      toastMessage.value = 'Error al agregar la comida'
      toastTheme.value = 'error'
    }
    meals.value.push(meal)
    mealPlannerService.saveMeals(meals.value)
  }

  const setToast = (message: string, theme: 'success' | 'error' | 'info') => {
    toastMessage.value = message
    toastTheme.value = theme
  }

  const cleanToast = () => {
    toastMessage.value = ''
    toastTheme.value = 'success'
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
    currentWeek,
    meals,
    mealsByDate,
    init,
    setSelectedDate,
    setCurrentMonth,
    goToPreviousMonth,
    goToNextMonth,
    goToPreviousWeek,
    goToNextWeek,
    addMeal,
    updateMeal,
    deleteMeal,
    mealTypes,
    toastMessage,
    toastTheme,
    cleanToast,
    setToast
  }
})
