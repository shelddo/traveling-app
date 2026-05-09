import { Colors } from "@/constants/theme";
import { useThemeColorScheme } from "@/hooks/use-color-scheme";
import { FontAwesome6 } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";


export default function TabLayout() {
    const colorScheme = useThemeColorScheme();
    const theme = Colors[colorScheme ?? 'light'];
    return (
        <>
            <StatusBar style="auto" animated />
            <Tabs screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: theme.tint,
                tabBarInactiveTintColor: theme.inactiveTint,
                tabBarStyle: {
                    borderTopWidth: 0,
                    borderTopColor: theme.tabBackground,
                    backgroundColor: theme.tabBackground,
                    boxShadow: "0px -5px 15px rgba(0, 0, 0, 0.1)"
                }
            }}>
                <Tabs.Screen name="index" options={{
                    title: "Cidades",
                    tabBarIcon: ({ color, size }) => (<FontAwesome6 name="city" size={size} color={color} />),
                }} />
                <Tabs.Screen name="liked" options={{
                    title: "Favoritos",
                    tabBarIcon: ({ color, size }) => (<FontAwesome6 name="heart" size={size} color={color} solid />)
                }} />
                <Tabs.Screen name="profile" options={{
                    title: "Perfil",
                    tabBarIcon: ({ color, size }) => (<FontAwesome6 name="user" size={size} color={color} solid />)
                }} />
                <Tabs.Screen name="city" options={{ href: null }} />
            </Tabs>
        </>
    );
}