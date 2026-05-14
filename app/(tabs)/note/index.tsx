import { useFocusEffect } from '@react-navigation/native';
import { router } from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';
import React, { useCallback, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { getAllNotes, Note } from '../../../database/db';

export default function NotesScreen() {
  const db = useSQLiteContext();
  const [notes, setNotes] = useState<Note[]>([]);

  const loadNotes = async () => {
    const data = await getAllNotes(db);
    setNotes(data);
  };

  useFocusEffect(
    useCallback(() => {
      loadNotes();
    }, [db])
  );

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.addButton}
        onPress={() => router.push('/note/add-note')}
      >
        <Text style={styles.addButtonText}>+ Add Note</Text>
      </Pressable>

      <FlatList
        data={notes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => (
          <Pressable
            style={styles.noteCard}
            onPress={() =>
              router.push({
                pathname: '/note/detail',
                params: {
                  id: item.id.toString(),
                  displayId: (index + 1).toString(),
                },
              })
            }
          >
            <Text style={styles.noteTitle}>Note #{index + 1}</Text>
            <Text style={styles.noteName}>{item.title}</Text>
            <Text style={styles.noteCategory}>Category: {item.category}</Text>
          </Pressable>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No notes available.</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
    padding: 16,
  },
  addButton: {
    backgroundColor: '#16a34a',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 16,
  },
  addButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  noteCard: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#dddddd',
  },
  noteTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 6,
    color: '#2563eb',
  },
  noteName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 6,
    color: '#111827',
  },
  noteCategory: {
    fontSize: 14,
    color: '#555555',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#666666',
  },
});