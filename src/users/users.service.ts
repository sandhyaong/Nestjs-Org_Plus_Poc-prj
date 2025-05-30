import { Injectable, NotFoundException } from '@nestjs/common';
import { UserEntity } from './entity/user.entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

 async findByEmail(email: string): Promise<UserEntity | null> {
  try {
    const user = await this.usersRepository.findOne({ where: { email } });
    return user;
  } catch (error) {
    console.error('Error finding user by email:', error);
    return null;
  }
}

    async findAll(): Promise<UserEntity[]> {
    return this.usersRepository.find();
  }

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    // const user = this.usersRepository.create(createUserDto);
      const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
  const user = this.usersRepository.create({
    ...createUserDto,
    password: hashedPassword,
  });
    return this.usersRepository.save(user);
  }

  // Fine Users role as Admin
  async findAdminUsers(): Promise<UserEntity[]> {
  return this.usersRepository.find({
    where: { role: 'admin' },
  });
}
// Avatar
  async uploadAvatar(id: string, filename: string): Promise<UserEntity> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException('User not found');
    user.avatar_url = `/uploads/avatars/${filename}`;
    return this.usersRepository.save(user);
  }
}
