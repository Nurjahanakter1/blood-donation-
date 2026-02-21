// Donor Detail Screen - Blood Donation App
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  StatusBar,
  Alert,
  Linking,
} from 'react-native';
import {
  ArrowLeft,
  MapPin,
  Phone,
  Mail,
  Calendar,
  Heart,
  Droplets,
  Share2,
  Clock,
  Award,
  User,
} from 'lucide-react-native';
import COLORS from '../../styles/colors';

const DonorDetail = ({ route, navigation }) => {
  const { donor } = route.params;

  const handleCall = () => {
    Alert.alert(
      '📞 Call Donor',
      `Do you want to call ${donor.name}?\n\nPhone: ${donor.phone}`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Call Now',
          onPress: () => {
            Linking.openURL(`tel:${donor.phone}`).catch(() =>
              Alert.alert('Error', 'Unable to make phone call')
            );
          },
        },
      ]
    );
  };

  const handleEmail = () => {
    Alert.alert(
      '✉️ Email Donor',
      `Send email to ${donor.email}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Send Email',
          onPress: () => {
            Linking.openURL(`mailto:${donor.email}`).catch(() =>
              Alert.alert('Error', 'Unable to open email')
            );
          },
        },
      ]
    );
  };

  const handleRequestBlood = () => {
    Alert.alert(
      '🩸 Blood Request',
      `Your blood request has been sent to ${donor.name} (${donor.bloodGroup}).\n\nThey will be notified shortly and will contact you.`,
      [{ text: 'OK, Thanks!' }]
    );
  };

  const handleShare = () => {
    Alert.alert(
      '📤 Share Donor Info',
      `${donor.name}\nBlood Group: ${donor.bloodGroup}\nLocation: ${donor.location}\nPhone: ${donor.phone}`,
      [{ text: 'Close' }]
    );
  };

  const InfoRow = ({ icon, label, value, onPress }) => (
    <TouchableOpacity
      style={styles.infoRow}
      activeOpacity={onPress ? 0.6 : 1}
      onPress={onPress}
      disabled={!onPress}
    >
      <View style={styles.infoIconBg}>{icon}</View>
      <View style={styles.infoContent}>
        <Text style={styles.infoLabel}>{label}</Text>
        <Text style={[styles.infoValue, onPress && styles.infoValueLink]}>
          {value}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.primary} barStyle="light-content" />

      {/* Header Background */}
      <View style={styles.headerBg}>
        {/* Top Bar */}
        <View style={styles.topBar}>
          <TouchableOpacity
            style={styles.topBarBtn}
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
          >
            <ArrowLeft size={22} color={COLORS.white} />
          </TouchableOpacity>
          <Text style={styles.topBarTitle}>Donor Profile</Text>
          <TouchableOpacity
            style={styles.topBarBtn}
            onPress={handleShare}
            activeOpacity={0.7}
          >
            <Share2 size={20} color={COLORS.white} />
          </TouchableOpacity>
        </View>

        {/* Profile Section */}
        <View style={styles.profileSection}>
          <View style={styles.profileImageContainer}>
            <Image
              source={{ uri: donor.image }}
              style={styles.profileImage}
              defaultSource={require('../../../assets/blood-image-logo.jpg')}
            />
            {/* Availability Badge */}
            <View
              style={[
                styles.availBadge,
                {
                  backgroundColor: donor.available
                    ? COLORS.success
                    : COLORS.grey,
                },
              ]}
            />
          </View>
          <Text style={styles.profileName}>{donor.name}</Text>
          <View style={styles.profileSubRow}>
            <MapPin size={14} color="rgba(255,255,255,0.8)" />
            <Text style={styles.profileLocation}>{donor.location}</Text>
          </View>
        </View>

        {/* Blood Group Badge */}
        <View style={styles.bloodBadgeContainer}>
          <View style={styles.bloodBadge}>
            <Droplets size={18} color={COLORS.primary} />
            <Text style={styles.bloodBadgeText}>{donor.bloodGroup}</Text>
          </View>
        </View>
      </View>

      {/* Stat Cards */}
      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <View style={[styles.statIconBg, { backgroundColor: '#E3F2FD' }]}>
            <Award size={20} color="#1E88E5" />
          </View>
          <Text style={styles.statValue}>{donor.totalDonations}</Text>
          <Text style={styles.statLabel}>Donations</Text>
        </View>
        <View style={styles.statCard}>
          <View style={[styles.statIconBg, { backgroundColor: '#FFF3E0' }]}>
            <Clock size={20} color="#FB8C00" />
          </View>
          <Text style={styles.statValue}>{donor.lastDonation}</Text>
          <Text style={styles.statLabel}>Last Donated</Text>
        </View>
        <View style={styles.statCard}>
          <View style={[styles.statIconBg, { backgroundColor: '#E8F5E9' }]}>
            <User size={20} color={COLORS.success} />
          </View>
          <Text style={styles.statValue}>{donor.age} yrs</Text>
          <Text style={styles.statLabel}>Age</Text>
        </View>
      </View>

      {/* Scrollable Content */}
      <ScrollView
        style={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollInner}
      >
        {/* Info Section */}
        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>Contact Information</Text>

          <InfoRow
            icon={<Phone size={18} color={COLORS.primary} />}
            label="Phone Number"
            value={donor.phone}
            onPress={handleCall}
          />

          <InfoRow
            icon={<Mail size={18} color="#1E88E5" />}
            label="Email Address"
            value={donor.email}
            onPress={handleEmail}
          />

          <InfoRow
            icon={<MapPin size={18} color="#FB8C00" />}
            label="Location"
            value={donor.location}
          />
        </View>

        {/* Donation Info */}
        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>Donation Details</Text>

          <InfoRow
            icon={<Droplets size={18} color={COLORS.primary} />}
            label="Blood Group"
            value={donor.bloodGroup}
          />

          <InfoRow
            icon={<Calendar size={18} color="#7B1FA2" />}
            label="Last Donation"
            value={donor.lastDonation}
          />

          <InfoRow
            icon={<Heart size={18} color={COLORS.primary} />}
            label="Total Donations"
            value={`${donor.totalDonations} times`}
          />

          <InfoRow
            icon={<User size={18} color={COLORS.success} />}
            label="Age"
            value={`${donor.age} years old`}
          />
        </View>

        {/* Quick Action Buttons */}
        <View style={styles.quickActions}>
          <TouchableOpacity
            style={styles.actionBtnCall}
            activeOpacity={0.7}
            onPress={handleCall}
          >
            <Phone size={20} color={COLORS.white} />
            <Text style={styles.actionBtnCallText}>Call Now</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionBtnEmail}
            activeOpacity={0.7}
            onPress={handleEmail}
          >
            <Mail size={20} color={COLORS.primary} />
            <Text style={styles.actionBtnEmailText}>Email</Text>
          </TouchableOpacity>
        </View>

        {/* Request Blood Button */}
        <TouchableOpacity
          style={styles.requestButton}
          activeOpacity={0.8}
          onPress={handleRequestBlood}
        >
          <Droplets size={22} color={COLORS.white} />
          <Text style={styles.requestButtonText}>Request Blood</Text>
        </TouchableOpacity>

        <View style={{ height: 30 }} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  // Header
  headerBg: {
    backgroundColor: COLORS.primary,
    paddingTop: 50,
    paddingBottom: 40,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  topBarBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  topBarTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: COLORS.white,
  },

  // Profile
  profileSection: {
    alignItems: 'center',
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: 14,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: 'rgba(255,255,255,0.4)',
    backgroundColor: COLORS.lightGrey,
  },
  availBadge: {
    width: 20,
    height: 20,
    borderRadius: 10,
    position: 'absolute',
    bottom: 4,
    right: 4,
    borderWidth: 3,
    borderColor: COLORS.primary,
  },
  profileName: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.white,
    marginBottom: 6,
  },
  profileSubRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  profileLocation: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
  },

  // Blood Badge
  bloodBadgeContainer: {
    alignItems: 'center',
    marginTop: 16,
  },
  bloodBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 24,
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  bloodBadgeText: {
    fontSize: 20,
    fontWeight: '900',
    color: COLORS.primary,
  },

  // Stats
  statsRow: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginTop: -20,
    gap: 10,
  },
  statCard: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: 14,
    padding: 14,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 3,
  },
  statIconBg: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.text,
    textAlign: 'center',
  },
  statLabel: {
    fontSize: 10,
    color: COLORS.grey,
    marginTop: 2,
    fontWeight: '600',
  },

  // Scroll
  scrollContent: {
    flex: 1,
  },
  scrollInner: {
    padding: 16,
    paddingTop: 20,
  },

  // Info Section
  infoSection: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 18,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.text,
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  infoIconBg: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: COLORS.lightGrey,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 11,
    color: COLORS.grey,
    fontWeight: '600',
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.text,
  },
  infoValueLink: {
    color: COLORS.primary,
  },

  // Quick Actions
  quickActions: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  actionBtnCall: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.success,
    paddingVertical: 14,
    borderRadius: 14,
    gap: 8,
    shadowColor: COLORS.success,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  actionBtnCallText: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.white,
  },
  actionBtnEmail: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
    paddingVertical: 14,
    borderRadius: 14,
    gap: 8,
    borderWidth: 1.5,
    borderColor: COLORS.primary,
  },
  actionBtnEmailText: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.primary,
  },

  // Request Button
  requestButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    paddingVertical: 18,
    borderRadius: 16,
    gap: 10,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 8,
  },
  requestButtonText: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.white,
  },
});

export default DonorDetail;
