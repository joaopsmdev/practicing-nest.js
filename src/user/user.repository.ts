import { UserEntity } from './user.entity';

export class userRepository {
  private users: UserEntity[] = [];

  async saveUsers(users: UserEntity) {
    this.users.push(users);
    console.log(this.users);
  }

  async showUsers() {
    return this.users;
  }

  async showUserEmail(email: string) {
    const possibleUser = this.users.find((user) => user.email === email);
    return possibleUser !== undefined;
  }

  private findWithID(id: string) {
    const possibleUser = this.users.find((user) => user.id === id);
    if (!possibleUser) {
      throw new Error('Usuário não encontrado');
    }
    return possibleUser;
  }

  async putUser(id: string, users: Partial<UserEntity>) {
    const user = this.findWithID(id);
    Object.entries(users).forEach(([key, value]) => {
      if (key === 'id') {
        return;
      }

      user[key] = value;
    });

    return user;
  }

  async removeUser(id: string) {
    const user = this.findWithID(id);
    this.users = this.users.filter((user) => user.id !== id);

    return user;
  }
}
