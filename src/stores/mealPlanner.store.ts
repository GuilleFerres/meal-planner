import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

import dayjs from 'dayjs'
import type { MealEntry, FavoriteDishes, MealType } from '@/types/meal-plan.types'
import { mealPlannerService } from '@/services/mealPlanner.service.ts'

export const useMealPlannerStore = defineStore('mealPlanner', () => {
  const selectedDate = ref('')
  const currentMonth = ref(dayjs().startOf('month').format('YYYY-MM-DD'))
  const currentWeek = ref(dayjs().startOf('week').format('YYYY-MM-DD'))
  const meals = ref<MealEntry[]>([])
  const mealTypes: MealType[] = ['desayuno', 'almuerzo', 'cena', 'snack']
  const toastMessage = ref('')
  const toastTheme = ref<'success' | 'error' | 'info'>('success')
  const favoriteDishes = ref<FavoriteDishes>({
    dishes: [],
    totalCount: 0,
    lastUpdated: undefined
  })
  const selectedMeal = ref<MealEntry | null>(null)

  const mealsByDate = computed(() => {
    return (date: string) => meals.value.filter(meal => meal.date === date)
  })

  const init = () => {
    meals.value = mealPlannerService.loadMeals()
  }

  const setSelectedDate = (date: string) => {
    selectedDate.value = date
  }

  const setSelectedMeal = (meal: MealEntry | null) => {
    selectedMeal.value = meal
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

  const getFavoriteDishes = (): FavoriteDishes => {
    const favoriteMeals = meals.value.filter((meal): meal is MealEntry & { favorite: true } => meal.favorite === true)
    favoriteDishes.value = {
      dishes: favoriteMeals,
      totalCount: favoriteMeals.length,
      lastUpdated: dayjs().format('YYYY-MM-DD HH:mm:ss')
    }
    return favoriteDishes.value
  }

  const addFavoriteMeal = (meal: MealEntry) => {
    try {
      toastMessage.value = 'Comida agregada a favoritos exitosamente'
      toastTheme.value = 'success'
    } catch (error) {
      toastMessage.value = 'Error al agregar la comida a favoritos'
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

  const exportWeeklyPlan = () => {
    const startOfWeek = dayjs(currentWeek.value);
    let text = `Plan Semanal de Comidas - Semana del ${startOfWeek.format('DD/MM/YYYY')} al ${startOfWeek.add(6, 'day').format('DD/MM/YYYY')}\n\n`;

    for (let i = 0; i < 7; i++) {
      const day = startOfWeek.add(i, 'day');
      const dayStr = day.format('YYYY-MM-DD');
      const dayName = day.locale('es').format('dddd');
      text += `${dayName.charAt(0).toUpperCase() + dayName.slice(1)} (${day.format('DD/MM')}):\n`;

      const dayMeals = meals.value.filter(meal => meal.date === dayStr);
      const mealsByType = dayMeals.reduce((acc, meal) => {
        if (!acc[meal.type]) acc[meal.type] = [];
        acc[meal.type].push(meal);
        return acc;
      }, {} as Record<MealType, MealEntry[]>);

      mealTypes.forEach(type => {
        const mealsOfType = mealsByType[type] || [];
        text += `  ${type.charAt(0).toUpperCase() + type.slice(1)}: `;
        if (mealsOfType.length === 0) {
          text += 'No planificado\n';
        } else {
          mealsOfType.forEach(meal => {
            text += `${meal.name}`;
            if (meal.ingredients) text += ` (Ingredientes: ${meal.ingredients})`;
            if (meal.notes) text += ` - Notas: ${meal.notes}`;
            text += '\n';
          });
        }
      });
      text += '\n';
    }

    // Crear y descargar el archivo
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const element = document.createElement('a');
    element.href = url;
    element.download = `plan-semanal-${startOfWeek.format('YYYY-MM-DD')}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    URL.revokeObjectURL(url);
  };

  return {
    selectedDate,
    currentMonth,
    currentWeek,
    favoriteDishes,
    selectedMeal,
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
    setToast,
    getFavoriteDishes,
    setSelectedMeal,
    exportWeeklyPlan
  }
},
 {
  persist: {
    storage: sessionStorage,
    pick: ['meals', 'favoriteDishes'],
  },
})
