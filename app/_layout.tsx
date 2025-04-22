import { Stack } from "expo-router";

export default function RootLayout() {
  return <Stack 
    screenOptions={{
      headerShown: false,
      contentStyle: { backgroundColor: "#fff" },
    }}>
    <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>;
}
