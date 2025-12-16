import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, Alert, StyleSheet, RefreshControl } from 'react-native';
import { router } from 'expo-router';
import { getAppointments, Appointment } from '@/services/api';

export default function HomeScreen() {
  const [slots, setSlots] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchSlots();
  }, []);

  const fetchSlots = async () => {
    try {
      const data = await getAppointments();
      setSlots(data);
    } catch (error: any) {
      console.error('Failed to fetch appointments:', error);
      Alert.alert('Error', 'Failed to fetch appointments. Please check your connection and try again.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchSlots();
  };

  const handleSlotPress = (slot: Appointment) => {
    if (!slot.available) {
      Alert.alert('Unavailable', 'This slot is not available.');
      return;
    }
    // Navigate to booking screen with slot data
    router.push({
      pathname: '/booking',
      params: {
        slotId: slot.id.toString(),
        date: slot.date,
        time: slot.time,
      },
    });
  };

  const renderItem = ({ item }: { item: Appointment }) => (
    <TouchableOpacity
      style={[styles.item, !item.available && styles.itemDisabled]}
      onPress={() => handleSlotPress(item)}
      disabled={!item.available}
    >
      <View style={styles.itemContent}>
        <Text style={styles.dateText}>{item.date}</Text>
        <Text style={styles.timeText}>{item.time}</Text>
        {!item.available && <Text style={styles.unavailableText}>Unavailable</Text>}
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#007bff" />
        <Text style={styles.loadingText}>Loading appointments...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Available Appointment Slots</Text>
        <Text style={styles.subtitle}>Select a time slot to book your appointment</Text>
      </View>
      {slots.length === 0 ? (
        <View style={styles.center}>
          <Text style={styles.emptyText}>No appointments available</Text>
        </View>
      ) : (
        <FlatList
          data={slots}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#666',
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
  },
  listContent: {
    padding: 16,
  },
  item: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  itemDisabled: {
    backgroundColor: '#f5f5f5',
    opacity: 0.6,
  },
  itemContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  timeText: {
    fontSize: 16,
    color: '#007bff',
    fontWeight: '500',
  },
  unavailableText: {
    fontSize: 12,
    color: '#dc3545',
    fontWeight: '500',
  },
});
