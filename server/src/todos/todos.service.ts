import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Todo } from './entities/todo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
  ) {}

  async findAll() {
    const todoList = await this.todoRepository.find();

    return todoList;
  }

  async findOne(id: number) {
    return this.todoRepository.findOne({ where: { id } });
  }

  async create({ text }: CreateTodoDto) {
    const result = await this.todoRepository.save({
      text,
    });

    return result;
  }

  async update({ id, todo: updateTodo }: { id: number; todo: UpdateTodoDto }) {
    const todo = await this.findOne(id);

    if (!todo) {
      throw new NotFoundException('id에 해당하는 todo를 찾을 수 없습니다.');
    }

    await this.todoRepository.save({
      ...todo,
      ...updateTodo,
    });

    return true;
  }

  async remove(id: number) {
    const todo = await this.findOne(id);

    if (!todo) {
      throw new NotFoundException('id에 해당하는 todo를 찾을 수 없습니다.');
    }

    await this.todoRepository.softDelete({ id });

    return true;
  }
}
