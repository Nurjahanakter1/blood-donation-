// Donor Detail Screen - Blood Donation App
import React from 'react';
import {
  View,
  Text,
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
import styles from '../../styles/donorDetailStyles';

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
      `Your blood request has been sent to ${donor.name} (${donor.bloodGroup}). They will be notified shortly.`,
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
        {/* Contact Info */}
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

export default DonorDetail;
