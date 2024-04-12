import { Injectable } from '@nestjs/common';
import { PrismaService } from './db/prisma.service';
import {
  CreateMemberDto,
  CreateTaskDto,
  CreateTeamDto,
  UpdateTaskDto,
} from './dto';

@Injectable()
export class AppService {
  constructor(private readonly prisma: PrismaService) {}

  async createTask(createTaskDtos: CreateTaskDto[]) {
    return this.prisma.task.createMany({
      data: createTaskDtos,
    });
  }

  async createTeam(createTeamDto: CreateTeamDto) {
    return this.prisma.team.create({
      data: {
        name: createTeamDto.name,
        Members: {
          connect: createTeamDto.memberIds.map(id => ({ id }))
        },
      },
    });
  }

  async createMember(createMemberDto: CreateMemberDto) {
    return this.prisma.member.create({
      data: createMemberDto,
    });
  }

  async assignTask(taskId: number, memberId: number) {
    return this.prisma.task.update({
      where: {
        id: taskId,
      },
      data: {
        assignee: memberId,
      },
    });
  }

  async getAllTasks(memberId: number) {
    return this.prisma.task.findMany({
      where: {
        assignee: memberId,
      },
    });
  }

  async updateTask(taskId: number, updateTaskDto: UpdateTaskDto) {
    return this.prisma.task.update({
      where: {
        id: taskId,
      },
      data: updateTaskDto,
    });
  }
}
