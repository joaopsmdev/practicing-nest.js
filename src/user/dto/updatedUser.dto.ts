import { IsEmail, MinLength, IsNotEmpty, IsOptional } from 'class-validator';
import { EmailValidatorUnique } from '../validators/email.validator';

export class UpdatedUserDto {
  @IsNotEmpty({ message: 'o Nome não pode ser vazio' })
  @IsOptional()
  nome: string;

  @IsEmail(undefined, { message: 'o email informado é invalido' })
  @EmailValidatorUnique({ message: 'Já existe um usuário com este e-mail' })
  @IsOptional()
  email: string;

  @MinLength(6, { message: 'a senha precisa ter pelo menos 6 caracteres' })
  @IsOptional()
  password: string;
}
