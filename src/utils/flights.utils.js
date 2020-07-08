import { format, parseISO } from 'date-fns'
import ru from 'date-fns/locale/ru'

export const formatFlightTime = (dateTime) =>
  format(parseISO(dateTime), 'HH:mm', {
    locale: ru,
  })

export const formatFlightDate = (dateTime) =>
  format(parseISO(dateTime), 'dd MMMM eeeeee', {
    locale: ru,
  })

export const formatFlightDuration = (minutes) => {
  const hours = Math.ceil(minutes / 60)
  const min = minutes % 60
  return `${hours} ч ${min} мин`
}
