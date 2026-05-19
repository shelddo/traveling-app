import { Colors } from "@/constants/theme";
import { City } from "@/data/types";
import { useThemeColorScheme } from "@/hooks/use-color-scheme";
import { FontAwesome6 } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Dimensions, Image, Pressable, StyleSheet, Text, View } from "react-native";
import Animated, { Extrapolation, interpolate, SharedValue, useAnimatedStyle, useSharedValue, withSequence, withTiming } from "react-native-reanimated";

type CityItemProps = {
    city: City;
    index: number;
    scrollY: SharedValue<number>;
}

const { width } = Dimensions.get("window");
export function CityItem({ city, index, scrollY }: CityItemProps) {

    const router = useRouter();
    const isFeatured = city.categories.some((cat) => cat.id === "star");
    const [isFavorited, setIsFavorited] = useState(false);

    const cardClickScale = useSharedValue(1);
    const animatedCardClickStyle = useAnimatedStyle(() => {
        return {
            transform: [{
                scale: withTiming(cardClickScale.value, {
                    duration: 200,
                })
            }]
        }
    })

    const heartScale = useSharedValue(1);
    const animatedHeartStyle = useAnimatedStyle(() => {
        return {
            transform: [{
                scale: heartScale.value,
            }]
        }
    })

    const CARD_HEIGHT = 200;
    const CARD_MARGIN = 16;
    const ITEM_SIZE = CARD_HEIGHT + CARD_MARGIN;

    const animatedStyle = useAnimatedStyle(() => {
        const position = index * ITEM_SIZE;

        const scale = interpolate(
            scrollY.value,
            [
                position - CARD_HEIGHT,
                position,
                position + CARD_HEIGHT,
            ],
            [0.9, 1, 0.9],
            Extrapolation.CLAMP
        )

        const opacity = interpolate(
            scrollY.value,
            [
                position - CARD_HEIGHT,
                position,
                position + CARD_HEIGHT,
            ],
            [0.5, 1, 0.5],
            Extrapolation.CLAMP
        );

        return {
            transform: [{ scale }],
            opacity,
        };
    })

    const scheme = useThemeColorScheme();
    const theme = Colors[scheme ?? "light"];

    return (
        <Animated.View style={animatedStyle}>
            <Pressable
                onPress={() => {
                    router.navigate({
                        pathname: "/city/[id]",
                        params: { id: city.id },
                    });
                }}
                onPressIn={() => {
                    cardClickScale.value = 0.97;
                }}
                onPressOut={() => {
                    cardClickScale.value = 1;
                }}
            >
                <Animated.View style={[style.card, animatedCardClickStyle]}>
                    <Image source={city.coverImage} style={{ height: "100%", width: width - 32 }} resizeMode="cover" />
                    <LinearGradient
                        colors={[
                            "transparent",
                            "rgba(0,0,0,0.15)",
                            "rgba(0,0,0,0.85)"
                        ]}
                        style={style.gradient}
                    />
                    {/* start badge */}
                    {isFeatured && (
                        <View style={[style.badge, { backgroundColor: theme.secondary }]}>
                            <FontAwesome6 name="star" size={16} color="#FFD700" solid />
                            <Text style={[style.badgeText, { color: theme.inactiveText }]}>Destaque</Text>
                        </View>
                    )}
                    {/* end badge */}
                    {/* start like */}
                    <View style={style.heart}>
                        <Animated.View style={[
                            animatedHeartStyle,
                            { padding: 10, },
                        ]}>
                            <Pressable
                                hitSlop={10}
                                onPress={(e) => {
                                    e.stopPropagation();
                                    setIsFavorited((prev) => !prev);
                                    heartScale.value = withSequence(
                                        withTiming(1.3, { duration: 120 }),
                                        withTiming(1, { duration: 120 })
                                    )
                                    /* fazer algo p favoritar */
                                }}
                            >
                                <FontAwesome6 name="heart" size={20} color={isFavorited ? "#ff3939" : "#fff"} solid={isFavorited} />
                            </Pressable>
                        </Animated.View>
                    </View>
                    {/* end like */}
                    <Text style={style.title}>{city.name}</Text>
                    <Text style={style.description}>{city.country}</Text>
                </Animated.View>
            </Pressable>
        </Animated.View>
    )
}

const style = StyleSheet.create({
    card: {
        alignItems: "center",
        height: 200,
        width: width - 32,
        borderRadius: 15,
        overflow: "hidden",
        marginBottom: 16,
    },
    gradient: {
        position: "absolute",
        bottom: 0,
        width: width - 32,
        height: 160,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
    },
    badge: {
        position: "absolute",
        top: 10,
        left: 10,
        backgroundColor: "#2c2c2c",
        flexDirection: "row",
        gap: 8,
        alignItems: "center",
        height: 32,
        paddingHorizontal: 8,
        borderRadius: 10,
    },
    badgeText: {
        color: "#b8b8b8",
        paddingRight: 4,
        fontWeight: 500,
    },
    heart: {
        position: "absolute",
        top: 6,
        right: 8,
        /* iOS */
        /* textShadowColor: "black",
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 5, */
        /* Android */
        filter: "drop-shadow(0px 2px 5px rgba(0, 0, 0, 0.8))",
    },
    title: {
        color: "#FFFFFF",
        fontSize: 24,
        fontWeight: 600,
        position: "absolute",
        bottom: 36,
        left: 10,
    },
    description: {
        color: "#FFF",
        fontSize: 16,
        fontWeight: 400,
        position: "absolute",
        bottom: 16,
        left: 10
    },
});