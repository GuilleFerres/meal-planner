import type { MealEntry } from '@/types/meal-plan.types'

const STORAGE_KEY = 'meal-planner-meals'

export const mealPlannerService = {
  saveMeals(meals: MealEntry[]) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(meals))
  },

  loadMeals(): MealEntry[] {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []

    try {
      return JSON.parse(raw) as MealEntry[]
    } catch {
      return []
    }
  },
}
