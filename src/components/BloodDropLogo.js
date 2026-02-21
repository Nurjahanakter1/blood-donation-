// Blood Drop Logo Component (SVG-like using RN views)
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import COLORS from '../styles/colors';

const BloodDropLogo = ({ size = 100 }) => {
  const scale = size / 100;

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.dropOuter,
          {
            width: 70 * scale,
            height: 90 * scale,
            borderRadius: 35 * scale,
            borderTopLeftRadius: 0,
          },
        ]}
      >
        <View
          style={[
            styles.dropInner,
            {
              width: 30 * scale,
              height: 30 * scale,
              borderRadius: 15 * scale,
            },
          ]}
        />
        <Text
          style={[
            styles.plusSign,
            { fontSize: 22 * scale },
          ]}
        >
          +
        </Text>
      </View>
      <Text style={[styles.appName, { fontSize: 22 * scale }]}>
        Blood<Text style={styles.appNameBold}>Bank</Text>
      </Text>
      <Text style={[styles.tagline, { fontSize: 11 * scale }]}>
        Donate Blood, Save Lives
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 32,
  },
  dropOuter: {
    backgroundColor: COLORS.primary,
    transform: [{ rotate: '45deg' }],
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 8,
  },
  dropInner: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    position: 'absolute',
    top: '20%',
    left: '25%',
  },
  plusSign: {
    color: COLORS.white,
    fontWeight: '800',
    transform: [{ rotate: '-45deg' }],
  },
  appName: {
    color: COLORS.text,
    fontWeight: '400',
    letterSpacing: 1,
  },
  appNameBold: {
    fontWeight: '800',
    color: COLORS.primary,
  },
  tagline: {
    color: COLORS.grey,
    marginTop: 4,
    letterSpacing: 0.5,
  },
});

export default BloodDropLogo;
