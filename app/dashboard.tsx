// app/Dashboard.tsx
import React, { useMemo } from 'react';
import { SafeAreaView, Text, View, StyleSheet } from 'react-native';
import { useTasks } from '../hooks/useTasks';
import { isOverdue, isDueToday } from '../utils/dataHelpers';

export default function Dashboard() {
  const { tasks: rawTasks } = useTasks();
  const tasks = Array.isArray(rawTasks) ? rawTasks : []; // ✅ Always array

  const stats = useMemo(() => {
    if (tasks.length === 0) {
      return { total: 0, completed: 0, overdue: 0, dueToday: 0 };
    }

    const total = tasks.length;
    const completed = tasks.filter(t => t?.status === 'Completed').length;
    const overdue = tasks.filter(
      t => t?.status !== 'Completed' && t?.dueDate && isOverdue(t.dueDate)
    ).length;
    const dueToday = tasks.filter(
      t => t?.dueDate && isDueToday(t.dueDate)
    ).length;

    return { total, completed, overdue, dueToday };
  }, [tasks]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Dashboard</Text>
      <View style={styles.card}>
        <Text style={styles.stat}>Total Tasks: {stats.total}</Text>
        <Text style={styles.stat}>Completed: {stats.completed}</Text>
        <Text style={styles.stat}>Overdue: {stats.overdue}</Text>
        <Text style={styles.stat}>Due Today: {stats.dueToday}</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 12 },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 12 },
  card: { padding: 16, borderWidth: 1, borderRadius: 8 },
  stat: { fontSize: 16, marginBottom: 8 }
});
