// components/FilterBar.tsx
import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import {
  PriorityOptions,
  StatusOptions,
  DEFAULT_CATEGORIES
} from '../constants';

export default function FilterBar({
  filters,
  setFilters
}: {
  filters: any;
  setFilters: React.Dispatch<React.SetStateAction<any>>;
}) {
  if (!filters || typeof setFilters !== 'function') return null; // ✅ Safety check

  const safeMap = (arr: string[], cb: (item: string) => JSX.Element) =>
    Array.isArray(arr) ? arr.map(cb) : null;

  return (
    <View style={styles.container}>
      {/* Status */}
      <View style={styles.row}>
        <Button
          title="All Status"
          onPress={() => setFilters((p) => ({ ...p, status: 'All' }))}
        />
        {safeMap(StatusOptions, (s) => (
          <Button
            key={s}
            title={s}
            onPress={() => setFilters((p) => ({ ...p, status: s }))}
          />
        ))}
      </View>

      {/* Priority */}
      <View style={styles.row}>
        <Button
          title="All Priority"
          onPress={() => setFilters((p) => ({ ...p, priority: 'All' }))}
        />
        {safeMap(PriorityOptions, (p) => (
          <Button
            key={p}
            title={p}
            onPress={() => setFilters((prev) => ({ ...prev, priority: p }))}
          />
        ))}
      </View>

      {/* Category */}
      <View style={styles.row}>
        <Button
          title="All Cat"
          onPress={() => setFilters((p) => ({ ...p, category: 'All' }))}
        />
        {safeMap(DEFAULT_CATEGORIES, (c) => (
          <Button
            key={c}
            title={c}
            onPress={() => setFilters((prev) => ({ ...prev, category: c }))}
          />
        ))}
      </View>

      {/* Special Toggles */}
      <View style={styles.row}>
        <Button
          title="Overdue"
          onPress={() =>
            setFilters((p) => ({ ...p, showOverdue: !p.showOverdue }))
          }
        />
        <Button
          title="Due Today"
          onPress={() =>
            setFilters((p) => ({ ...p, dueToday: !p.dueToday }))
          }
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 8 },
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginBottom: 6 }
});
