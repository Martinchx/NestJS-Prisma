import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create-task.dto';
import { IsEnum, IsString, IsOptional } from 'class-validator';

export enum TaskStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
  @IsString()
  @IsEnum(TaskStatus)
  @IsOptional()
  status?: TaskStatus;
}
