import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Todo {
  @ApiProperty({
    example: 1,
    description: 'todo item unique key',
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: '영화 시청',
    description: 'todo item content',
  })
  @Column()
  text: string;

  @ApiProperty({
    example: false,
    description: `todo item's status`,
  })
  @Column({ name: 'is_done', default: false })
  isDone: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;
}
