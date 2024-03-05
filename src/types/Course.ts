import { ClassData } from './ClassData';

interface Course {
  courseName: string;
  timetableData: ClassData[];
  color: string;
}

export type { Course };
