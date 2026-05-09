import { Colors } from "@/constants/theme";
import { useThemeColorScheme } from "@/hooks/use-color-scheme";
import { Dimensions, Image, Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

export default function Profile() {
    const { top, bottom } = useSafeAreaInsets();

    const scheme = useThemeColorScheme();
    const theme = Colors[scheme ?? 'light'];

    let isLoggedin = false;

    if (isLoggedin) {
        return (
            <View style={[style.container, { paddingTop: top, backgroundColor: theme.background }]}>
                <View style={style.photoContainer}>
                    <Image source={{ uri: "https://media.tenor.com/p-Pi0DJ-8SwAAAAM/anime.gif" }} resizeMode="center" style={[style.profilePhoto, { borderColor: theme.primary }]} />
                    <View>
                        <Text style={{ fontSize: 16, color: theme.text }}>Olá,</Text>
                        <Text style={{ fontSize: 32, color: theme.text, fontWeight: "bold" }}>React</Text>
                    </View>
                </View>
            </View>
        );
    } else {
        return (
            <View style={[style.container, { paddingTop: top, backgroundColor: theme.background }]}>
                <View style={style.loginContent}>
                    <Text style={{ color: theme.text, textAlign: "center", fontWeight: 500 }}>Entre em sua conta para ver seu perfil</Text>
                    <Pressable
                        style={({ pressed }) => [
                            style.loginButton,
                            { backgroundColor: pressed ? theme.buttonPressed : theme.primary }
                        ]}
                        onPress={() => alert("tela de login 👍👌")}>
                        <Text style={{ color: theme.buttonText, textAlign: "center", fontWeight: 500 }}>Entrar</Text>
                    </Pressable>
                </View>
            </View>
        );
    }
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
    },
    profilePhoto: {
        width: 60,
        height: 60,
        borderWidth: 5,
        borderRadius: 100,
        padding: 16
    },
    photoContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10
    },
    loginContent: {
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
        gap: 32
    },
    loginButton: {
        width: 250,
        height: 30,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 5,
    }
});