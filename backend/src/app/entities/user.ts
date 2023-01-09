import { ObjectId } from 'bson';

export interface UserData {
  id?: string;
  username: string;
  password: string;
}

export class User {
  private props: UserData;

  constructor(props: UserData) {
    this.props = {
      ...props,
      id: new ObjectId().toString(),
    };
  }

  public get id(): string {
    return this.props.id;
  }

  public set username(username: string) {
    this.props.username = username;
  }

  public get username(): string {
    return this.props.username;
  }

  public set password(password: string) {
    this.props.password = password;
  }

  public get password(): string {
    return this.props.password;
  }
}
