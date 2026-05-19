import { CityItem } from "@/components/CityItem";
import { Colors } from "@/constants/theme";
import { cities } from "@/data/cities";
import { useThemeColorScheme } from "@/hooks/use-color-scheme";
import { useFavoritesStore } from "@/store/favorites";
import { FontAwesome6 } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import Animated, { useAnimatedScrollHandler, useSharedValue } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Liked() {
    const { top, bottom } = useSafeAreaInsets();

    const favorites = useFavoritesStore((state) => state.favoritesIds);

    const scheme = useThemeColorScheme();
    const theme = Colors[scheme ?? "light"];

    const scrollY = useSharedValue(0);

    const onScroll = useAnimatedScrollHandler({
        onScroll: (event) => {
            scrollY.value = event.contentOffset.y;
        },
    });

    const favoritedCities = cities.filter((city) => favorites.includes(city.id));

    if (favorites.length === 0) {
        return (
            <View style={[styles.container, { backgroundColor: theme.background, paddingTop: top }]}>
                <Text style={[styles.title, { color: theme.text }]}>Seus favoritos</Text>
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center", gap: 12 }}>
                    <Text style={[styles.subtitle, { color: theme.inactiveText }]}>Nenhum favorito adicionado ainda.</Text>
                    <FontAwesome6 name="face-frown" size={32} color={theme.inactiveText} />
                </View>
            </View>
        );
    }
    return (
        <View style={[styles.container, { backgroundColor: theme.background, paddingTop: top }]}>
            <Text style={[styles.title, { color: theme.text }]}>Seus favoritos</Text>
            <Animated.FlatList
                data={favoritedCities}
                onScroll={onScroll}
                scrollEventThrottle={16}
                renderItem={({ item, index }) => {
                    return (
                        <CityItem
                            city={item}
                            index={index}
                            scrollY={scrollY} />
                    );
                }}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
        flex: 1,
    },
    title: {
        fontSize: 24,
        fontWeight: 500,
        paddingVertical: 8,
    },
    subtitle: {
        fontSize: 16,
        fontWeight: 400,
    }
})