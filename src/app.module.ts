import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { AcknowledgmentsController } from './acknowledgments/acknowledgments.controller';
import { AcknowledgmentsModule } from './acknowledgments/acknowledgments.module';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
      ConfigModule.forRoot({
      isGlobal: true,
    }),
  TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        autoLoadEntities: true,
        synchronize: true,  // only for dev, disables in prod!
      }),
    }),
    AuthModule,
    AcknowledgmentsModule,
    UsersModule

  ],
  controllers: [AppController, AcknowledgmentsController],
  providers: [AppService],
})
export class AppModule {}
