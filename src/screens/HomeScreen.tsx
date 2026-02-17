import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, FONTS, FONT_SIZES, SPACING } from '../constants/theme';

export default function HomeScreen(): React.JSX.Element {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>Today</Text>
            <Text style={styles.timer}>8:00</Text>
            <Text style={styles.subtitle}>until bedtime</Text>
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
    label: {
        fontFamily: FONTS.body,
        fontSize: FONT_SIZES.lg,
        color: COLORS.textSecondary,
        marginBottom: SPACING.sm,
    },
    timer: {
        fontFamily: FONTS.heading,
        fontSize: FONT_SIZES.hero,
        color: COLORS.deepIndigo,
        marginBottom: SPACING.xs,
    },
    subtitle: {
        fontFamily: FONTS.body,
        fontSize: FONT_SIZES.md,
        color: COLORS.textSecondary,
    },
});
