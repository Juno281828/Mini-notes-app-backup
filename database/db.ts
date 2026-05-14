import type { SQLiteDatabase } from 'expo-sqlite';

export type Note = {
  id: number;
  title: string;
  category: string;
  content: string;
};

export async function initDatabase(db: SQLiteDatabase) {
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS notes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      category TEXT NOT NULL,
      content TEXT NOT NULL
    );
  `);

  const result = await db.getFirstAsync<{ count: number }>(
    'SELECT COUNT(*) as count FROM notes'
  );

  if (!result || result.count === 0) {
    await db.runAsync(
      'INSERT INTO notes (title, category, content) VALUES (?, ?, ?)',
      'Study React Native',
      'School',
      'Review Expo Router, FlatList, and TextInput before class.'
    );

    await db.runAsync(
      'INSERT INTO notes (title, category, content) VALUES (?, ?, ?)',
      'Buy groceries',
      'Personal',
      'Milk, bread, eggs, and coffee.'
    );

    await db.runAsync(
      'INSERT INTO notes (title, category, content) VALUES (?, ?, ?)',
      'Project meeting',
      'Work',
      'Discuss app screens and assign tasks to group members.'
    );
  }
}

export async function getAllNotes(db: SQLiteDatabase): Promise<Note[]> {
  return await db.getAllAsync<Note>('SELECT * FROM notes ORDER BY id ASC');
}

export async function getNoteById(db: SQLiteDatabase, id: number): Promise<Note | null> {
  const note = await db.getFirstAsync<Note>(
    'SELECT * FROM notes WHERE id = ?',
    id
  );

  return note ?? null;
}

export async function addNote(
  db: SQLiteDatabase,
  title: string,
  category: string,
  content: string
) {
  return await db.runAsync(
    'INSERT INTO notes (title, category, content) VALUES (?, ?, ?)',
    title,
    category,
    content
  );
}

export async function updateNote(
  db: SQLiteDatabase,
  id: number,
  title: string,
  category: string,
  content: string
) {
  return await db.runAsync(
    'UPDATE notes SET title = ?, category = ?, content = ? WHERE id = ?',
    title,
    category,
    content,
    id
  );
}

export async function deleteNote(db: SQLiteDatabase, id: number) {
  return await db.runAsync(
    'DELETE FROM notes WHERE id = ?',
    id
  );
}