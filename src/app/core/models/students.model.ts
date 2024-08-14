export interface studentCourse {
  courseId: number;
  courseName: string;
}
export class StudentCoursesDto {
  email!: string;
  coursesIds: number[] = [];
}

export class studentPayments {
  id!: number;
  description!: string;
  status!: string;
  term!: string;
  validatedBy!: string;
  totalAmount!: number;
  currency!: string;
  program!: string;
  link!: string;
  date!: Date;
}
