import { ClassData } from './ClassData';

interface Course {
  courseName: string;
  timetableData: ClassData[];
  color: string;
  lessonType: { [key: string]: string };
}

export type { Course };
