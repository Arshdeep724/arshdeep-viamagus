import {
  Body,
  Controller,
  Get,
  Param,
  ParseArrayPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { AppService } from './app.service';
import { CreateMemberDto, CreateTaskDto, CreateTeamDto, UpdateTaskDto } from './dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('task')
  async createTask(
    @Body(new ParseArrayPipe({ items: CreateTaskDto }))
    tasks: CreateTaskDto[],
  ) {
    return this.appService.createTask(tasks);
  }

  @Post('team')
  async createTeam(@Body() body: CreateTeamDto) {
    return this.appService.createTeam(body);
  }

  @Post('member')
  async createMember(@Body() body: CreateMemberDto) {
    return this.appService.createMember(body);
  }

  @Post('task/:taskId/assign/:memberId')
  async assignTask(
    @Param('taskId') taskId: number,
    @Param('memberId') memberId: number,
  ) {
    return this.appService.assignTask(+taskId, +memberId);
  }

  @Patch('task/:id')
  async updateTask(@Body() body: UpdateTaskDto, @Param('id') taskId: number) {
    return this.appService.updateTask(+taskId, body);
  }

  @Get('task/:id')
  async getAllTasks(@Param('id') memberId: number) {
    return this.appService.getAllTasks(+memberId);
  }
}
