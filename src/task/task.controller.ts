import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  NotFoundException,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDTO, UpdateTaskDTO } from './dtos/task-dtos';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  async getAllTasks() {
    const tasks = await this.taskService.getAllTasks();
    return tasks;
  }

  @Get(':id')
  async getTaskById(@Param('id') id: string) {
    const taskFound = await this.taskService.getTaskById(+id);
    if (!taskFound) throw new NotFoundException('Task not found');
    return taskFound;
  }

  @Post()
  async createTask(@Body() createTaskDto: CreateTaskDTO) {
    return await this.taskService.createTask(createTaskDto);
  }

  @Put(':id')
  async updateTask(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDTO,
  ) {
    const updatedTask = await this.taskService.updateTask(+id, updateTaskDto);
    if (!updatedTask) throw new NotFoundException('Task not found');

    return updatedTask;
  }

  @Delete(':id')
  async deleteTask(@Param('id') id: string) {
    const deletedTask = await this.taskService.deleteTask(+id);
    if (!deletedTask) throw new NotFoundException('Task not found');

    return deletedTask;
  }
}
