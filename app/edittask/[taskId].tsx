// app/edittask/[taskId].tsx
import React, { useEffect, useState } from 'react';
import { SafeAreaView, TextInput, Button, View, StyleSheet, Text, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useTasks } from '@/hooks/useTasks';
import { PriorityOptions, StatusOptions, RecurrenceOptions, DEFAULT_CATEGORIES } from '../../constants';
import { Task } from '../../types';
import { useLocalSearchParams, useRouter } from 'expo-router';

export default function EditTaskScreen() {
  const { taskId } = useLocalSearchParams();
  const router = useRouter();
  const { tasks, updateTask } = useTasks();

  const existing = tasks.find((t) => t.id === taskId);

  const [title, setTitle] = useState(existing?.title || '');
  const [description, setDescription] = useState(existing?.description || '');
  const [dueDate, setDueDate] = useState(existing?.dueDate ? new Date(existing.dueDate) : new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [priority, setPriority] = useState(existing?.priority || PriorityOptions[1]);
  const [status, setStatus] = useState(existing?.status || StatusOptions[0]);
  const [recurrence, setRecurrence] = useState(existing?.recurrence || RecurrenceOptions[0]);
  const [category, setCategory] = useState(existing?.category || DEFAULT_CATEGORIES[0]);

  useEffect(() => {
    if (!existing) {
      alert('Task not found');
      router.back();
      return;
    }
    setTitle(existing.title);
    setDescription(existing.description || '');
    setDueDate(existing.dueDate ? new Date(existing.dueDate) : new Date());
    setPriority(existing.priority);
    setStatus(existing.status);
    setRecurrence(existing.recurrence);
    setCategory(existing.category);
  }, [existing]);

  const onSave = () => {
    if (!title.trim()) {
      alert('Please enter a title');
      return;
    }

    const payload: Omit<Task, 'id' | 'createdAt'> = {
      title: title.trim(),
      description: description.trim(),
      dueDate: dueDate.toISOString(),
      status,
      priority,
      category,
      recurrence
    };

    updateTask(existing!.id, payload);
    router.back();
  };

  if (!existing) return null;

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.label}>Title</Text>
      <TextInput value={title} onChangeText={setTitle} style={styles.input} />

      <Text style={styles.label}>Description</Text>
      <TextInput
        value={description}
        onChangeText={setDescription}
        style={[styles.input, { height: 80 }]}
        multiline
      />

      <Text style={styles.label}>Due Date</Text>
      <View style={{ marginBottom: 8 }}>
        <Button title={dueDate.toLocaleString()} onPress={() => setShowPicker(true)} />
        {showPicker && (
          <DateTimePicker
            value={dueDate}
            mode="datetime"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={(_, d) => {
              setShowPicker(false);
              if (d) setDueDate(d);
            }}
          />
        )}
      </View>

      <Text style={styles.label}>Priority</Text>
      <View style={styles.row}>
        {PriorityOptions.map((p) => (
          <Button
            key={p}
            title={p}
            onPress={() => setPriority(p)}
            color={priority === p ? '#2196F3' : undefined}
          />
        ))}
      </View>

      <Text style={styles.label}>Status</Text>
      <View style={styles.row}>
        {StatusOptions.map((s) => (
          <Button
            key={s}
            title={s}
            onPress={() => setStatus(s)}
            color={status === s ? '#2196F3' : undefined}
          />
        ))}
      </View>

      <Text style={styles.label}>Recurrence</Text>
      <View style={styles.row}>
        {RecurrenceOptions.map((r) => (
          <Button
            key={r}
            title={r}
            onPress={() => setRecurrence(r)}
            color={recurrence === r ? '#2196F3' : undefined}
          />
        ))}
      </View>

      <Text style={styles.label}>Category</Text>
      <View style={styles.row}>
        {DEFAULT_CATEGORIES.map((c) => (
          <Button
            key={c}
            title={c}
            onPress={() => setCategory(c)}
            color={category === c ? '#2196F3' : undefined}
          />
        ))}
      </View>

      <View style={{ marginTop: 16 }}>
        <Button title="Save Changes" onPress={onSave} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 12 },
  input: { borderWidth: 1, padding: 8, borderRadius: 8, marginBottom: 8 },
  label: { marginBottom: 6, fontWeight: '600' },
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 8 }
});
