import React, { useState, useEffect } from 'react';
import 'react-native-get-random-values';
import {
  SafeAreaView,
  ScrollView,
  TextInput,
  Button,
  StyleSheet,
  View,
  Text,
  Platform,
  TouchableOpacity, // Add TouchableOpacity
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {
  PriorityOptions,
  StatusOptions,
  RecurrenceOptions,
  DEFAULT_CATEGORIES,
} from '../constants';
import { useTasks } from '../hooks/useTasks';
import { Task } from '../types';
import { useRouter } from 'expo-router';
import { v4 as uuidv4 } from 'uuid';

function TasksAdd() {
  console.log('first harsh - TasksAdd component rendered');

  const router = useRouter();
  console.log('11');
  const { addTask } = useTasks();
  console.log('21');

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [priority, setPriority] = useState(PriorityOptions[1]);
  const [status, setStatus] = useState(StatusOptions[0]);
  const [recurrence, setRecurrence] = useState(RecurrenceOptions[0]);
  const [category, setCategory] = useState(DEFAULT_CATEGORIES[0]);

  useEffect(() => {
    console.log('📝 title changed:', title);
  }, [title]);

  useEffect(() => {
    console.log('📝 description changed:', description);
  }, [description]);

  useEffect(() => {
    console.log('📝 dueDate changed:', dueDate);
  }, [dueDate]);

  useEffect(() => {
    console.log('📝 showPicker changed:', showPicker);
  }, [showPicker]);

  useEffect(() => {
    console.log('📝 priority changed:', priority);
  }, [priority]);

  useEffect(() => {
    console.log('📝 status changed:', status);
  }, [status]);

  useEffect(() => {
    console.log('📝 recurrence changed:', recurrence);
  }, [recurrence]);

  useEffect(() => {
    console.log('📝 category changed:', category);
  }, [category]);

  useEffect(() => {
    console.log('🛠 TasksAdd mounted');
    return () => {
      console.log('🛠 TasksAdd unmounted');
    };
  }, []);

  useEffect(() => {
    console.log('📝 State updated:', {
      title,
      description,
      dueDate,
      priority,
      status,
      recurrence,
      category,
    });
  }, [title, description, dueDate, priority, status, recurrence, category]);

  const onSave = () => {
    try {
      if (!title.trim()) {
        alert('Please enter a title');
        return;
      }

      const newTask: Task = {
        id: uuidv4(),
        createdAt: new Date().toISOString(),
        title: title.trim(),
        description: description.trim(),
        dueDate: dueDate.toISOString(),
        status,
        priority,
        category,
        recurrence,
      };

      console.log('🛠 Adding new task:', newTask);
      addTask(newTask);
      router.push('/dashboard');
    } catch (err) {
      console.error('❌ Error in onSave:', err);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
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
          <Button
            title={dueDate.toLocaleString()}
            onPress={() => setShowPicker(true)}
          />
          {showPicker && (
            <DateTimePicker
              key={dueDate.toISOString()}
              value={dueDate}
              mode="datetime"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={(event, selectedDate) => {
                try {
                  console.log('DateTimePicker event:', event.type);
                  if (Platform.OS === 'android') {
                    if (event.type === 'set') {
                      setDueDate(selectedDate || dueDate);
                      setShowPicker(false);
                    } else if (event.type === 'dismissed') {
                      console.log('Date picker dismissed on Android');
                    }
                  } else {
                    if (event.type === 'set') {
                      setDueDate(selectedDate || dueDate);
                    }
                    setShowPicker(false);
                  }
                } catch (err) {
                  console.warn('Error handling DateTimePicker onChange:', err);
                }
              }}
            />
          )}
        </View>

        <Text style={styles.label}>Priority</Text>
        <View style={styles.row}>
          {PriorityOptions.map((p) => (
            <TouchableOpacity
              key={p}
              style={[
                styles.buttonWrapper,
                priority === p ? styles.selectedButtonWrapper : styles.unselectedButtonWrapper,
              ]}
              onPress={() => setPriority(p)}
            >
              <Text
                style={[
                  styles.buttonText,
                  priority === p ? styles.selectedButtonText : styles.unselectedButtonText,
                ]}
              >
                {p}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>Status</Text>
        <View style={styles.row}>
          {StatusOptions.map((s) => (
            <TouchableOpacity
              key={s}
              style={[
                styles.buttonWrapper,
                status === s ? styles.selectedButtonWrapper : styles.unselectedButtonWrapper,
              ]}
              onPress={() => setStatus(s)}
            >
              <Text
                style={[
                  styles.buttonText,
                  status === s ? styles.selectedButtonText : styles.unselectedButtonText,
                ]}
              >
                {s}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>Recurrence</Text>
        <View style={styles.row}>
          {RecurrenceOptions.map((r) => (
            <TouchableOpacity
              key={r}
              style={[
                styles.buttonWrapper,
                recurrence === r ? styles.selectedButtonWrapper : styles.unselectedButtonWrapper,
              ]}
              onPress={() => setRecurrence(r)}
            >
              <Text
                style={[
                  styles.buttonText,
                  recurrence === r ? styles.selectedButtonText : styles.unselectedButtonText,
                ]}
              >
                {r}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>Category</Text>
        <View style={styles.row}>
          {DEFAULT_CATEGORIES.map((c) => (
            <TouchableOpacity
              key={c}
              style={[
                styles.buttonWrapper,
                category === c ? styles.selectedButtonWrapper : styles.unselectedButtonWrapper,
              ]}
              onPress={() => setCategory(c)}
            >
              <Text
                style={[
                  styles.buttonText,
                  category === c ? styles.selectedButtonText : styles.unselectedButtonText,
                ]}
              >
                {c}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={{ marginTop: 16 }}>
          <Button title="Add Task" onPress={onSave} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContainer: {
    padding: 12,
    paddingBottom: 40,
  },
  input: {
    borderWidth: 1,
    padding: 8,
    borderRadius: 8,
    marginBottom: 8,
  },
  label: {
    marginBottom: 6,
    fontWeight: '600',
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 8,
  },
  buttonWrapper: {
    borderRadius: 6,
    overflow: 'hidden',
    marginRight: 8,
    marginBottom: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  selectedButtonWrapper: {
    backgroundColor: '#2196F3', // Blue for selected
  },
  unselectedButtonWrapper: {
    backgroundColor: '#E0E0E0', // Gray for unselected
  },
  buttonText: {
    fontSize: 16,
    textAlign: 'center',
  },
  selectedButtonText: {
    color: '#FFFFFF', // White text for selected
  },
  unselectedButtonText: {
    color: '#000000', // Black text for unselected
  },
});

export default TasksAdd;