import { Injectable } from "@nestjs/common";

import { PrismaService } from "../database/prisma/prisma.service";

interface CreateCustomerDTO {
  authUserId: string;
} 

@Injectable()
export class CustomersService {
  constructor(private prisma: PrismaService) {}

  getCustomerByAuthUserId(authUserId: string) {
    return this.prisma.customer.findUnique({
      where: {
        authUserId,
      }
    })
  }

  async createCustomer({ authUserId }: CreateCustomerDTO) {
    return await this.prisma.customer.create({
      data: {
        authUserId
      }
    })
  }
}