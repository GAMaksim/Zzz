import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, Text } from 'react-native';

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

const TAB_ICONS: Record<string, string> = {
    Home: '🌙',
    Soundscapes: '🎵',
    Statistics: '📊',
    Settings: '⚙️',
};

function TabIcon({ label, focused }: { label: string; focused: boolean }) {
    return (
        <Text style={focused ? styles.tabIconFocused : styles.tabIcon}>
            {TAB_ICONS[label] ?? '•'}
        </Text>
    );
}

function HomeTabIcon({ focused }: { focused: boolean }) {
    return <TabIcon label="Home" focused={focused} />;
}
function SoundscapesTabIcon({ focused }: { focused: boolean }) {
    return <TabIcon label="Soundscapes" focused={focused} />;
}
function StatisticsTabIcon({ focused }: { focused: boolean }) {
    return <TabIcon label="Statistics" focused={focused} />;
}
function SettingsTabIcon({ focused }: { focused: boolean }) {
    return <TabIcon label="Settings" focused={focused} />;
}

function MainTabs(): React.JSX.Element {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarStyle: styles.tabBar,
                tabBarLabelStyle: styles.tabBarLabel,
                tabBarActiveTintColor: COLORS.deepIndigo,
                tabBarInactiveTintColor: COLORS.textSecondary,
            }}>
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{ tabBarIcon: HomeTabIcon }}
            />
            <Tab.Screen
                name="Soundscapes"
                component={SoundscapesScreen}
                options={{ tabBarIcon: SoundscapesTabIcon }}
            />
            <Tab.Screen
                name="Statistics"
                component={StatisticsScreen}
                options={{ tabBarIcon: StatisticsTabIcon }}
            />
            <Tab.Screen
                name="Settings"
                component={SettingsScreen}
                options={{ tabBarIcon: SettingsTabIcon }}
            />
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

const styles = StyleSheet.create({
    tabBar: {
        backgroundColor: COLORS.cream,
        borderTopColor: COLORS.whisperGray,
        height: 60,
        paddingBottom: 8,
    },
    tabBarLabel: {
        fontFamily: FONTS.body,
        fontSize: FONT_SIZES.xs,
        color: COLORS.textSecondary,
    },
    tabIcon: {
        fontSize: 20,
        opacity: 0.5,
    },
    tabIconFocused: {
        fontSize: 24,
        opacity: 1,
    },
});
