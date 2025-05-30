import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { UserEntity } from 'users/entity/user.entity/user.entity';

export enum SubmissionEntityType {
  PROPOSAL = 'proposal',
  COMPLAINT = 'complaint',
  CONCERN = 'concern',
}

export enum Visibility {
  PRIVATE = 'private',
  PUBLIC = 'public',
  POLL = 'poll',
}

@Entity()
export class Submission {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => UserEntity, { eager: true })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column({
    type: 'enum',
    enum: SubmissionEntityType,
  })
  type: SubmissionEntityType;

  @Column({
    type: 'enum',
    enum: Visibility,
  })
  visibility: Visibility;

  @Column()
  is_anonymous: boolean;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;
}
