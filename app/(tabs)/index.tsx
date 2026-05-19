import { CategoriesFilter } from "@/components/CategoriesFilter";
import CityList from "@/components/CityList";
import { SearchBar } from "@/components/SearchBar";
import { Colors } from "@/constants/theme";
import { cities } from "@/data/cities";
import { useThemeColorScheme } from "@/hooks/use-color-scheme";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Index() {
  const { top, bottom } = useSafeAreaInsets();
  const [search, setSearch] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const colorScheme = useThemeColorScheme();
  const theme = Colors[colorScheme ?? 'light'];

  const filteredCities = cities.filter((city) => {
    const matchesSearch = city.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.every((selectedId) =>
        city.categories.some((cat) => cat.id === selectedId)
      );

    return matchesSearch && matchesCategory;
  });

  return (
    <View style={[styles.container, { backgroundColor: theme.background, paddingTop: top }]}>
      <View style={{ paddingHorizontal: 16, }}>
        <SearchBar search={search} setSearch={setSearch} />
        <CategoriesFilter selectedCategories={selectedCategories} setSelectedCategories={setSelectedCategories} />
      </View>
      <CityList cities={filteredCities} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: 600,
  },

});