import { Module } from '@nestjs/common';
import { userControllers } from './user.controller';
import { userRepository } from './user.repository';
import { EmailValidator } from './validators/email.validator';

@Module({
  controllers: [userControllers],
  providers: [userRepository, EmailValidator],
})
export class userModule {}
