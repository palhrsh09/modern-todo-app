import React, { useEffect, useState } from 'react';
import { SafeAreaView, TextInput, Button, View, StyleSheet, Text, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useTasks } from '../hooks/useTasks';
import { PriorityOptions, StatusOptions, RecurrenceOptions, DEFAULT_CATEGORIES } from '../constants';
import { Task } from '../types';
import { useLocalSearchParams, useRouter } from 'expo-router';

export default function Taskscreen() {
  const { taskId } = useLocalSearchParams();
  const router = useRouter();

  console.log("📌 Taskscreen mounted");
  console.log("🔍 taskId from params:", taskId);

  const { tasks: rawTasks, addTask, updateTask } = useTasks();
  console.log("📋 rawTasks from hook:", rawTasks);

  const tasks = Array.isArray(rawTasks) ? rawTasks : [];
  const existing = tasks.find((t) => t.id === taskId);

  console.log("🔎 existing task found?", !!existing, existing);

  const [title, setTitle] = useState(existing?.title || '');
  const [description, setDescription] = useState(existing?.description || '');
  const [dueDate, setDueDate] = useState(
    existing?.dueDate ? new Date(existing.dueDate) : new Date()
  );
  const [showPicker, setShowPicker] = useState(false);
  const [priority, setPriority] = useState(existing?.priority || PriorityOptions[1]);
  const [status, setStatus] = useState(existing?.status || StatusOptions[0]);
  const [recurrence, setRecurrence] = useState(existing?.recurrence || RecurrenceOptions[0]);
  const [category, setCategory] = useState(existing?.category || DEFAULT_CATEGORIES[0]);

  useEffect(() => {
    console.log("📢 useEffect triggered — existing changed:", existing);
    if (existing) {
      setTitle(existing.title);
      setDescription(existing.description || '');
      setDueDate(existing?.dueDate ? new Date(existing.dueDate) : new Date());
    }
  }, [existing]);

  const onSave = () => {
    console.log("💾 onSave clicked");
    try {
      console.log("📝 Current title:", title);
      if (!title.trim()) {
        console.warn("⚠️ No title provided");
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

      console.log("📦 Payload ready:", payload);

      if (existing) {
        console.log('🔄 Updating existing task:', existing.id);
        updateTask(existing.id, payload);
      } else {
        console.log('➕ Adding new task...');
        addTask(payload);
      }

      console.log('🔙 Going back to previous screen...');
      router.back();
    } catch (err) {
      console.error('❌ Error in onSave:', err);
      alert(`Something went wrong while saving the task: ${err instanceof Error ? err.message : String(err)}`);
    }
  };

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
              console.log("📅 Date picker changed:", d);
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
            onPress={() => { console.log("⚡ Priority selected:", p); setPriority(p); }}
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
            onPress={() => { console.log("⚡ Status selected:", s); setStatus(s); }}
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
            onPress={() => { console.log("♻ Recurrence selected:", r); setRecurrence(r); }}
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
            onPress={() => { console.log("🏷 Category selected:", c); setCategory(c); }}
            color={category === c ? '#2196F3' : undefined}
          />
        ))}
      </View>

      <View style={{ marginTop: 16 }}>
        <Button title="Save Task" onPress={onSave} />
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
