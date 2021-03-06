import { Injectable } from "@nestjs/common";
import { PrismaService } from "../database/prisma/prisma.service";

interface GetByCourseIdAndStudentIdDTO {
  courseId: string;
  studentId: string;
}

interface CreateEnrollmentDTO {
  courseId: string;
  studentId: string;
}

@Injectable()
export class EnrollmentsService {
  constructor(private prisma: PrismaService) {}

  getByCourseIdAndStudentId({
    courseId, studentId
  }: GetByCourseIdAndStudentIdDTO) {
    return this.prisma.enrollment.findFirst({
      where: {
        courseId,
        studentId,
        canceledAt: null,
      }
    })
  }

  listEnrollments() {
    return this.prisma.enrollment.findMany({
      where: {
        canceledAt: null,
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
  }

  listEnrollmentsByStudentId(studentId: string) {
    return this.prisma.enrollment.findMany({
      where: {
        studentId,
        canceledAt: null,
      },
      orderBy: {
        createdAt: 'desc'
      }
    })
  }

  createEnrollment({ courseId, studentId }: CreateEnrollmentDTO) {
    return this.prisma.enrollment.create({
      data: {
        courseId,
        studentId,
      }
    });
  }
}