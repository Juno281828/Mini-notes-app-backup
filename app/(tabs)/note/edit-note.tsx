import { router, useLocalSearchParams } from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';
import { useEffect, useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { getNoteById, updateNote } from '../../../database/db';

export default function EditNoteScreen() {
  const db = useSQLiteContext();

  const { id } = useLocalSearchParams<{
    id: string;
  }>();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    const loadNote = async () => {
      if (!id) return;

      const note = await getNoteById(db, Number(id));

      if (note) {
        setTitle(note.title);
        setCategory(note.category);
        setContent(note.content);
      }
    };

    loadNote();
  }, [db, id]);

  const handleUpdate = async () => {
    try {
      if (!title.trim() || !category.trim() || !content.trim()) {
        throw new Error('Please fill in all fields.');
      }

      await updateNote(
        db,
        Number(id),
        title.trim(),
        category.trim(),
        content.trim()
      );

      Alert.alert('Success', 'Note updated successfully.');
      router.replace('/note');
    } catch (error: any) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Title</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter note title"
        value={title}
        onChangeText={setTitle}
      />

      <Text style={styles.label}>Category</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter category"
        value={category}
        onChangeText={setCategory}
      />

      <Text style={styles.label}>Content</Text>

      <TextInput
        style={[styles.input, styles.multilineInput]}
        placeholder="Enter note content"
        value={content}
        onChangeText={setContent}
        multiline
      />

      <Pressable style={styles.button} onPress={handleUpdate}>
        <Text style={styles.buttonText}>Update Note</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
    marginTop: 10,
    color: '#111827',
  },
  input: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
  },
  multilineInput: {
    height: 120,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#f59e0b',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});