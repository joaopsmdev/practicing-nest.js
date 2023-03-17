import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { ListUsersDTO } from './dto/listUsers.dto';
import { UpdatedUserDto } from './dto/updatedUser.dto';
import { userCreateDto } from './dto/userCreate.dto';
import { UserEntity } from './user.entity';
import { userRepository } from './user.repository';

@Controller('/user')
export class userControllers {
  constructor(private userRepo: userRepository) {}

  @Post()
  async postUser(@Body() body: userCreateDto) {
    const userEntity = new UserEntity();
    userEntity.email = body.email;
    userEntity.password = body.password;
    userEntity.nome = body.nome;
    userEntity.id = uuid();
    this.userRepo.saveUsers(userEntity);
    return { User: new ListUsersDTO(userEntity.id, userEntity.nome) };
  }
  @Get()
  async getUsers() {
    const saveUsers = await this.userRepo.showUsers();
    const usersList = saveUsers.map(
      (user) => new ListUsersDTO(user.id, user.nome),
    );
    return usersList;
  }

  @Put('/:id')
  async putUsers(@Param('id') id: string, @Body() body: UpdatedUserDto) {
    const updatedBody = await this.userRepo.putUser(id, body);
    return {
      usuario: updatedBody,
      message: 'O usuário foi atualizado com sucesso',
    };
  }

  @Delete('/:id')
  async deleteUser(@Param('id') id: string) {
    const removedUser = await this.userRepo.removeUser(id);

    return {
      user: removedUser,
      message: 'O usuário foi removido com sucesso',
    };
  }
}
