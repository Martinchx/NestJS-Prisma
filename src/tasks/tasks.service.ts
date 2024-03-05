import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus, UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { TaskEntity } from './entities/task.entity';

@Injectable()
export class TasksService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createTaskDto: CreateTaskDto): Promise<TaskEntity> {
    const newTask = await this.prismaService.task.create({
      data: {
        ...createTaskDto,
        status: TaskStatus.PENDING,
      },
    });

    return TaskEntity.fromObject(newTask);
  }

  async findAll(): Promise<TaskEntity[]> {
    const tasks = await this.prismaService.task.findMany();

    return tasks.map((task) => TaskEntity.fromObject(task));
  }

  async findOne(id: number): Promise<TaskEntity> {
    const taskFound = await this.prismaService.task.findUnique({
      where: {
        id: id,
      },
    });

    if (!taskFound)
      throw new HttpException(
        `Task #${id} does not exist`,
        HttpStatus.NOT_FOUND,
      );

    return TaskEntity.fromObject(taskFound);
  }

  async update(id: number, updateTaskDto: UpdateTaskDto): Promise<TaskEntity> {
    await this.findOne(id);

    const updatedTask = await this.prismaService.task.update({
      where: {
        id,
      },
      data: updateTaskDto,
    });

    return TaskEntity.fromObject(updatedTask);
  }

  async remove(id: number): Promise<Boolean> {
    await this.findOne(id);

    const taskDeleted = await this.prismaService.task.delete({
      where: {
        id: id,
      },
    });

    if (!taskDeleted)
      throw new HttpException(
        `Task #${id} cannot be deleted`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );

    return true;
  }
}
