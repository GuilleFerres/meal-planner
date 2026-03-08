export interface CalendarCell {
  date: string | null
  dayNumber: number | null
  isCurrentMonth: boolean
  isToday: boolean
  isSelected: boolean
}
