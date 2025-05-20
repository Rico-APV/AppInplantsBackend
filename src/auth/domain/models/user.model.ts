import { BaseModel } from '@/core/domain/models/base.model';
import { UserType } from '../types/user.type';
import { RoleModel } from './role.model';

export class UserModel extends BaseModel {
  private _userId: number;
  private _firstname: string;
  private _secondname: string;
  private _lastname: string;
  private _secondlastname: string;
  private _company: string;
  private _phone: string;
  private _email: string;
  private _password: string;
  private _roleId: number;
  private _role: RoleModel;

  public toJSON() {
    const aggregate = super.toJSON();

    return {
      userId: this._userId,
      uuid: this._uuid,
      firstname: this._firstname,
      secondname: this._secondname,
      lastname: this._lastname,
      secondlastname: this._secondlastname,
      company: this._company,
      phone: this._phone,
      email: this._email,
      password: this._password,
      roleId: this._roleId,
      role: this._role ? this._role.toJSON() : null,
      ...aggregate,
    };
  }

  get getLoginData() {
    return {
      userId: this._userId,
      roleId: this._roleId,
    };
  }

  set password(value: string) {
    this._password = value;
  }

  static create(data: Partial<UserType>) {
    const newUser = new UserModel();

    newUser._firstname = data.firstname;
    newUser._secondname = data.secondname;
    newUser._lastname = data.lastname;
    newUser._secondlastname = data.secondlastname;
    newUser._company = data.company;
    newUser._phone = data.phone;
    newUser._email = data.email;
    newUser._password = data.password;
    newUser._roleId = data.roleId;

    return newUser;
  }

  static hydrate(data: Partial<UserType>) {
    const newUser = new UserModel();

    newUser._userId = data.userId;
    newUser._uuid = data.uuid;
    newUser._firstname = data.firstname;
    newUser._secondname = data.secondname;
    newUser._lastname = data.lastname;
    newUser._secondlastname = data.secondlastname;
    newUser._company = data.company;
    newUser._phone = data.phone;
    newUser._email = data.email;
    newUser._password = data.password;
    newUser._roleId = data.roleId;
    newUser._role = data.role ? RoleModel.hydrate(data.role) : null;

    return newUser;
  }
}
