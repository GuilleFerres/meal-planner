export type MealType = 'desayuno' | 'almuerzo' | 'cena' | 'snack'
export interface MealEntry {
  id: string
  date: string
  type: MealType
  name: string
  ingredients?: string
  recipeId?: string
  notes?: string
  completed?: boolean
}

export interface MealDay {
  date: string
  meals: MealEntry[]
}

export interface MealPlan {
  id: string
  name: string
  startDate: string
  endDate: string
  days: MealDay[]
}
