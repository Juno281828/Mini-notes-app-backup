import { router } from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';
import { useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { addNote } from '../../../database/db';

export default function AddNoteScreen() {
  const db = useSQLiteContext();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [content, setContent] = useState('');

  const handleSave = async () => {
    try {
      if (!title.trim() || !category.trim() || !content.trim()) {
        throw new Error('Please fill in all fields.');
      }

      await addNote(db, title.trim(), category.trim(), content.trim());

      Alert.alert('Success', 'Note saved successfully.');
      router.replace('/note');
    } catch (error: any) {
      Alert.alert('Validation Error', error.message);
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

      <Pressable style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Save Note</Text>
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
    backgroundColor: '#2563eb',
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