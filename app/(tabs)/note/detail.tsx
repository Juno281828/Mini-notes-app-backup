import { router, useLocalSearchParams } from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';
import { useEffect, useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { deleteNote, getNoteById, Note } from '../../../database/db';

export default function DetailScreen() {
  const db = useSQLiteContext();

  const { id, displayId } = useLocalSearchParams<{
    id: string;
    displayId: string;
  }>();

  const [note, setNote] = useState<Note | null>(null);

  useEffect(() => {
    const loadNote = async () => {
      if (!id) return;

      const data = await getNoteById(db, Number(id));
      setNote(data);
    };

    loadNote();
  }, [db, id]);

  const handleDelete = async () => {
    Alert.alert(
      'Delete Note',
      'Are you sure you want to delete this note?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            await deleteNote(db, Number(id));
            Alert.alert('Success', 'Note deleted successfully.');
            router.replace('/note');
          },
        },
      ]
    );
  };

  const handleEdit = () => {
    router.push({
      pathname: '/note/edit-note',
      params: {
        id: String(id),
      },
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Note ID:</Text>
      <Text style={styles.value}>{displayId}</Text>

      <Text style={styles.label}>Title:</Text>
      <Text style={styles.value}>{note?.title ?? ''}</Text>

      <Text style={styles.label}>Category:</Text>
      <Text style={styles.value}>{note?.category ?? ''}</Text>

      <Text style={styles.label}>Content:</Text>
      <Text style={styles.value}>{note?.content ?? ''}</Text>

      <View style={styles.buttonRow}>
        <Pressable style={[styles.button, styles.editButton]} onPress={handleEdit}>
          <Text style={styles.buttonText}>Edit</Text>
        </Pressable>

        <Pressable style={[styles.button, styles.deleteButton]} onPress={handleDelete}>
          <Text style={styles.buttonText}>Delete</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 12,
    color: '#1f2937',
  },
  value: {
    fontSize: 16,
    marginTop: 4,
    color: '#374151',
    backgroundColor: '#ffffff',
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#dddddd',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
    gap: 12,
  },
  button: {
    flex: 1,
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  editButton: {
    backgroundColor: '#f59e0b',
  },
  deleteButton: {
    backgroundColor: '#dc2626',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});