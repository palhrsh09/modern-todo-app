// utils/dateHelpers.ts
import { parseISO, isBefore, isToday } from 'date-fns';

export function isOverdue(iso: string) {
  try {
    return isBefore(parseISO(iso), new Date());
  } catch {
    return false;
  }
}

export function isDueToday(iso: string) {
  try {
    return isToday(parseISO(iso));
  } catch {
    return false;
  }
}
