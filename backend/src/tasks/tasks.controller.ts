import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { TasksService } from './tasks.service';
import { CreateTaskDto, UpdateTaskDto } from '../dto/tasks.dto';
import { Request } from 'express';

interface UserRequest extends Request {
  user: { userId: number; username: string };
}

@Controller('tasks')
@UseGuards(JwtAuthGuard)
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  async getTasks(@Req() req: UserRequest) {
    return this.tasksService.findAll(req.user.userId);
  }

  @Post()
  async createTask(
    @Req() req: UserRequest,
    @Body() createTaskDto: CreateTaskDto,
  ) {
    return this.tasksService.create(req.user.userId, createTaskDto);
  }

  @Put(':id')
  async updateTask(
    @Req() req: UserRequest,
    @Param('id') id: number,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    return this.tasksService.update(id, req.user.userId, updateTaskDto);
  }

  @Delete(':id')
  async deleteTask(@Req() req: UserRequest, @Param('id') id: number) {
    return this.tasksService.delete(id, req.user.userId);
  }
}
