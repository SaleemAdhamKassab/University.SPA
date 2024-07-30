export interface StudentCourse {
  courseId: number;
  courseName: string;
}
export class StudentCoursesDto {
  studentId!: number;
  coursesIds: number[] = [];
}
