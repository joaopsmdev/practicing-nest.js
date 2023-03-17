import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { userRepository } from '../user.repository';

@Injectable()
@ValidatorConstraint({ async: true })
export class EmailValidator implements ValidatorConstraintInterface {
  constructor(private userRepo: userRepository) {}

  async validate(
    value: any,
    validationArguments?: ValidationArguments,
  ): Promise<boolean> {
    const userExists = await this.userRepo.showUserEmail(value);
    return !userExists;
  }
}

export const EmailValidatorUnique = (validateOptions: ValidationOptions) => {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return (obj: Object, props: string) => {
    registerDecorator({
      target: obj.constructor,
      propertyName: props,
      options: validateOptions,
      constraints: [],
      validator: EmailValidator,
    });
  };
};
