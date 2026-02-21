// Reusable Donor Card Component
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import { MapPin, Phone, ChevronRight } from 'lucide-react-native';
import COLORS from '../styles/colors';

const DonorCard = ({ donor, onPress, onCall, onRequest }) => {
  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.7}
      onPress={onPress}
    >
      {/* Left - Profile Image */}
      <View style={styles.leftSection}>
        <Image
          source={{ uri: donor.image }}
          style={styles.profileImage}
          defaultSource={require('../../assets/blood-image-logo.jpg')}
        />
        {/* Availability Dot */}
        <View
          style={[
            styles.availabilityDot,
            {
              backgroundColor: donor.available
                ? COLORS.success
                : COLORS.grey,
            },
          ]}
        />
      </View>

      {/* Middle - Info */}
      <View style={styles.middleSection}>
        <Text style={styles.name} numberOfLines={1}>
          {donor.name}
        </Text>
        <View style={styles.locationRow}>
          <MapPin size={13} color={COLORS.grey} />
          <Text style={styles.location} numberOfLines={1}>
            {donor.location}
          </Text>
        </View>
        <View style={styles.statusRow}>
          <View
            style={[
              styles.statusBadge,
              {
                backgroundColor: donor.available
                  ? '#E8F5E9'
                  : '#F5F5F5',
              },
            ]}
          >
            <Text
              style={[
                styles.statusText,
                {
                  color: donor.available
                    ? COLORS.success
                    : COLORS.grey,
                },
              ]}
            >
              {donor.available ? 'Available' : 'Unavailable'}
            </Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionRow}>
          <TouchableOpacity
            style={styles.callBtn}
            activeOpacity={0.7}
            onPress={onCall}
          >
            <Phone size={13} color={COLORS.white} />
            <Text style={styles.callBtnText}>Call</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.requestBtn}
            activeOpacity={0.7}
            onPress={onRequest}
          >
            <Text style={styles.requestBtnText}>Request</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Right - Blood Group & Arrow */}
      <View style={styles.rightSection}>
        <View style={styles.bloodBadge}>
          <Text style={styles.bloodText}>{donor.bloodGroup}</Text>
        </View>
        <ChevronRight size={18} color={COLORS.mediumGrey} style={{ marginTop: 12 }} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  leftSection: {
    position: 'relative',
    marginRight: 12,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.lightGrey,
  },
  availabilityDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    position: 'absolute',
    bottom: 0,
    right: 0,
    borderWidth: 2.5,
    borderColor: COLORS.white,
  },
  middleSection: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 3,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 5,
  },
  location: {
    fontSize: 12,
    color: COLORS.grey,
    flex: 1,
  },
  statusRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '600',
  },
  actionRow: {
    flexDirection: 'row',
    gap: 8,
  },
  callBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.success,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    gap: 4,
  },
  callBtnText: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.white,
  },
  requestBtn: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 8,
  },
  requestBtnText: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.white,
  },
  rightSection: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingLeft: 8,
  },
  bloodBadge: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
    minWidth: 44,
    alignItems: 'center',
  },
  bloodText: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.white,
  },
});

export default DonorCard;
