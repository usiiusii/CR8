
export interface Course {
  id: string;
  title: string;
  teacher: string;
  telegramLink: string;
  date: string;
  description: string;
}

export interface Post {
  id: string;
  content: string;
  imageUrl?: string;
  date: string;
}

export interface Teacher {
  id: string;
  name: string;
  bio: string;
}

export interface ScheduleItem {
  id: string;
  day: string;
  time: string;
  topic: string;
}

export interface AppData {
  courses: Course[];
  posts: Post[];
  teachers: Teacher[];
  schedule: ScheduleItem[];
  courseHistory: string;
  contactViber: string;
}

export enum Theme {
  Light = 'light',
  Dark = 'dark',
}

export enum Language {
  English = 'en',
  Myanmar = 'my',
}

export enum View {
  Courses = 'courses',
  Teachers = 'teachers',
  Schedule = 'schedule',
  Posts = 'posts',
  History = 'history',
}

export interface User {
  name: string;
}
