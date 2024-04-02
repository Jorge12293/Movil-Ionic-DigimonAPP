import { Injectable } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
  User,
  sendEmailVerification
} from '@angular/fire/auth';
import { FirebaseError } from 'firebase/app';
import { LoginUserDTO } from 'src/app/dto/login-user-dto';
import { RegisterUserDTO } from 'src/app/dto/register-user-dto';
import { UserSession } from 'src/app/interfaces/user-session';
import { LocalService } from 'src/app/shared/local.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  pathUserKey: string = "user_key";
  private _user: UserSession | null = null;

  constructor(
    private auth: Auth,
    private local: LocalService,
  ) { }

  async login({ email, password }: LoginUserDTO): Promise<User> {
    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
      const user = userCredential.user;
      return user;
    } catch (error) {
      throw (error);
    }
  }


  async register({ name, email, password }: RegisterUserDTO): Promise<User> {
    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
      const user = userCredential.user;
      await this.updateProfileUser(user, name);
      return user;
    } catch (error) {
      throw (error);
    }
  }

  async updateProfileUser(user: User, name: string): Promise<boolean> {
    try {
      await updateProfile(user, { displayName: name });
      return true;
    } catch (error) {
      throw (error);
    }
  }

  async sendEmailVerificationUser(user: User): Promise<boolean> {
    try {
      await sendEmailVerification(user)
      return true;
    } catch (error) {
      throw (error);
    }
  }

  async logout(): Promise<boolean> {
    try {
      await signOut(this.auth);
      return true;
    } catch (error) {
      throw (error);
    }
  }

  async getUserLocal(): Promise<UserSession | null> {
    return await this.local.getData<UserSession>(this.pathUserKey)
  }
  async saveUserLocal(userSession: UserSession) {
    await this.local.setData({ ...userSession }, this.pathUserKey)
  }
  async removeUserLocal() {
    return await this.local.removeData(this.pathUserKey)
  }


  public get user(): UserSession | null {
    return this._user;
  }
  public set user(value: UserSession | null) {
    this._user = value;
  }
}
