import { Controller, Get, Post, Body, Param, UseGuards, UseInterceptors, UploadedFile } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto/create-user.dto';
import { RolesGuard } from 'auth/guards/roles.guard';
import { AccessTokenGuard } from 'auth/guards/access-token.guard';
import { RoleAllowed } from 'auth/guards/roles.decorator';
import { ApiBearerAuth } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@ApiBearerAuth() 
@Controller('api/v1/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(AccessTokenGuard, RolesGuard)
  @RoleAllowed('admin')
  findAll() {
    return this.usersService.findAll();
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get('email/:email')
  @UseGuards(AccessTokenGuard, RolesGuard)
  @RoleAllowed('admin')
findByEmail(@Param('email') email: string) {
  return this.usersService.findByEmail(email);
}

// Admin
@Get('admins')
@UseGuards(AccessTokenGuard, RolesGuard)
@RoleAllowed('admin')
findAdminUsers(){
  return this.usersService.findAdminUsers();
}

// Avatar
  @Post(':id/avatar')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/avatars',
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, `${uniqueSuffix}${extname(file.originalname)}`);
        },
      }),
      fileFilter: (req, file, cb) => {
        if (!file.mimetype.match(/\.(jpg|jpeg|png)$/)) {
          return cb(new Error('Only image files are allowed!'), false);
        }
        cb(null, true);
      },
    })
  )
  async uploadAvatar(@Param('id') id: string, @UploadedFile() file: Express.Multer.File) {
    return this.usersService.uploadAvatar(id, file.filename);
  }
}