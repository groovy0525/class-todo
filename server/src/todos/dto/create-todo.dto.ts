import { PickType } from '@nestjs/swagger';
import { Todo } from '../entities/todo.entity';

export class CreateTodoDto extends PickType(Todo, ['text'] as const) {}
