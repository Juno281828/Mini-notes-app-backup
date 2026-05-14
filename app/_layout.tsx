import { Stack } from 'expo-router';
import { SQLiteProvider } from 'expo-sqlite';
import { initDatabase } from '../database/db';

export default function RootLayout() {
  return (
    <SQLiteProvider databaseName="notes.db" onInit={initDatabase}>
      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </SQLiteProvider>
  );
}