import { Colors } from "@/constants/theme";
import { useThemeColorScheme } from "@/hooks/use-color-scheme";
import { FontAwesome6 } from "@expo/vector-icons";
import { useRef } from "react";
import { Pressable, StyleSheet, TextInput, View } from "react-native";

export function SearchBar({ search, setSearch }: { search: string, setSearch: (value: string) => void }) {
    const inputRef = useRef<TextInput>(null);
    const scheme = useThemeColorScheme();
    const theme = Colors[scheme ?? 'light'];
    return (
        <View style={[styles.searchContainer, { backgroundColor: theme.secondary }]}>
            <Pressable onPress={() => inputRef.current?.focus()}>
                <FontAwesome6 name="magnifying-glass" size={16} color={theme.inactiveText} />
            </Pressable>
            <TextInput
                ref={inputRef}
                value={search}
                onChangeText={setSearch}
                style={[styles.searchInput, { color: theme.text }]}
                placeholder="Buscar cidade..."
                placeholderTextColor={theme.inactiveText}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    searchContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#2c2c2c",
        borderRadius: 10,
        paddingHorizontal: 12,
        marginVertical: 8,
    },
    searchInput: {
        flex: 1,
        color: "#FFF",
        height: 50,
        marginLeft: 8,
    },
})