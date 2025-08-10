// types.ts
export type Priority = 'Low' | 'Medium' | 'High';
export type Status = 'Pending' | 'In Progress' | 'Completed';
export type Recurrence = 'One Time' | 'Daily' | 'Weekly';

export interface Task {
  id: string;
  title: string;
  description?: string;
  dueDate: string; // ISO
  status: Status;
  priority: Priority;
  category?: string;
  recurrence: Recurrence;
  createdAt: string;
}
