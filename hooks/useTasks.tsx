// hooks/useTasks.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Task, Recurrence } from '../types';
import { v4 as uuidv4 } from 'uuid';
import { getNextDueDate, shouldRegenerate } from '../utils/recurrence';

const TASKS_KEY = 'ADVANCED_TODO_TASKS_v1';

interface TasksContextValue {
  tasks: Task[];
  addTask: (t: Omit<Task, 'id' | 'createdAt'>) => void;
  updateTask: (id: string, patch: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  toggleComplete: (id: string) => void;
  refresh: () => Promise<void>;
}

const TasksContext = createContext<TasksContextValue | undefined>(undefined);

export const useTasks = () => {
  const ctx = useContext(TasksContext);
  if (!ctx) throw new Error('useTasks must be used within TaskProvider');
  return ctx;
};

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(TASKS_KEY);
        if (raw) setTasks(JSON.parse(raw));
      } catch (e) {
        console.warn('Failed to load tasks', e);
      }
    })();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem(TASKS_KEY, JSON.stringify(tasks)).catch((e) => console.warn('Failed save', e));
  }, [tasks]);

  const refresh = async () => {
    const raw = await AsyncStorage.getItem(TASKS_KEY);
    if (raw) setTasks(JSON.parse(raw));
  };

  const addTask = (t: Omit<Task, 'id' | 'createdAt'>) => {
    const task: Task = { ...t, id: uuidv4(), createdAt: new Date().toISOString() };
    setTasks((s) => [task, ...s]);
  };

  const updateTask = (id: string, patch: Partial<Task>) => {
    setTasks((s) => s.map((x) => (x.id === id ? { ...x, ...patch } : x)));
  };

  const deleteTask = (id: string) => {
    setTasks((s) => s.filter((x) => x.id !== id));
  };

  const toggleComplete = (id: string) => {
    setTasks((s) => {
      const idx = s.findIndex((x) => x.id === id);
      if (idx === -1) return s;
      const task = s[idx];
      const newArr = [...s];

      if (task.status === 'Completed') {
        newArr[idx] = { ...task, status: 'Pending' };
        return newArr;
      }

      // Mark completed
      newArr[idx] = { ...task, status: 'Completed' };

      // handle recurrence
      if (shouldRegenerate(task)) {
        const nextDue = getNextDueDate(task.dueDate, task.recurrence as Recurrence);
        const regenerated: Task = {
          ...task,
          id: uuidv4(),
          status: 'Pending',
          dueDate: nextDue,
          createdAt: new Date().toISOString(),
        };
        newArr.unshift(regenerated);
      }

      return newArr;
    });
  };

  return (
    <TasksContext.Provider value={{ tasks, addTask, updateTask, deleteTask, toggleComplete, refresh }}>
      {children}
    </TasksContext.Provider>
  );
};
