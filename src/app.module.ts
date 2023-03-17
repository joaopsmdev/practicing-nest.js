import { Module } from '@nestjs/common';
import { userModule } from './user/user.module';

@Module({
  imports: [userModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
