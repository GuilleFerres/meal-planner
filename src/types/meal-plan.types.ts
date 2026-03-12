export type MealType = 'desayuno' | 'almuerzo' | 'cena' | 'snack'
export interface MealEntry {
  id: string
  date: string
  type: MealType
  name: string
  ingredients?: string
  recipeId?: string
  notes?: string
  completed?: boolean,
  favorite?: boolean,
}

export interface FavoriteMealEntry extends MealEntry {
  favorite: true
}

export interface FavoriteDishes {
  dishes: FavoriteMealEntry[]
  totalCount: number
  lastUpdated?: string
}


