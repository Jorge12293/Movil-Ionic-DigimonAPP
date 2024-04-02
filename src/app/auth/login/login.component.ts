import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AuthService } from '../../services/firebase/auth.service';
import { LoginUserDTO } from '../../dto/login-user-dto';
import { GlobalService } from 'src/app/shared/global.service';
import { UserSession } from '../../interfaces/user-session';
import { AppRoutes } from 'src/app/urls/app-routes';
import { FirebaseError } from 'firebase/app';
import { ConstantFirebase } from 'src/app/utils/constant-firebase';
import { TranslateLanguageService } from 'src/app/shared/translate-language.service';
import { ValidatorFormService } from 'src/app/shared/validator-form.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent  implements OnInit {
  passwordTypeOne:string = 'password';
  loginForm: FormGroup= this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6),this.validatorForm.noWhitespaceValidator()]],
  });
  constructor(
    private navigation:NavController,
    private formBuilder: FormBuilder,
    private authService:AuthService,
    private global : GlobalService,
    private translate:TranslateLanguageService,
    public validatorForm: ValidatorFormService
  ) {}

  ngOnInit() {}

  async onLogin(){
    if(this.loginForm.invalid){
      this.loginForm.markAllAsTouched();
      return;
    }
    const loader = await this.global.showLoader();
    try {
      const {email,password} = this.loginForm.value;
      const loginUserDto : LoginUserDTO = {email,password}
      const userAuth = await this.authService.login(loginUserDto);
      const {displayName,emailVerified,uid} = userAuth;
      if(!emailVerified){
        this.global.warningToast(this.translate.getTranslate('auth.error.unverified_email'));
        return;
      }
      this.sessionOK({email,emailVerified,uid,displayName})
    } catch (error) {
      if (error instanceof FirebaseError) {
        if(error.message.includes(ConstantFirebase.INVALID_CREDENTIAL) ){
          this.global.errorToast(this.translate.getTranslate('auth.error.invalid_credentials'));
          return;
        }
        this.global.errorToast();
        return;
      }
      this.global.errorToast();
      return;
    }finally{
      loader.dismiss()
    }
  }

	togglePasswordTypeOne() {
		this.passwordTypeOne = this.passwordTypeOne === 'password' ? 'text' : 'password';
	}

  sessionOK({email,emailVerified,uid,displayName}:UserSession){
    const userSession:UserSession={displayName,email,emailVerified,uid};
    this.authService.saveUserLocal(userSession)
    this.navigation.navigateForward(AppRoutes.pagesHome,{animated: true})
  }


  navigationRegister(){
    this.navigation.navigateForward(AppRoutes.authRegister,{animated: true})
  }

}


