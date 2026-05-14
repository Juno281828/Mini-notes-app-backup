import { Stack } from 'expo-router';

export default function NoteStackLayout() {
  return (
    <Stack
      screenOptions={{
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#2563eb',
        },
        headerTintColor: '#ffffff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: 'My Notes',
        }}
      />

      <Stack.Screen
        name="add-note"
        options={{
          title: 'Add Note',
        }}
      />

      <Stack.Screen
        name="detail"
        options={{
          title: 'Note Detail',
        }}
      />

      <Stack.Screen
        name="edit-note"
        options={{
          title: 'Edit Note',
        }}
      />
    </Stack>
  );
}