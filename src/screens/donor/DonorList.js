// Donor List Screen - Blood Donation App
import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Alert,
} from 'react-native';
import { Search, ArrowLeft, SlidersHorizontal, Droplets } from 'lucide-react-native';
import DonorCard from '../../components/DonorCard';
import DONORS, { BLOOD_GROUPS } from '../../data/donor/donors';
import COLORS from '../../styles/colors';

const DonorList = ({ navigation }) => {
  const [searchText, setSearchText] = useState('');
  const [selectedGroup, setSelectedGroup] = useState('All');

  // Filter donors based on search and blood group
  const filteredDonors = useMemo(() => {
    let result = DONORS;

    // Filter by blood group
    if (selectedGroup !== 'All') {
      result = result.filter((d) => d.bloodGroup === selectedGroup);
    }

    // Filter by search text
    if (searchText.trim()) {
      const query = searchText.toLowerCase().trim();
      result = result.filter(
        (d) =>
          d.name.toLowerCase().includes(query) ||
          d.location.toLowerCase().includes(query) ||
          d.bloodGroup.toLowerCase().includes(query) ||
          d.phone.includes(query)
      );
    }

    return result;
  }, [searchText, selectedGroup]);

  const handleCall = (donor) => {
    Alert.alert(
      '📞 Call Donor',
      `Do you want to call ${donor.name}?\n\nPhone: ${donor.phone}`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Call Now', onPress: () => Alert.alert('Calling...', donor.phone) },
      ]
    );
  };

  const handleRequest = (donor) => {
    Alert.alert(
      '🩸 Blood Request Sent!',
      `Your blood request has been sent to ${donor.name} (${donor.bloodGroup}).\n\nThey will be notified shortly.`,
      [{ text: 'OK' }]
    );
  };

  const renderDonorItem = ({ item }) => (
    <DonorCard
      donor={item}
      onPress={() => navigation.navigate('DonorDetail', { donor: item })}
      onCall={() => handleCall(item)}
      onRequest={() => handleRequest(item)}
    />
  );

  const renderEmptyList = () => (
    <View style={styles.emptyContainer}>
      <Droplets size={60} color={COLORS.mediumGrey} />
      <Text style={styles.emptyTitle}>No Donors Found</Text>
      <Text style={styles.emptySubtitle}>
        Try adjusting your search or filter criteria
      </Text>
    </View>
  );

  const renderHeader = () => (
    <>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchInputWrapper}>
          <Search size={18} color={COLORS.grey} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search by name, location, blood group..."
            placeholderTextColor={COLORS.grey}
            value={searchText}
            onChangeText={setSearchText}
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>
        <TouchableOpacity style={styles.filterBtn} activeOpacity={0.7}>
          <SlidersHorizontal size={20} color={COLORS.white} />
        </TouchableOpacity>
      </View>

      {/* Blood Group Filter */}
      <View style={styles.filterSection}>
        <FlatList
          horizontal
          data={BLOOD_GROUPS}
          keyExtractor={(item) => item}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterList}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.filterChip,
                selectedGroup === item && styles.filterChipActive,
              ]}
              activeOpacity={0.7}
              onPress={() => setSelectedGroup(item)}
            >
              <Text
                style={[
                  styles.filterChipText,
                  selectedGroup === item && styles.filterChipTextActive,
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>

      {/* Results Count */}
      <View style={styles.resultsRow}>
        <Text style={styles.resultsText}>
          {filteredDonors.length} donor{filteredDonors.length !== 1 ? 's' : ''} found
        </Text>
        {selectedGroup !== 'All' && (
          <TouchableOpacity onPress={() => setSelectedGroup('All')}>
            <Text style={styles.clearFilter}>Clear Filter</Text>
          </TouchableOpacity>
        )}
      </View>
    </>
  );

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.primary} barStyle="light-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <ArrowLeft size={22} color={COLORS.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Available Donors</Text>
        <View style={styles.headerBadge}>
          <Text style={styles.headerBadgeText}>{DONORS.length}</Text>
        </View>
      </View>

      {/* Donor List */}
      <FlatList
        data={filteredDonors}
        keyExtractor={(item) => item.id}
        renderItem={renderDonorItem}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderEmptyList}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  // Header
  header: {
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 50,
    paddingBottom: 18,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  headerTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.white,
  },
  headerBadge: {
    backgroundColor: 'rgba(255,255,255,0.25)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  headerBadgeText: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.white,
  },

  // Search
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
    gap: 10,
  },
  searchInputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 12,
    paddingHorizontal: 14,
    height: 48,
    borderWidth: 1,
    borderColor: '#EEEEEE',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
    gap: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: COLORS.text,
    paddingVertical: 0,
  },
  filterBtn: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },

  // Blood Group Filter
  filterSection: {
    marginBottom: 12,
  },
  filterList: {
    gap: 8,
  },
  filterChip: {
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: COLORS.white,
    borderWidth: 1.5,
    borderColor: '#EEEEEE',
  },
  filterChipActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  filterChipText: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.grey,
  },
  filterChipTextActive: {
    color: COLORS.white,
  },

  // Results
  resultsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  resultsText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.grey,
  },
  clearFilter: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.primary,
  },

  // List
  listContent: {
    padding: 16,
    paddingTop: 16,
  },

  // Empty State
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 60,
    paddingHorizontal: 32,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.text,
    marginTop: 16,
  },
  emptySubtitle: {
    fontSize: 14,
    color: COLORS.grey,
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 20,
  },
});

export default DonorList;
