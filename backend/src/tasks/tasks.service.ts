import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from '../entities/task.entity';
import { Repository } from 'typeorm';
import { CreateTaskDto, UpdateTaskDto } from '../dto/tasks.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}

  async findAll(userId: number): Promise<Task[]> {
    return this.tasksRepository.find({ where: { user: { id: userId } } });
  }

  async create(userId: number, createTaskDto: CreateTaskDto): Promise<Task> {
    const task = this.tasksRepository.create({
      ...createTaskDto,
      user: { id: userId },
    });
    return this.tasksRepository.save(task);
  }

  async update(
    taskId: number,
    userId: number,
    updateTaskDto: UpdateTaskDto,
  ): Promise<Task> {
    const task = await this.tasksRepository.findOne({
      where: { id: taskId, user: { id: userId } },
    });

    if (!task) {
      throw new NotFoundException('Task not found');
    }
    return this.tasksRepository.save({ ...task, ...updateTaskDto });
  }

  async delete(taskId: number, userId: number): Promise<void> {
    const result = await this.tasksRepository.delete({
      id: taskId,
      user: { id: userId },
    });
    if (result.affected === 0) {
      throw new NotFoundException('Task not found');
    }
  }
}
