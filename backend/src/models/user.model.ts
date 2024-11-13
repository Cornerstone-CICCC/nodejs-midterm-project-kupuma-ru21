import { v4 as uuidv4 } from "uuid";
import { User } from "../types/user";

class UserModel {
  private users: User[] = [];

  createUser(newUser: Omit<User, "id">): User {
    const user = {
      id: uuidv4(),
      ...newUser,
    };
    this.users.push(user);
    return user;
  }

  findByEmail(email: string): User | null {
    return this.users.find((user) => user.email === email) ?? null;
  }
}

export default new UserModel();
