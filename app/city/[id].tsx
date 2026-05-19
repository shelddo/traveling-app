import { Colors } from "@/constants/theme";
import { cities } from "@/data/cities";
import { useThemeColorScheme } from "@/hooks/use-color-scheme";
import { FontAwesome6 } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect } from "react";
import { Image, Pressable, ScrollView, SectionList, StyleSheet, Text, View } from "react-native";
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function CityScreen() {
    const { id } = useLocalSearchParams();
    const city = cities.find((c) => c.id === id);
    const { top, bottom } = useSafeAreaInsets();
    const router = useRouter();

    const scheme = useThemeColorScheme();
    const theme = Colors[scheme ?? "light"];

    const fade = useSharedValue(0);

    useEffect(() => {
        fade.value = withTiming(1, {
            duration: 400,
        });
    }, []);

    const animatedStyle = useAnimatedStyle(() => ({
        opacity: fade.value,
        transform: [
            {
                translateY: interpolate(
                    fade.value,
                    [0, 1],
                    [20, 0]
                ),
            },
        ],
    }));

    const categoriesCount = city?.categories.length ?? 0;
    return (
        <View style={[
            style.container,
            { paddingTop: top, paddingBottom: bottom, backgroundColor: theme.background }
        ]}>
            <Animated.View style={[animatedStyle, { flex: 1 }]}>
                <View style={style.contentcontainer}>
                    <View style={style.header}>
                        <Pressable style={style.backbtn} onPress={() => {
                            /* if (router.canGoBack()) {
                                router.back();
                            }
                            else {
                                router.replace("./index");
                            } */
                            router.back()
                        }} >
                            <FontAwesome6 name="square-caret-left" size={30} color={"#ff6464"} solid />
                        </Pressable>
                        <Text style={[style.title, { color: theme.text }]}>{city?.name}</Text>
                    </View>
                    <SectionList
                        sections={[
                            {
                                title: "Principais atrações",
                                data: city?.touristAttractions ?? [],
                            },
                        ]}
                        keyExtractor={(item) => item.id}
                        contentContainerStyle={{
                            paddingHorizontal: 16,
                            paddingBottom: bottom + 120,
                        }}
                        ListHeaderComponent={
                            <>
                                <Image source={city?.coverImage} style={style.image} resizeMode="cover" />
                                <ScrollView
                                    horizontal
                                    showsHorizontalScrollIndicator={false}
                                    contentContainerStyle={[
                                        style.categories,
                                        categoriesCount < 4 && {
                                            flexGrow: 1,
                                            justifyContent: "space-around",
                                        }
                                    ]}
                                >
                                    {city?.categories.map((item) => (
                                        <Text
                                            key={item.id}
                                            style={style.category}
                                        >
                                            {item.name}
                                        </Text>
                                    ))}
                                </ScrollView>
                                <Text style={[style.description, { color: theme.text }]}>{city?.description}</Text>
                            </>
                        }
                        renderSectionHeader={({ section }) => (
                            <Text style={[style.sectionTitle, { color: theme.text }]}>{section.title}</Text>
                        )}
                        renderItem={({ item }) => {
                            return (
                                <View>
                                    <Text style={[style.attraction, { color: theme.text }]}>• {item.name}</Text>
                                </View>
                            );
                        }}
                        showsVerticalScrollIndicator={false}
                    />

                </View>
                <Pressable
                    style={({ pressed }) => [
                        style.button, { bottom: bottom + 16, backgroundColor: pressed ? theme.buttonPressed : theme.primary }
                    ]}>
                    <Text style={style.buttonTxt}>Agendar viagem</Text>
                </Pressable>
            </Animated.View >
        </View >
    )
}

const style = StyleSheet.create({
    container: {
        backgroundColor: "#1B1B1B",
        flex: 1,
    },
    header: {
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginTop: 24,
        marginBottom: 12,
    },
    title: {
        color: "#FFFFFF",
        fontSize: 24,
        fontWeight: 600,
        textAlign: "center",
    },
    backbtn: {
        position: "absolute",
        left: 16,
    },
    contentcontainer: {
        marginHorizontal: 16,
        marginTop: 16,
    },
    image: {
        width: "100%",
        height: 200,
        borderRadius: 15,
        alignSelf: "center",
    },
    description: {
        color: "#FFFFFF",
        fontSize: 16,
        lineHeight: 24,
        marginTop: 16,
        textAlign: "justify",
    },
    attraction: {
        color: "#FFFFFF",
        fontSize: 16,
        lineHeight: 24,
        marginTop: 16,
    },
    categories: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 16,
        gap: 8,
    },
    category: {
        color: "#ff6464",
        fontSize: 14,
        fontWeight: "bold",
        borderColor: "#ff6464",
        borderWidth: 1,
        borderRadius: 15,
        paddingHorizontal: 12,
        paddingVertical: 6,
    },
    button: {
        position: "absolute",
        left: 16,
        right: 16,

        height: 50,
        borderRadius: 16,

        justifyContent: "center",
        alignItems: "center",
    },
    buttonTxt: {
        color: "#FFF",
        fontSize: 16,
        fontWeight: 500,
    }
});