import { Colors } from "@/constants/theme";
import { City } from "@/data/types";
import { useThemeColorScheme } from "@/hooks/use-color-scheme";
import { FontAwesome6 } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Dimensions, Image, Platform, Pressable, StyleSheet, Text, View } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withSequence, withTiming, } from "react-native-reanimated";

type CityItemProps = {
    city: City;
}

const { width } = Dimensions.get("window");
export function CityItem({ city }: CityItemProps) {

    const router = useRouter();
    const isFeatured = city.categories.some((cat) => cat.id === "star");
    const [isFavorited, setIsFavorited] = useState(false);
    const [hovered, setHovered] = useState(false);

    const scale = useSharedValue(1);
    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{
                scale: withTiming(scale.value, {
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

    const scheme = useThemeColorScheme();
    const theme = Colors[scheme ?? "light"];

    return (
        <Pressable
            onPress={() => {
                router.push({
                    pathname: "/city/[id]",
                    params: { id: city.id },
                });
            }}
            onPressIn={() => {
                scale.value = 0.97;
            }}
            onPressOut={() => {
                scale.value = 1;
            }}
            onHoverIn={() => {
                if (Platform.OS == "web") {
                    scale.value = 1.03;
                }
            }}
            onHoverOut={() => {
                if (Platform.OS == "web") {
                    scale.value = 1;
                }
            }}
        >
            <Animated.View style={[style.card, animatedStyle]}>
                <Image source={city.coverImage} style={{ height: 200, width: width - 32 }} resizeMode="cover" />
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
                <Pressable
                    style={style.heart}
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
                    <Animated.View style={animatedHeartStyle}>
                        <FontAwesome6 name="heart" size={20} color={isFavorited ? "#ff3939" : "#fff"} solid={isFavorited} />
                    </Animated.View>
                </Pressable>
                {/* end like */}
                <Text style={style.title}>{city.name}</Text>
                <Text style={style.description}>{city.country}</Text>
            </Animated.View>
        </Pressable>
    )
}

const style = StyleSheet.create({
    card: {
        alignItems: "center",
        width: width - 32,
        borderRadius: 15,
        overflow: "hidden",
    },
    cardHovered: {

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
        top: 16,
        right: 18,
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