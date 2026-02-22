// Donor List Screen - Blood Donation App
import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Alert,
} from 'react-native';
import { Search, ArrowLeft, SlidersHorizontal, Droplets } from 'lucide-react-native';
import DonorCard from '../../components/DonorCard';
import { DONORS, BLOOD_GROUPS } from '../../data';
import COLORS from '../../styles/colors';
import styles from '../../styles/donorListStyles';

const DonorList = ({ navigation }) => {
  const [searchText, setSearchText] = useState('');
  const [selectedGroup, setSelectedGroup] = useState('All');

  const filteredDonors = useMemo(() => {
    let result = DONORS;

    if (selectedGroup !== 'All') {
      result = result.filter((d) => d.bloodGroup === selectedGroup);
    }

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
      `Your blood request has been sent to ${donor.name} (${donor.bloodGroup}). They will be notified shortly.`,
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

export default DonorList;
