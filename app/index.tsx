// app/Home.tsx
import React, { useMemo, useState } from 'react';
import { View, SafeAreaView, FlatList, TextInput, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useTasks } from '../hooks/useTasks';
import TaskCard from '../components/TaskCard';
import FilterBar from '../components/FilterBar';
import { isOverdue, isDueToday } from '../utils/dataHelpers';
import { useRouter } from 'expo-router';

export default function Home() {
  const router = useRouter();
  const { tasks: rawTasks, toggleComplete, deleteTask } = useTasks();
  let tasks: any[] = [];

  try {
    tasks = Array.isArray(rawTasks) ? rawTasks : [];
  } catch (err) {
    console.error("Error reading tasks:", err);
    tasks = [];
  }

  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState({
    status: 'All',
    priority: 'All',
    category: 'All',
    showOverdue: false,
    dueToday: false
  });

  const filtered = useMemo(() => {
    try {
      const q = query.trim().toLowerCase();
      return tasks
        .filter((t) => {
          if (!t) return false;
          if (filters.status !== 'All' && t.status !== filters.status) return false;
          if (filters.priority !== 'All' && t.priority !== filters.priority) return false;
          if (filters.category !== 'All' && (t.category || 'General') !== filters.category) return false;
          if (filters.showOverdue && (!t.dueDate || !isOverdue(t.dueDate))) return false;
          if (filters.dueToday && (!t.dueDate || !isDueToday(t.dueDate))) return false;
          if (q && !(t.title?.toLowerCase().includes(q) || (t.description || '').toLowerCase().includes(q)))
            return false;
          return true;
        })
        .sort((a, b) => {
          const timeA = a?.dueDate ? new Date(a.dueDate).getTime() : Infinity;
          const timeB = b?.dueDate ? new Date(b.dueDate).getTime() : Infinity;
          return timeA - timeB;
        });
    } catch (err) {
      console.error("Error processing filtered tasks:", err);
      return [];
    }
  }, [tasks, query, filters]);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Smart To-Do</Text>

        {/* Replace Link with TouchableOpacity and router.replace */}
        <TouchableOpacity
          onPress={() => router.replace('/addtask')}
          style={styles.addButton}
        >
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>

      <FilterBar filters={filters} setFilters={setFilters} />

      <TextInput
        placeholder="Search tasks..."
        value={query}
        onChangeText={setQuery}
        style={styles.search}
      />

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TaskCard
            task={item}
            onToggle={() => toggleComplete(item.id)}
            onEdit={() => router.push(`/edittask/${item.id}`)}
            onDelete={() => deleteTask(item.id)}
          />
        )}
        ListEmptyComponent={() => <Text style={styles.empty}>No tasks found</Text>}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 12 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  title: { fontSize: 22, fontWeight: '700' },
  addButton: {
    backgroundColor: '#007AFF',
    borderRadius: 6,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  search: { borderWidth: 1, borderRadius: 8, padding: 8, marginVertical: 8 },
  empty: { textAlign: 'center', marginTop: 40, color: '#666' }
});
