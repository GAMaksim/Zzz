import React, { useEffect, useState } from 'react';
import { StatusBar, View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { initDatabase, getUserSettings } from './src/services/database';
import AppNavigator from './src/navigation/AppNavigator';
import { COLORS, FONTS, FONT_SIZES } from './src/constants/theme';

export default function App(): React.JSX.Element {
  const [isLoading, setIsLoading] = useState(true);
  const [onboardingCompleted, setOnboardingCompleted] = useState(false);

  useEffect(() => {
    async function init() {
      try {
        await initDatabase();
        const settings = getUserSettings();
        if (settings) {
          setOnboardingCompleted(settings.onboardingCompleted);
        }
      } catch (error) {
        console.error('Failed to initialize database:', error);
      } finally {
        setIsLoading(false);
      }
    }

    init();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor={COLORS.cream}
        />
        <Text style={styles.loadingIcon}>🌙</Text>
        <Text style={styles.loadingTitle}>Zzz</Text>
        <ActivityIndicator
          size="small"
          color={COLORS.softMauve}
          style={styles.spinner}
        />
      </View>
    );
  }

  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={COLORS.cream}
      />
      <AppNavigator onboardingCompleted={onboardingCompleted} />
    </>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: COLORS.cream,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  loadingTitle: {
    fontFamily: FONTS.heading,
    fontSize: FONT_SIZES.xxxl,
    color: COLORS.deepIndigo,
    marginBottom: 24,
  },
  spinner: {
    marginTop: 8,
  },
});
