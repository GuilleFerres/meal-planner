import dayjs from 'dayjs'
import 'dayjs/locale/es'
import type { CalendarCell } from '../types/calendar.types'

export function formatDate(date: Date | string): string {
  return dayjs(date).format('YYYY-MM-DD')
}

export function getMonthLabel(baseDate: string): string {
  return dayjs(baseDate).locale('es').format('MMMM YYYY')
}

export function getMonthGrid(baseDate: string, selectedDate: string): CalendarCell[] {
  const current = dayjs(baseDate)
  const startOfMonth = current.startOf('month')
  const endOfMonth = current.endOf('month')

  const startWeekDay = startOfMonth.day() === 0 ? 6 : startOfMonth.day() - 1
  const daysInMonth = endOfMonth.date()

  const prevMonth = current.subtract(1, 'month')
  const daysInPrevMonth = prevMonth.endOf('month').date()

  const cells: CalendarCell[] = []
  const today = dayjs().format('YYYY-MM-DD')

  for (let i = startWeekDay - 1; i >= 0; i--) {
    const dayNumber = daysInPrevMonth - i
    const date = prevMonth.date(dayNumber).format('YYYY-MM-DD')

    cells.push({
      date,
      dayNumber,
      isCurrentMonth: false,
      isToday: date === today,
      isSelected: date === selectedDate,
    })
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const date = current.date(day).format('YYYY-MM-DD')

    cells.push({
      date,
      dayNumber: day,
      isCurrentMonth: true,
      isToday: date === today,
      isSelected: date === selectedDate,
    })
  }

  while (cells.length < 42) {
    const nextDay = cells.length - (startWeekDay + daysInMonth) + 1
    const nextMonth = current.add(1, 'month')
    const date = nextMonth.date(nextDay).format('YYYY-MM-DD')

    cells.push({
      date,
      dayNumber: nextDay,
      isCurrentMonth: false,
      isToday: date === today,
      isSelected: date === selectedDate,
    })
  }
  return cells
}

export function getWeekLabel(baseDate: string): string {
  const startOfWeek = dayjs(baseDate).startOf('week')
  const endOfWeek = dayjs(baseDate).endOf('week')
  return `${startOfWeek.format('DD MMM')} - ${endOfWeek.format('DD MMM YYYY')}`
}

export function getWeekGrid(baseDate: string, selectedDate: string): CalendarCell[] {
  const startOfWeek = dayjs(baseDate).startOf('week')
  const cells: CalendarCell[] = []
  const today = dayjs().format('YYYY-MM-DD')

  for (let i = 0; i < 7; i++) {
    const date = startOfWeek.add(i, 'day').format('YYYY-MM-DD')
    const dayNumber = dayjs(date).date()

    cells.push({
      date,
      dayNumber,
      isCurrentMonth: true, // Para semana, todos son del mes actual o no, pero simplificar
      isToday: date === today,
      isSelected: date === selectedDate,
    })
  }
 return cells
}
