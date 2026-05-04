import { CategoriesFilter } from "@/components/CategoriesFilter";
import { CityItem } from "@/components/CityItem";
import { SearchBar } from "@/components/SearchBar";
import { cities } from "@/data/cities";
import { useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";


export default function Index() {
  const { top, bottom } = useSafeAreaInsets();
  const [search, setSearch] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const filteredCities = cities.filter((city) => {
    const matchesSearch = city.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.every((selectedId) =>
        city.categories.some((cat) => cat.id === selectedId)
      );

    return matchesSearch && matchesCategory;
  });
  return ( /* criar componente pros itens do header pra botar no headerListComponent na flatlist da cidade e ficar td num scroll só */
    <View style={[styles.container, { paddingTop: top, paddingBottom: bottom }]}>
      <FlatList
        data={filteredCities}
        ListHeaderComponent={
          <View> {/*Header*/}
            <SearchBar search={search} setSearch={setSearch} />
            <CategoriesFilter selectedCategories={selectedCategories} setSelectedCategories={setSelectedCategories} />
          </View>
        }
        renderItem={({ item }) => <CityItem city={item} />}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() =>
          <View style={{ height: 1, backgroundColor: "#5c5c5c", marginVertical: 32 }}></View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1B1B1B",
    flex: 1,
    paddingHorizontal: 16,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: 600,
  },

});