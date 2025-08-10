import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { Stack, useRouter, useSegments } from 'expo-router';
import { TaskProvider } from '../hooks/useTasks';

function CustomHeader({ title, navigation, route }: { title: string; navigation?: any; route?: any }) {
  const router = useRouter();

  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>{title}</Text>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => {
          router.push('/addtask');
        }}
      >
        <Text style={styles.addButtonText}>＋</Text>
      </TouchableOpacity>
    </View>
  );
}

function BottomNavBar() {
  const router = useRouter();
  const segments = useSegments();
  const current = segments[0] || '';

  return (
    <SafeAreaView style={styles.bottomNavContainer} edges={['bottom']}>
      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={[styles.navItem, current === '' && styles.activeTab]}
          onPress={() => {
            router.push('/');
          }}
        >
          <Text style={[styles.navText, current === '' && styles.activeText]}>
            Home
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.navItem, current === 'dashboard' && styles.activeTab]}
          onPress={() => {
            router.push('/dashboard');
          }}
        >
          <Text
            style={[styles.navText, current === 'dashboard' && styles.activeText]}
          >
            Dashboard
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default function RootLayout() {
  return (
    <TaskProvider>
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <Stack
            screenOptions={{
              header: (props) => {
                const safeTitle = props?.options?.title || 'Smart To-Do';
                return <CustomHeader title={safeTitle} route={props.route} navigation={props.navigation} />;
              },
            }}
          >
            <Stack.Screen name="index" options={{ title: 'Home' }} />
            <Stack.Screen name="dashboard" options={{ title: 'Dashboard' }} />
            <Stack.Screen name="taskscreen" options={{ title: 'Tasks' }} />
            <Stack.Screen name="addtask" options={{ title: 'Add Task' }} />
            <Stack.Screen
              name="edittask/[taskId]"
              options={{ title: 'Edit Task' }}
            />
          </Stack>
        </View>

        <BottomNavBar />
      </View>
    </TaskProvider>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 70,
    backgroundColor: '#007AFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingTop: 36,
    paddingBottom: 8,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  addButton: {
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  addButtonText: {
    color: '#007AFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  bottomNavContainer: {
    backgroundColor: '#fff',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingBottom: 16,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  navItem: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  navText: {
    fontSize: 14,
    color: '#444',
  },
  activeTab: {
    backgroundColor: '#007AFF20',
  },
  activeText: {
    color: '#007AFF',
    fontWeight: '600',
  },
});