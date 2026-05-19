import { CityItem } from "@/components/CityItem";
import { City } from "@/data/types";
import { Dimensions } from "react-native";
import Animated, { useAnimatedScrollHandler, useSharedValue, } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type CityListProps = {
    cities: City[];
}

export default function CityList({ cities }: CityListProps) {
    const { top, bottom } = useSafeAreaInsets();

    const scrollY = useSharedValue(0);
    const isAtEnd = useSharedValue(false);

    const SCREEN_HEIGHT = Dimensions.get("window").height;
    const availableHeight = SCREEN_HEIGHT - top - bottom - 100; // 100 é uma margem para o título e espaçamento
    const disableAnimation = useSharedValue(false);

    const onScroll = useAnimatedScrollHandler({
        onScroll: (event) => {
            scrollY.value = event.contentOffset.y;

            const paddingToEnd = 10;

            isAtEnd.value =
                event.contentOffset.y +
                event.layoutMeasurement.height >=
                event.contentSize.height - paddingToEnd;
        },
    });


    return (
        <Animated.FlatList
            data={cities}
            onScroll={onScroll}
            scrollEventThrottle={16}
            contentContainerStyle={{
                paddingHorizontal: 16,
            }}
            renderItem={({ item, index }) => {
                return (
                    <CityItem
                        city={item}
                        index={index}
                        scrollY={scrollY}
                        isAtEnd={isAtEnd}
                        disableAnimation={disableAnimation} />
                );
            }}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            onContentSizeChange={(width, height) => {
                disableAnimation.value =
                    height <= availableHeight;
            }}
        />
    );
}