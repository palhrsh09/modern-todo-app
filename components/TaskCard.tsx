// components/TaskCard.tsx
import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { Task } from '../types';
import { format } from 'date-fns';
import { isOverdue } from '../utils/dataHelpers';

export default function TaskCard({
  task,
  onToggle,
  onEdit,
  onDelete
}: {
  task: Task;
  onToggle: () => void;
  onEdit: () => void;
  onDelete: () => void;
}) {
  if (!task) return null; // ✅ Prevent crashes if task is undefined

  const overdue =
    task?.dueDate && isOverdue(task.dueDate) && task.status !== 'Completed';

  return (
    <View style={[styles.card, overdue ? styles.overdue : null]}>
      <View style={styles.rowTop}>
        <Text style={styles.title}>{task.title || 'Untitled Task'}</Text>
        <Text style={styles.meta}>{task.priority || 'No Priority'}</Text>
      </View>

      {task.description ? (
        <Text style={styles.desc}>{task.description}</Text>
      ) : null}

      {task.dueDate && (
        <Text style={styles.meta}>
          Due: {format(new Date(task.dueDate), 'PPp')}
        </Text>
      )}

      <Text style={styles.meta}>
        Status: {task.status || 'Unknown'} • Recurrence:{' '}
        {task.recurrence || 'None'}
      </Text>

      <View style={styles.actions}>
        <Button
          title={task.status === 'Completed' ? 'Uncomplete' : 'Complete'}
          onPress={onToggle}
        />
        <Button title="Edit" onPress={onEdit} />
        <Button title="Delete" color="red" onPress={onDelete} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { borderWidth: 1, padding: 12, borderRadius: 8, marginBottom: 10 },
  overdue: { borderColor: '#d9534f' },
  title: { fontWeight: '700', fontSize: 16 },
  desc: { marginTop: 6, color: '#444' },
  meta: { marginTop: 6, color: '#666', fontSize: 12 },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10
  },
  rowTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
});
