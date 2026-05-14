export type Note = {
  id: number;
  title: string;
  category: string;
  content: string;
};

export const notesData: Note[] = [
  {
    id: 1,
    title: 'Study React Native',
    category: 'School',
    content: 'Review Expo Router, FlatList, and TextInput before class.',
  },
  {
    id: 2,
    title: 'Buy groceries',
    category: 'Personal',
    content: 'Milk, bread, eggs, and coffee.',
  },
  {
    id: 3,
    title: 'Project meeting',
    category: 'Work',
    content: 'Discuss app screens and assign tasks to group members.',
  },
];