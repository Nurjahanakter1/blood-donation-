// Home Screen - Blood Donation App
import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Image,
  Alert,
} from 'react-native';
import {
  Search,
  Bell,
  AlertTriangle,
  MapPin,
  Droplets,
  CircleUser,
  LogOut,
} from 'lucide-react-native';
import COLORS from '../../styles/colors';
import styles from '../../styles/homeStyles';
import { QUICK_ACTIONS, STATIC_DONORS, BLOOD_STATS } from '../../data';

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

const NearbyDonorCard = ({ donor }) => (
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
const Home = ({ navigation }) => {
  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => navigation.reset({ index: 0, routes: [{ name: 'Login' }] }),
        },
      ]
    );
  };

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
          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.notificationBtn}>
              <Bell size={22} color={COLORS.white} />
              <View style={styles.notifBadge} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
              <LogOut size={22} color={COLORS.white} />
            </TouchableOpacity>
          </View>
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
            source={require('../../../assets/home/doctor.jpg')}
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
            source={require('../../../assets/home/mans.jpg')}
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
          <NearbyDonorCard key={donor.id} donor={donor} />
        ))}
      </View>

      {/* Bottom Spacing */}
      <View style={{ height: 30 }} />
    </ScrollView>
  );
};

export default Home;
