import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { FirebaseError } from 'firebase/app';
import { User } from '@angular/fire/auth'
import { RegisterUserDTO } from 'src/app/dto/register-user-dto';
import { AuthService } from 'src/app/services/firebase/auth.service';
import { GlobalService } from 'src/app/shared/global.service';
import { TranslateLanguageService } from 'src/app/shared/translate-language.service';
import { ValidatorFormService } from 'src/app/shared/validator-form.service';
import { ConstantFirebase } from 'src/app/utils/constant-firebase';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
	passwordType1:string = 'password';
	passwordType2:string = 'password';

  registerForm: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3), this.validatorForm.noWhitespaceValidator()]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6), this.validatorForm.noWhitespaceValidator()]],
    confirmPassword: ['', [Validators.required, this.validatorForm.noWhitespaceValidator()]],
  });

  constructor(
    private navigation: NavController,
    private formBuilder: FormBuilder,
    public validatorForm: ValidatorFormService,
    private translate: TranslateLanguageService,
    private global: GlobalService,
    private authService: AuthService,
  ) { }

  ngOnInit() { }

  async onRegister() {

    if (this.registerForm.invalid || this.passwordsMatchError(this.registerForm)) {
      this.registerForm.markAllAsTouched();
      return;
    }
    const loader = await this.global.showLoader();
    try {
      const { name, email, password } = this.registerForm.value;
      const registerUserDto: RegisterUserDTO = { email, password, name }
      const userAuth = await this.authService.register(registerUserDto);
      this.userRegister(userAuth)
    } catch (error) {
      loader.dismiss()
      if (error instanceof FirebaseError) {
        if (error.message.includes(ConstantFirebase.INVALID_EMAIL_REGISTERED)) {
          this.global.errorToast(this.translate.getTranslate('auth.error.email_already_registered'));
          return;
        }
        this.global.errorToast();
        return;
      }
      this.global.errorToast();
      return;
    } finally {
      await loader.dismiss()
    }
  }


  async userRegister(userAuth: User) {
    this.authService.sendEmailVerificationUser(userAuth)
    await this.alertEmailVerification()
    this.navigationLogin()
  }

  navigationLogin() {
    this.navigation.back({ animated: true })
  }

  passwordsMatchError = (_form: FormGroup): boolean => {
    if (_form.controls['confirmPassword'].touched && _form.controls['confirmPassword'].value.trim() != '') {
      if (_form.value.password !== _form.value.confirmPassword) {
        return true;
      }
      return false;
    }
    return false;
  }


  async alertEmailVerification() {
    await this.global.showAlert(this.translate.getTranslate('auth.sign_up.information_email_verification'),
      this.translate.getTranslate('auth.sign_up.information'))
  }

  togglePasswordType1() {
		this.passwordType1 = this.passwordType1 === 'password' ? 'text' : 'password';
	}
  togglePasswordType2() {
		this.passwordType2 = this.passwordType2 === 'password' ? 'text' : 'password';
	}
}
