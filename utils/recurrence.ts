// utils/recurrence.ts
import { parseISO, addDays, addWeeks } from 'date-fns';
import { Recurrence } from '../types';

export function getNextDueDate(currentIso: string, recurrence: Recurrence) {
  const d = parseISO(currentIso);
  if (recurrence === 'Daily') return addDays(d, 1).toISOString();
  if (recurrence === 'Weekly') return addWeeks(d, 1).toISOString();
  return currentIso;
}

export function shouldRegenerate(task: { recurrence: Recurrence }) {
  return task.recurrence !== 'One Time';
}
