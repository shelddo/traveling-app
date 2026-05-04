import { Link } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function About() {
    const { top, bottom } = useSafeAreaInsets();
    return (
        <View style={[style.container, { paddingTop: top, paddingBottom: bottom }]}>
            <Link href={"/"} asChild style={style.backbtn}>
                <Pressable>
                    <Text style={[style.backbtntext, { paddingTop: top, paddingBottom: bottom }]}>Back</Text>
                </Pressable>
            </Link>
            <Text style={style.title}>About</Text>
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        backgroundColor: "#1B1B1B",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
    },
    title: {
        color: "#FFFFFF",
        fontSize: 24,
        fontWeight: 600,
    },
    backbtn: {
        position: "absolute",
        top: 16,
        left: 16,
    },
    backbtntext: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "bold",
    }
});