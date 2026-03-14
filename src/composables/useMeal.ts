import { useMealPlannerStore } from '@/stores/mealPlanner.store'
import type { MealEntry, MealType } from '@/types/meal-plan.types'

export function useMeal() {
 const mealStore = useMealPlannerStore()

 const addMeal = (meal: MealEntry) => {
    try {
      validateMealEntry(meal)
      mealStore.addMeal(meal)
      mealStore.setToast('Comida agregada exitosamente', 'success')
    } catch (error) {
      mealStore.setToast('Error al agregar la comida', 'error')
    }

  }

  const validateMealEntry = (meal: MealEntry) => {
    const typeExists = mealStore.mealsByDate(meal.date).findIndex((m) => m.type === meal.type)

    if(typeExists !== -1) {
      throw new Error('Tipo de comida no válido')
    }

    if (!meal.name || meal.name.trim() === '') {
      throw new Error('El nombre de la comida es obligatorio')
    }
    if (!meal.date) {
      throw new Error('La fecha de la comida es obligatoria')
    }
    if (!meal.type) {
      throw new Error('El tipo de comida es obligatorio')
    }
  }

  const getAvailableMealTypes = (date: string): MealType[] => {
    const usedTypes = mealStore.mealsByDate(date).map(meal => meal.type)
    return mealStore.mealTypes.filter(type => !usedTypes.includes(type))
  }


  return {
    addMeal,
    validateMealEntry,
    getAvailableMealTypes
  }
}
