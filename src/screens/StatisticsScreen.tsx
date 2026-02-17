import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, FONTS, FONT_SIZES, SPACING } from '../constants/theme';

export default function StatisticsScreen(): React.JSX.Element {
    return (
        <View style={styles.container}>
            <Text style={styles.icon}>📊</Text>
            <Text style={styles.title}>Your Progress</Text>
            <Text style={styles.subtitle}>Track your sleep journey</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.cream,
        justifyContent: 'center',
        alignItems: 'center',
        padding: SPACING.xl,
    },
    icon: {
        fontSize: 64,
        marginBottom: SPACING.lg,
    },
    title: {
        fontFamily: FONTS.heading,
        fontSize: FONT_SIZES.xxl,
        color: COLORS.deepIndigo,
        marginBottom: SPACING.sm,
    },
    subtitle: {
        fontFamily: FONTS.body,
        fontSize: FONT_SIZES.md,
        color: COLORS.textSecondary,
    },
});
