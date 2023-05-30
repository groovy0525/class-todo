import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  BadRequestException,
  ParseIntPipe,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Todo } from './entities/todo.entity';

@ApiTags('todo list')
@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @ApiOperation({
    summary: 'Get todo list',
  })
  @ApiOkResponse({
    description: 'Get todo list',
    type: [Todo],
  })
  @Get()
  getTodos() {
    return this.todosService.findAll();
  }

  @ApiOperation({
    summary: 'Create todo item',
  })
  @ApiOkResponse({
    description: 'Create todo',
    type: Todo,
  })
  @ApiBadRequestResponse({
    description: 'Text must have a value',
    schema: {
      type: 'object',
      properties: {
        statusCode: {
          example: 400,
        },
        message: {
          example: 'text는 필수 항목입니다.',
        },
        error: {
          example: 'Bad Request',
        },
      },
    },
  })
  @Post()
  addTodo(@Body() { text }: CreateTodoDto) {
    if (!text) {
      throw new BadRequestException('text는 필수 항목입니다.');
    }

    return this.todosService.create({ text });
  }

  @ApiOperation({
    summary: 'Update todo item',
  })
  @ApiOkResponse({
    description: 'Update todo completed',
    schema: {
      example: true,
    },
  })
  @ApiNotFoundResponse({
    description: `The corresponding id does not exist`,
    schema: {
      type: 'object',
      properties: {
        statusCode: {
          example: 404,
        },
        message: {
          example: 'id에 해당하는 todo를 찾을 수 없습니다.',
        },
        error: {
          example: 'Not Found',
        },
      },
    },
  })
  @Put(':id')
  updateTodo(
    @Param('id', ParseIntPipe) id: number,
    @Body() { text, isDone }: UpdateTodoDto,
  ) {
    return this.todosService.update({ id, todo: { text, isDone } });
  }

  @ApiOperation({
    summary: 'Remove todo item',
  })
  @ApiOkResponse({
    description: 'Remove todo completed',
    schema: {
      example: true,
    },
  })
  @ApiNotFoundResponse({
    description: `The corresponding id does not exist`,
    schema: {
      type: 'object',
      properties: {
        statusCode: {
          example: 404,
        },
        message: {
          example: 'id에 해당하는 todo를 찾을 수 없습니다.',
        },
        error: {
          example: 'Not Found',
        },
      },
    },
  })
  @Delete(':id')
  removeTodo(@Param('id', ParseIntPipe) id: number) {
    return this.todosService.remove(id);
  }
}
