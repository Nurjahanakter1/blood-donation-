// Reusable Donor Card Component
import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import { MapPin, Phone, ChevronRight } from 'lucide-react-native';
import COLORS from '../styles/colors';
import styles from '../styles/donorCardStyles';

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

export default DonorCard;
