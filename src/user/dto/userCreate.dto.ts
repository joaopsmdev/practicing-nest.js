import { IsEmail, MinLength, IsNotEmpty } from 'class-validator';
import { EmailValidatorUnique } from '../validators/email.validator';

export class userCreateDto {
  @IsNotEmpty({ message: 'o Nome não pode ser vazio' })
  nome: string;

  @IsEmail(undefined, { message: 'o email informado é invalido' })
  @EmailValidatorUnique({ message: 'Já existe um usuário com este e-mail' })
  email: string;

  @MinLength(6, { message: 'a senha precisa ter pelo menos 6 caracteres' })
  password: string;
}
