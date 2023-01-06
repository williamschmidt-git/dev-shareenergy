import { ObjectId } from 'bson';
import { Replace } from 'src/helpers/Replace';

export interface CustomerData {
  id?: string;
  address: string;
  cpf: string;
  phone_number: string;
  email: string;
  created_at: Date;
  updated_at?: Date | null;
}

export class Customer {
  // private _id: ObjectId;
  private props: CustomerData;

  constructor(
    props: Replace<CustomerData, { created_at?: Date }>,
    // id?: ObjectId,
  ) {
    // this._id = id ?? new ObjectId();
    this.props = {
      ...props,
      id: new ObjectId().toString(),
      created_at: props.created_at ?? new Date(),
    };
  }

  public get id(): string {
    return this.props.id;
  }

  public set address(address: string) {
    this.props.address = address;
  }

  public get address(): string {
    return this.props.address;
  }

  public set cpf(cpf: string) {
    this.props.cpf = cpf;
  }

  public get cpf(): string {
    return this.props.cpf;
  }

  public set phone_number(phone_number: string) {
    this.props.phone_number = phone_number;
  }

  public get phone_number(): string {
    return this.props.phone_number;
  }

  public set email(email: string) {
    this.props.email = email;
  }

  public get email() {
    return this.props.email;
  }

  public get created_at(): Date {
    return this.props.created_at;
  }

  public get updated_at(): Date | null | undefined {
    return this.props.updated_at;
  }

  public update() {
    this.props.updated_at = new Date();
  }
}
