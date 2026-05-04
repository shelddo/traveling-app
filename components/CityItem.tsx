import { City } from "@/data/types";
import { FontAwesome6 } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Dimensions, Image, Pressable, StyleSheet, Text, View } from "react-native";

type CityItemProps = {
    city: City;
}

const { width } = Dimensions.get("window");
export function CityItem({ city }: CityItemProps) {
    const router = useRouter();
    const isFeatured = city.categories.some((cat) => cat.id === "star");
    const [isFavorited, setIsFavorited] = useState(false);
    return (
        <Pressable style={style.card}
            onPress={() => {
                router.push({
                    pathname: "/city/[id]",
                    params: { id: city.id },
                });
            }}
        >
            <Image source={city.coverImage} style={{ height: 200, width: width - 32, borderRadius: 15 }} resizeMode="cover" />
            {/* start badge */}
            {isFeatured && (
                <View style={style.badge}>
                    <FontAwesome6 name="star" size={16} color="#FFD700" solid />
                    <Text style={style.badgeText}>Destaque</Text>
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
                    /* fazer algo p favoritar */
                }}
            >
                <FontAwesome6 name="heart" size={20} color={isFavorited ? "#ff3939" : "#fff"} solid={isFavorited} />
            </Pressable>
            {/* end like */}
            <Text style={style.title}>{city.name}</Text>
            <Text style={style.description}>{city.country}</Text>
        </Pressable>
    )
}

const style = StyleSheet.create({
    card: {
        alignItems: "center",
        width: width - 32,
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
        boxShadow: "0px 4px 6px rgba(165, 140, 0, 0.5)"
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
        textShadowColor: "black",
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 5,
    },
    title: {
        color: "#FFFFFF",
        fontSize: 24,
        fontWeight: 600,
        position: "absolute",
        bottom: 36,
        left: 10,
        textShadowColor: "black",
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 10,
    },
    description: {
        color: "#FFF",
        fontSize: 16,
        fontWeight: 400,
        position: "absolute",
        bottom: 16,
        left: 10,
        textShadowColor: "black",
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 10,
    },
});