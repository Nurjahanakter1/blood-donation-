// Home Screen - Blood Donation App
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import {
  Search,
  Bell,
  AlertTriangle,
  MapPin,
  Heart,
  Droplets,
  Syringe,
  ClipboardList,
  UserSearch,
  HandHeart,
  CircleUser,
} from 'lucide-react-native';
import COLORS from '../styles/colors';

// ─── Static Data ─────────────────────────────────────────────────
const QUICK_ACTIONS = [
  { id: '1', title: 'Find Donor', Icon: UserSearch, color: '#E53935' },
  { id: '2', title: 'Request Blood', Icon: Droplets, color: '#1E88E5' },
  { id: '3', title: 'Donate Now', Icon: HandHeart, color: '#43A047' },
  { id: '4', title: 'History', Icon: ClipboardList, color: '#FB8C00' },
];

const STATIC_DONORS = [
  {
    id: '1',
    name: 'Hasan Khan',
    bloodGroup: 'A+',
    location: 'Cumila Bangladesh',
    lastDonated: '2 months ago',
    avatar: '👨',
    available: true,
  },
  {
    id: '2',
    name: 'Umme Hani ',
    bloodGroup: 'O+',
    location: 'Nokhali Bangladesh',
    lastDonated: '1 month ago',
    avatar: '👩',
    available: true,
  },
  {
    id: '3',
    name: 'Rahat Chowdhury',
    bloodGroup: 'B+',
    location: 'khulan Bangladesh',
    lastDonated: '3 months ago',
    avatar: '👨',
    available: false,
  },
  {
    id: '4',
    name: 'Nusrat Jahan',
    bloodGroup: 'AB-',
    location: 'Chittogong Bangladesh',
    lastDonated: '2 weeks ago',
    avatar: '👩',
    available: true,
  },
  {
    id: '5',
    name: 'Reshima Akter',
    bloodGroup: 'O-',
    location: 'Narayanganj Bangladesh',
    lastDonated: '6 months ago',
    avatar: '👨',
    available: true,
  },
];

const BLOOD_STATS = [
  { type: 'A+', units: 24 },
  { type: 'B+', units: 18 },
  { type: 'O+', units: 32 },
  { type: 'AB+', units: 8 },
  { type: 'A-', units: 12 },
  { type: 'B-', units: 6 },
  { type: 'O-', units: 15 },
  { type: 'AB-', units: 4 },
];

// ─── Sub-Components ──────────────────────────────────────────────
const QuickActionCard = ({ item, onPress }) => (
  <TouchableOpacity style={styles.actionCard} activeOpacity={0.7} onPress={onPress}>
    <View style={[styles.actionIconBg, { backgroundColor: item.color + '15' }]}>
      <item.Icon size={26} color={item.color} />
    </View>
    <Text style={styles.actionTitle}>{item.title}</Text>
  </TouchableOpacity>
);

const BloodStatBadge = ({ item }) => (
  <View style={styles.statBadge}>
    <Text style={styles.statType}>{item.type}</Text>
    <Text style={styles.statUnits}>{item.units}</Text>
    <Text style={styles.statLabel}>units</Text>
  </View>
);

const DonorCard = ({ donor }) => (
  <TouchableOpacity style={styles.donorCard} activeOpacity={0.7}>
    <View style={styles.donorLeft}>
      <View style={styles.avatarCircle}>
        <CircleUser size={28} color={COLORS.primary} />
      </View>
      <View style={styles.donorInfo}>
        <Text style={styles.donorName}>{donor.name}</Text>
        <View style={styles.locationRow}>
          <MapPin size={12} color={COLORS.grey} />
          <Text style={styles.donorLocation}>{donor.location}</Text>
        </View>
        <Text style={styles.donorDonated}>Last donated: {donor.lastDonated}</Text>
      </View>
    </View>
    <View style={styles.donorRight}>
      <View style={styles.bloodBadge}>
        <Text style={styles.bloodBadgeText}>{donor.bloodGroup}</Text>
      </View>
      <View
        style={[
          styles.statusDot,
          { backgroundColor: donor.available ? COLORS.success : COLORS.grey },
        ]}
      />
      <Text style={[styles.statusText, { color: donor.available ? COLORS.success : COLORS.grey }]}>
        {donor.available ? 'Available' : 'Unavailable'}
      </Text>
    </View>
  </TouchableOpacity>
);

// ─── Home Screen ─────────────────────────────────────────────────
const HomeScreen = ({ navigation }) => {
  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View>
            <Text style={styles.greeting}>Hello, Donor! 👋</Text>
            <Text style={styles.greetingSub}>Ready to save a life today?</Text>
          </View>
          <TouchableOpacity style={styles.notificationBtn}>
            <Bell size={22} color={COLORS.white} />
            <View style={styles.notifBadge} />
          </TouchableOpacity>
        </View>

        {/* Search Bar (UI only) */}
        <TouchableOpacity style={styles.searchBar} activeOpacity={0.8}>
          <Search size={18} color="rgba(255,255,255,0.7)" />
          <Text style={styles.searchPlaceholder}>Search blood group, city...</Text>
        </TouchableOpacity>
      </View>

      {/* Emergency Banner */}
      <TouchableOpacity style={styles.emergencyBanner} activeOpacity={0.8} onPress={() => navigation.navigate('DonorList')}>
        <View style={styles.emergencyLeft}>
          <View style={styles.emergencyIconBg}>
            <AlertTriangle size={24} color="#E65100" />
          </View>
          <View>
            <Text style={styles.emergencyTitle}>Emergency?</Text>
            <Text style={styles.emergencySubtitle}>
              Find blood donors instantly
            </Text>
          </View>
        </View>
        <View style={styles.emergencyButton}>
          <Text style={styles.emergencyButtonText}>SOS</Text>
        </View>
      </TouchableOpacity>

      {/* Quick Actions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          {QUICK_ACTIONS.map((item) => (
            <QuickActionCard
              key={item.id}
              item={item}
              onPress={() => {
                if (item.title === 'Find Donor') {
                  navigation.navigate('DonorList');
                }
              }}
            />
          ))}
        </View>
      </View>

      {/* Blood Availability */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Blood Availability</Text>
          <TouchableOpacity>
            <Text style={styles.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.statsRow}
        >
          {BLOOD_STATS.map((item) => (
            <BloodStatBadge key={item.type} item={item} />
          ))}
        </ScrollView>
      </View>

      {/* Find Donor Card */}
      <View style={styles.section}>
        <TouchableOpacity style={styles.findDonorCard} activeOpacity={0.8} onPress={() => navigation.navigate('DonorList')}>
          <View style={styles.findDonorContent}>
            <Text style={styles.findDonorTitle}>Find a Donor</Text>
            <Text style={styles.findDonorDesc}>
              Search from thousands of registered blood donors near you
            </Text>
            <View style={styles.findDonorBtn}>
              <Text style={styles.findDonorBtnText}>Search Now →</Text>
            </View>
          </View>
          <Image
            source={require('../../assets/home/doctor.jpg')}
            style={styles.cardImage}
            resizeMode="cover"
          />
        </TouchableOpacity>
      </View>

      {/* Request Blood Card */}
      <View style={styles.section}>
        <TouchableOpacity style={styles.requestCard} activeOpacity={0.8}>
          <View style={styles.requestContent}>
            <Text style={styles.requestTitle}>Request Blood</Text>
            <Text style={styles.requestDesc}>
              Create a blood request and notify nearby donors
            </Text>
            <View style={styles.requestBtn}>
              <Text style={styles.requestBtnText}>Request Now →</Text>
            </View>
          </View>
          <Image
            source={require('../../assets/home/mans.jpg')}
            style={styles.cardImage}
            resizeMode="cover"
          />
        </TouchableOpacity>
      </View>

      {/* Nearby Donors */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Nearby Donors</Text>
          <TouchableOpacity onPress={() => navigation.navigate('DonorList')}>
            <Text style={styles.seeAll}>View All</Text>
          </TouchableOpacity>
        </View>
        {STATIC_DONORS.map((donor) => (
          <DonorCard key={donor.id} donor={donor} />
        ))}
      </View>

      {/* Bottom Spacing */}
      <View style={{ height: 30 }} />
    </ScrollView>
  );
};

// ─── Styles ──────────────────────────────────────────────────────
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  // Header
  header: {
    backgroundColor: COLORS.primary,
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 24,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 18,
  },
  greeting: {
    fontSize: 24,
    fontWeight: '800',
    color: COLORS.white,
  },
  greetingSub: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 4,
  },
  notificationBtn: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  notifBadge: {
    position: 'absolute',
    top: 10,
    right: 12,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FFD600',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 10,
  },
  searchPlaceholder: {
    fontSize: 15,
    color: 'rgba(255,255,255,0.7)',
  },

  // Emergency Banner
  emergencyBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFF3E0',
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: '#FFE0B2',
  },
  emergencyLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  emergencyIconBg: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#FFE0B2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emergencyTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#E65100',
  },
  emergencySubtitle: {
    fontSize: 12,
    color: '#BF360C',
    marginTop: 2,
  },
  emergencyButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  emergencyButtonText: {
    color: COLORS.white,
    fontWeight: '800',
    fontSize: 15,
    letterSpacing: 1,
  },

  // Sections
  section: {
    marginTop: 20,
    paddingHorizontal: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 14,
  },
  seeAll: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: '600',
    marginBottom: 14,
  },

  // Quick Actions
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  actionCard: {
    width: '47%',
    backgroundColor: COLORS.white,
    borderRadius: 14,
    padding: 18,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  actionIconBg: {
    width: 50,
    height: 50,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  actionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
  },

  // Blood Stats
  statsRow: {
    gap: 10,
    paddingRight: 16,
  },
  statBadge: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
    minWidth: 70,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  statType: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.primary,
  },
  statUnits: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.text,
    marginTop: 4,
  },
  statLabel: {
    fontSize: 11,
    color: COLORS.grey,
    marginTop: 2,
  },

  // Find Donor Card
  findDonorCard: {
    backgroundColor: COLORS.primary,
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
  },
  findDonorContent: {
    flex: 1,
  },
  findDonorTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.white,
    marginBottom: 6,
  },
  findDonorDesc: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.85)',
    lineHeight: 19,
    marginBottom: 14,
  },
  findDonorBtn: {
    backgroundColor: 'rgba(255,255,255,0.25)',
    alignSelf: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  findDonorBtnText: {
    color: COLORS.white,
    fontWeight: '700',
    fontSize: 13,
  },
  cardImage: {
    width: 90,
    height: 90,
    borderRadius: 12,
    marginLeft: 12,
  },

  // Request Blood Card
  requestCard: {
    backgroundColor: '#1E88E5',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
  },
  requestContent: {
    flex: 1,
  },
  requestTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.white,
    marginBottom: 6,
  },
  requestDesc: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.85)',
    lineHeight: 19,
    marginBottom: 14,
  },
  requestBtn: {
    backgroundColor: 'rgba(255,255,255,0.25)',
    alignSelf: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  requestBtnText: {
    color: COLORS.white,
    fontWeight: '700',
    fontSize: 13,
  },

  // Donor Card
  donorCard: {
    backgroundColor: COLORS.white,
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  donorLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 12,
  },
  avatarCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  donorInfo: {
    flex: 1,
  },
  donorName: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 3,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 2,
  },
  donorLocation: {
    fontSize: 12,
    color: COLORS.grey,
  },
  donorDonated: {
    fontSize: 11,
    color: COLORS.grey,
  },
  donorRight: {
    alignItems: 'center',
    gap: 4,
  },
  bloodBadge: {
    backgroundColor: COLORS.primaryLight,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginBottom: 4,
  },
  bloodBadgeText: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.primary,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '600',
  },
});

export default HomeScreen;
