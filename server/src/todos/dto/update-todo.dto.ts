import { PartialType, PickType } from '@nestjs/swagger';
import { Todo } from '../entities/todo.entity';

export class UpdateTodoDto extends PartialType(
  PickType(Todo, ['text', 'isDone'] as const),
) {}
