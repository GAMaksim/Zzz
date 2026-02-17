import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';

import { RootStackParamList, MainTabParamList } from '../types';
import { COLORS, FONTS, FONT_SIZES } from '../constants/theme';

// Screens
import OnboardingScreen from '../screens/OnboardingScreen';
import ScheduleSetupScreen from '../screens/ScheduleSetupScreen';
import HomeScreen from '../screens/HomeScreen';
import SoundscapesScreen from '../screens/SoundscapesScreen';
import StatisticsScreen from '../screens/StatisticsScreen';
import SettingsScreen from '../screens/SettingsScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

function TabIcon({ label, focused }: { label: string; focused: boolean }) {
    const icons: Record<string, string> = {
        Home: '🌙',
        Soundscapes: '🎵',
        Statistics: '📊',
        Settings: '⚙️',
    };
    return (
        <Text style={{ fontSize: focused ? 24 : 20, opacity: focused ? 1 : 0.5 }}>
            {icons[label] ?? '•'}
        </Text>
    );
}

function MainTabs(): React.JSX.Element {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: COLORS.cream,
                    borderTopColor: COLORS.whisperGray,
                    height: 60,
                    paddingBottom: 8,
                },
                tabBarLabelStyle: {
                    fontFamily: FONTS.body,
                    fontSize: FONT_SIZES.xs,
                    color: COLORS.textSecondary,
                },
                tabBarActiveTintColor: COLORS.deepIndigo,
                tabBarInactiveTintColor: COLORS.textSecondary,
                tabBarIcon: ({ focused }) => (
                    <TabIcon label={route.name} focused={focused} />
                ),
            })}>
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Soundscapes" component={SoundscapesScreen} />
            <Tab.Screen name="Statistics" component={StatisticsScreen} />
            <Tab.Screen name="Settings" component={SettingsScreen} />
        </Tab.Navigator>
    );
}

interface AppNavigatorProps {
    onboardingCompleted: boolean;
}

export default function AppNavigator({
    onboardingCompleted,
}: AppNavigatorProps): React.JSX.Element {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{ headerShown: false }}
                initialRouteName={onboardingCompleted ? 'MainTabs' : 'Onboarding'}>
                <Stack.Screen name="Onboarding" component={OnboardingScreen} />
                <Stack.Screen name="ScheduleSetup" component={ScheduleSetupScreen} />
                <Stack.Screen name="MainTabs" component={MainTabs} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
