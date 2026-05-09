import { Appearance, Platform, useColorScheme } from 'react-native';

export function useThemeColorScheme() {
    return (
        Platform.OS === "web" ? Appearance.getColorScheme() : useColorScheme()
    );
}