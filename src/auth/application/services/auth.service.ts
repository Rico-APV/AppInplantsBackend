import { RecoveryPasswordModel } from '@/auth/domain/models/recovery-password.model';
import { UserModel } from '@/auth/domain/models/user.model';
import { IRecoveryPasswordRepository } from '@/auth/domain/repositories/recovery-password.interface.repository';
import { IRoleRepository } from '@/auth/domain/repositories/role.interface.repository';
import { IUserRepository } from '@/auth/domain/repositories/user.interface.repository';
import { IAuthService } from '@/auth/domain/services/auth.interface.service';
import { UserType } from '@/auth/domain/types/user.type';
import SymbolsAuth from '@/auth/symbols-auth';
import {
  comparePassword,
  hashPassword,
} from '@/core/domain/utilities/bcrypt.util';
import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RpcException } from '@nestjs/microservices';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @Inject(SymbolsAuth.IUserRepository)
    private readonly userRepository: IUserRepository,
    @Inject(SymbolsAuth.IRoleRepository)
    private readonly roleRepository: IRoleRepository,
    @Inject(SymbolsAuth.IRecoveryPasswordRepository)
    private readonly recoveryPasswordRepository: IRecoveryPasswordRepository,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * The function `login` in TypeScript is an asynchronous function that handles user authentication by
   * checking the email and password, generating a JWT token, and returning the user information along
   * with the token.
   * @param {string} email - The `email` parameter in the `async login` function is a string that
   * represents the email address of the user trying to log in.
   * @param {string} password - The `password` parameter in the `async login` function is a string that
   * represents the password input provided by the user during the login process. This password will be
   * compared with the password stored in the database for the corresponding user to authenticate and
   * authorize the login attempt.
   * @returns The `login` function returns an object containing the user data and a token. The user
   * data is retrieved from the database and converted to JSON format. The token is generated using the
   * `jwtService.sign` method with the user's login data and an expiration time of 1 day.
   */
  async login(email: string, password: string): Promise<any> {
    const user = await this.userRepository.findOneByEmail(email);
    if (!user)
      throw new RpcException({
        status: HttpStatus.NOT_FOUND,
        message: 'Usuario not found',
      });

    const isPasswordValid = await comparePassword(
      password,
      user.toJSON().password,
    );
    if (!isPasswordValid)
      throw new RpcException({
        status: HttpStatus.NOT_FOUND,
        message: 'Usuario or password invalid',
      });

    const token = this.jwtService.sign(
      { ...user.getLoginData },
      {
        expiresIn: '1d',
      },
    );

    return {
      user: user.toJSON(),
      token,
    };
  }

  /**
   * The function `register` takes a partial user object and a role UUID, retrieves the role from the
   * repository, checks if the role exists, hashes the user's password, creates a new user, and returns
   * the created user object.
   * @param user - The `register` function you provided is an asynchronous function that takes a
   * partial user object and a UUID role string as parameters. The function first retrieves the role
   * based on the UUID provided, then checks if the role exists. If the role does not exist, it throws
   * an exception with a message indicating that
   * @param {string} uuidRole - The `uuidRole` parameter in the `register` function is a string that
   * represents the unique identifier of a role. This identifier is used to find the corresponding role
   * in the role repository.
   * @returns The function `register` is returning the created user as a JSON object after successfully
   * creating a new user in the database.
   */
  async register(user: Partial<UserType>, uuidRole: string): Promise<any> {
    const role = await this.roleRepository.findOneByUUID(uuidRole);

    if (!role)
      throw new RpcException({
        status: HttpStatus.BAD_REQUEST,
        message: 'Role not found',
      });

    user.roleId = role.toJSON().roleId;

    if (!role)
      throw new RpcException({
        status: HttpStatus.BAD_REQUEST,
        message: 'Role not found',
      });

    const userExists = await this.userRepository.findOneByEmail(user.email);
    if (userExists)
      throw new RpcException({
        status: HttpStatus.BAD_REQUEST,
        message: 'User already exists',
      });

    const hashedPassword = await hashPassword(user.password);
    user.password = hashedPassword;

    const newUser = UserModel.create(user);

    // Send email with confirmation
    const createdUser = await this.userRepository.create(newUser);
    return createdUser.toJSON();
  }

  /**
   * The function generates a recovery password for a user, sends an email with a token for password
   * recovery, and returns the created recovery password.
   * @param {string} email - The `generateRecoveryPassword` function is an asynchronous function that
   * generates a recovery password for a user based on their email address. Here's a breakdown of the
   * process:
   * @returns The `generateRecoveryPassword` function returns the created recovery password object in
   * JSON format.
   */
  async generateRecoveryPassword(email: string): Promise<any> {
    const user = await this.userRepository.findOneByEmail(email);
    if (!user)
      throw new RpcException({
        status: HttpStatus.NOT_FOUND,
        message: 'Usuario no encontrado',
      });

    const token = uuidv4();

    const recoveryPassword = RecoveryPasswordModel.create({
      userId: user.toJSON().userId,
      token,
      status: false,
    });

    const createdRecoveryPassword =
      await this.recoveryPasswordRepository.create(recoveryPassword);

    try {
      // Send email with token
    } catch (error) {
      console.log(error);
    }

    return createdRecoveryPassword.toJSON();
  }

  /**
   * The function `validateToken` checks the validity of a token by verifying its existence, status,
   * and expiration date, and throws an error if the token is invalid or expired.
   * @param {string} token - The `validateToken` function you provided is used to validate a token for
   * password recovery. It checks if the token is valid, not expired, and associated with a specific
   * user ID. If any of these conditions are not met, it throws an exception with a message indicating
   * that the URL is invalid or
   * @returns The `validateToken` function returns the JSON representation of the `recoveryPassword`
   * object if the token is valid and has not expired.
   */
  async validateToken(token: string): Promise<any> {
    const recoveryPassword =
      await this.recoveryPasswordRepository.findOneByToken(token);
    if (!recoveryPassword)
      throw new RpcException({
        status: HttpStatus.NOT_FOUND,
        message: 'URL invalid or expired',
      });

    if (recoveryPassword.toJSON().status) {
      await this.recoveryPasswordRepository.desactivateTokensByUserId(
        recoveryPassword.toJSON().userId,
      );
      throw new RpcException({
        status: HttpStatus.NOT_FOUND,
        message: 'URL invalid or expired',
      });
    }

    const initialDate = recoveryPassword.toJSON().createdAt;
    const currentDate = new Date();
    const diff = currentDate.getTime() - initialDate.getTime();
    const diffInDays = diff / (1000 * 3600 * 24);

    if (diffInDays > 1) {
      await this.recoveryPasswordRepository.desactivateTokensByUserId(
        recoveryPassword.toJSON().userId,
      );
      throw new RpcException({
        status: HttpStatus.NOT_FOUND,
        message: 'URL invalid or expired',
      });
    }

    return recoveryPassword.toJSON();
  }

  /**
   * This TypeScript function changes the password for a user identified by their ID after hashing the
   * new password.
   * @param {number} userId - The `userId` parameter is a number that represents the unique identifier
   * of the user whose password is being changed.
   * @param {string} password - The `changePassword` function is an asynchronous function that takes in
   * a `userId` of type number and a `password` of type string as parameters. The function first
   * retrieves a user from the repository based on the provided `userId`. If the user is not found, it
   * throws an exception with a
   * @returns The `changePassword` function is returning the updated user object in JSON format after
   * updating the password.
   */
  async changePassword(userId: number, password: string): Promise<any> {
    const user = await this.userRepository.findOneById(userId);
    if (!user)
      throw new RpcException({
        status: HttpStatus.NOT_FOUND,
        message: 'Usuario no encontrado',
      });

    const hashedPassword = await hashPassword(password);
    user.password = hashedPassword;

    const updatedUser = await this.userRepository.update(user);
    return updatedUser.toJSON();
  }

  /**
   * The function `changePasswordByToken` changes a user's password using a token for password
   * recovery.
   * @param {string} token - A unique token that is used to verify the user's identity and allow them
   * to change their password.
   * @param {string} password - The `password` parameter in the `changePasswordByToken` function
   * represents the new password that the user wants to set for their account.
   * @returns The `changePasswordByToken` function returns a Promise that resolves to the `newUser`
   * object after changing the password, deactivating tokens by user ID, and validating the token.
   */
  async changePasswordByToken(token: string, password: string): Promise<any> {
    const recoveryPassword = await this.validateToken(token);

    const newUser = await this.changePassword(
      recoveryPassword.userId,
      password,
    );

    await this.recoveryPasswordRepository.desactivateTokensByUserId(
      recoveryPassword.userId,
    );

    return newUser;
  }
}
