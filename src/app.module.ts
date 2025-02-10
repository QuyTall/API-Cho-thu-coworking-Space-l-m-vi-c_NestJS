import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { BookingsModule } from './bookings/bookings.module';
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/coworking-space'),
    UsersModule,
  ],
})
export class AppModule {}
