import { Stack } from "expo-router";

export default function RootLayout() {
  return <Stack screenOptions={{ headerShown: false, fullScreenGestureEnabled: true }}>
    <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    {/*  <Stack.Screen name="city/[id]" /> */}
    <Stack.Screen name="book" />
    <Stack.Screen name="login" />
    <Stack.Screen name="register" />
  </Stack>;
}
