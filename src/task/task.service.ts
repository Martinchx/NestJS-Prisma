import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTaskDTO, UpdateTaskDTO } from './dtos/task-dtos';

@Injectable()
export class TaskService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAllTasks() {
    try {
      const tasks = await this.prismaService.task.findMany();

      return tasks;
    } catch (error) {
      console.log(error);
    }
  }

  async getTaskById(task_id: number) {
    try {
      const task = await this.prismaService.task.findUnique({
        where: {
          id: task_id,
        },
      });

      if (!task) throw Error('Task not found');

      return task;
    } catch (error) {
      console.log(error);
    }
  }

  async createTask(createTaskDto: CreateTaskDTO) {
    try {
      const newTask = await this.prismaService.task.create({
        data: createTaskDto,
      });

      return newTask;
    } catch (error) {
      console.log(error);
    }
  }

  async updateTask(task_id: number, updateTaskDto: UpdateTaskDTO) {
    await this.getTaskById(task_id);

    try {
      const updatedTask = await this.prismaService.task.update({
        where: {
          id: task_id,
        },
        data: updateTaskDto,
      });

      return updatedTask;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteTask(task_id: number) {
    await this.getTaskById(task_id);

    try {
      await this.prismaService.task.delete({
        where: { id: task_id },
      });

      return true;
    } catch (error) {
      console.log(error);
    }
  }
}
