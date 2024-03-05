export interface TaskEntityOptions {
  id: number;
  title: string;
  description: string;
  status: string;
}

export class TaskEntity {
  public id: number;
  public title: string;
  public description: string;
  public status: string;

  constructor(options: TaskEntityOptions) {
    const { id, title, description, status } = options;

    this.id = id;
    this.title = title;
    this.description = description;
    this.status = status;
  }

  static fromObject = (object: { [key: string]: any }): TaskEntity => {
    const { id, title, description, status } = object;

    const task = new TaskEntity({
      id,
      title,
      description,
      status,
    });

    return task;
  };
}
