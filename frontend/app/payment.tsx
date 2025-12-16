import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, Alert, StyleSheet, ScrollView, TextInput } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { payBooking } from '@/services/api';

export default function PaymentScreen() {
  const params = useLocalSearchParams();
  const { bookingId, name, email, date, time } = params;
  
  const [loading, setLoading] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const formatCardNumber = (text: string) => {
    const cleaned = text.replace(/\s/g, '');
    const match = cleaned.match(/.{1,4}/g);
    return match ? match.join(' ') : '';
  };

  const formatExpiry = (text: string) => {
    const cleaned = text.replace(/\D/g, '');
    if (cleaned.length >= 2) {
      return cleaned.substring(0, 2) + '/' + cleaned.substring(2, 4);
    }
    return cleaned;
  };

  const validateCard = (): boolean => {
    const cleanedCard = cardNumber.replace(/\s/g, '');
    if (cleanedCard.length !== 16) {
      Alert.alert('Invalid Card', 'Please enter a 16-digit card number.');
      return false;
    }
    if (expiry.length !== 5) {
      Alert.alert('Invalid Expiry', 'Please enter expiry in MM/YY format.');
      return false;
    }
    if (cvc.length !== 3) {
      Alert.alert('Invalid CVC', 'Please enter a 3-digit CVC.');
      return false;
    }
    return true;
  };

  const handlePay = async () => {
    if (!validateCard()) {
      return;
    }

    setLoading(true);
    try {
      // Call backend payment endpoint
      const response = await payBooking({ bookingId: Number(bookingId) });
      
      if (response.success) {
        setPaymentSuccess(true);
        Alert.alert(
          'Payment Successful!',
          'Your appointment has been confirmed and payment processed.',
          [
            {
              text: 'Done',
              onPress: () => router.replace('/'),
            },
          ]
        );
      } else {
        Alert.alert('Payment Failed', response.message || 'Payment was not successful. Please try again.');
      }
    } catch (error: any) {
      console.error('Payment error:', error);
      Alert.alert('Payment Error', error.response?.data?.message || 'Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      <View style={styles.header}>
        <Text style={styles.title}>Payment</Text>
        <Text style={styles.subtitle}>Complete your appointment booking</Text>
      </View>

      <View style={styles.bookingInfo}>
        <Text style={styles.infoTitle}>Booking Details</Text>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Name:</Text>
          <Text style={styles.infoValue}>{name}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Email:</Text>
          <Text style={styles.infoValue}>{email}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Date & Time:</Text>
          <Text style={styles.infoValue}>{date} at {time}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Booking ID:</Text>
          <Text style={styles.infoValue}>#{bookingId}</Text>
        </View>
      </View>

      {!paymentSuccess && (
        <View style={styles.paymentSection}>
          <Text style={styles.sectionTitle}>Payment Information</Text>
          <Text style={styles.testCardInfo}>
            Test Card: 4242 4242 4242 4242{'\n'}
            Exp: 12/34 | CVC: 123
          </Text>
          
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Card Number</Text>
            <TextInput
              style={styles.input}
              placeholder="4242 4242 4242 4242"
              value={cardNumber}
              onChangeText={(text) => {
                const cleaned = text.replace(/\s/g, '');
                if (cleaned.length <= 16) {
                  setCardNumber(formatCardNumber(cleaned));
                }
              }}
              keyboardType="numeric"
              maxLength={19}
              autoComplete="off"
              importantForAutofill="no"
              editable={!loading}
            />
          </View>

          <View style={styles.row}>
            <View style={[styles.inputContainer, styles.halfWidth]}>
              <Text style={styles.label}>Expiry (MM/YY)</Text>
              <TextInput
                style={styles.input}
                placeholder="12/34"
                value={expiry}
                onChangeText={(text) => {
                  const cleaned = text.replace(/\D/g, '');
                  if (cleaned.length <= 4) {
                    setExpiry(formatExpiry(cleaned));
                  }
                }}
                keyboardType="numeric"
                maxLength={5}
                autoComplete="off"
                importantForAutofill="no"
                editable={!loading}
              />
            </View>

            <View style={[styles.inputContainer, styles.halfWidth]}>
              <Text style={styles.label}>CVC</Text>
              <TextInput
                style={styles.input}
                placeholder="123"
                value={cvc}
                onChangeText={(text) => {
                  const cleaned = text.replace(/\D/g, '');
                  if (cleaned.length <= 3) {
                    setCvc(cleaned);
                  }
                }}
                keyboardType="numeric"
                maxLength={3}
                autoComplete="off"
                importantForAutofill="no"
                editable={!loading}
              />
            </View>
          </View>

          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={handlePay}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Pay Now</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => router.back()}
            disabled={loading}
          >
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      )}

      {paymentSuccess && (
        <View style={styles.successContainer}>
          <Text style={styles.successIcon}>✓</Text>
          <Text style={styles.successTitle}>Payment Successful!</Text>
          <Text style={styles.successMessage}>
            Your appointment has been confirmed and payment has been processed successfully.
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => router.replace('/')}
          >
            <Text style={styles.buttonText}>Back to Home</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    backgroundColor: '#fff',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
  },
  bookingInfo: {
    backgroundColor: '#fff',
    margin: 16,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  infoLabel: {
    fontSize: 14,
    color: '#666',
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  paymentSection: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  testCardInfo: {
    backgroundColor: '#fff3cd',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ffc107',
    fontSize: 12,
    color: '#856404',
    marginBottom: 16,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 8,
    fontSize: 16,
    color: '#333',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfWidth: {
    flex: 1,
    marginRight: 8,
  },
  button: {
    backgroundColor: '#28a745',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonDisabled: {
    backgroundColor: '#6c757d',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  cancelButton: {
    backgroundColor: 'transparent',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  cancelButtonText: {
    color: '#6c757d',
    fontSize: 16,
    fontWeight: '500',
  },
  successContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  successIcon: {
    fontSize: 64,
    color: '#28a745',
    marginBottom: 16,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#28a745',
    marginBottom: 12,
    textAlign: 'center',
  },
  successMessage: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
  },
});
