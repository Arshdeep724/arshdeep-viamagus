import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from './db/prisma.service';
import {
  CreateMemberDto,
  CreateTaskDto,
  CreateTeamDto,
  UpdateTaskDto,
} from './dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AppService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

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
          connect: createTeamDto.memberIds.map((id) => ({ id })),
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

  async login(username: string, password: string) {
    if (username != 'user1' || password != '1234') {
      throw new UnauthorizedException();
    }
    const payload = { sub: password, username: username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
