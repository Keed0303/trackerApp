import { Stack } from 'expo-router';
export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="addIncome" options={{ headerShown: false }} />
      <Stack.Screen name="addExpenses" options={{ headerShown: false }} />
    </Stack>
  );
 
  
}
