import { categories } from "@/data/categories";
import { Dispatch, SetStateAction } from "react";
import { FlatList, Pressable, StyleSheet, Text } from "react-native";

export function CategoriesFilter({ selectedCategories, setSelectedCategories }: { selectedCategories: string[], setSelectedCategories: Dispatch<SetStateAction<string[]>> }) {
    return (<FlatList
        contentContainerStyle={{ gap: 8, marginBottom: 16 }}
        data={categories}
        horizontal
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => {
            const isSelected = selectedCategories.includes(item.id);
            return (
                <Pressable
                    onPress={() => {
                        if (isSelected) {
                            setSelectedCategories((prev) => prev.filter((id) => id !== item.id));
                        } else {
                            setSelectedCategories((prev) => [...prev, item.id]);
                        }
                    }}
                    style={[styles.categoryButton, isSelected && styles.categoryButtonActive]}
                >
                    <Text style={[styles.categoryText, isSelected && styles.categoryTextActive]}>{item.name}</Text>
                </Pressable>
            );
        }} />
    );
}

const styles = StyleSheet.create({
    categoryButton: {
        backgroundColor: "#2c2c2c",
        paddingHorizontal: 16,
        borderWidth: 1,
        borderColor: "#5c5c5c",
        borderRadius: 20,
    },
    categoryButtonActive: {
        borderColor: "#ff6464"
    },
    categoryText: {
        color: "#888888",
        lineHeight: 32,
    },
    categoryTextActive: {
        color: "#ff6464"
    }
})