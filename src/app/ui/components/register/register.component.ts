import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { User } from '../../../entities/user';
import { UserService } from '../../../services/common/models/user.service';
import { Create_User } from '../../../contracts/users/create_user';
import { CustomeToastrService, ToastrMessageType, ToastrPosition } from '../../../services/ui/custome-toastr.service';
import { MessageType, Position } from '../../../services/admin/alertify.service';
import { debug } from 'util';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {
  kullaniciForm: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService, private toastrService: CustomeToastrService) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.kullaniciForm = this.fb.group({
      nameSurname: ['', [Validators.required,
                     Validators.maxLength(50),
                     Validators.minLength(3)]],
      username: ['', [Validators.required,
                            Validators.maxLength(50),
                            Validators.minLength(3)]],
      email: ['', [Validators.required,
                    Validators.email,
                    Validators.maxLength(250)]],
      password: ['', [Validators.required,
                   Validators.maxLength(50),
                   Validators.minLength(3)]],
      passwordConfirm: ['', [Validators.required,
                         Validators.maxLength(50),
        Validators.minLength(3)]],

    }, { validators: this.passwordMatchValidator() });
  }

  async submitForm(data: User) {
    if (this.kullaniciForm.valid) {
      const result: Create_User = await this.userService.create(data);
      if (result.success) {
        this.toastrService.message(result.message, "Başarılı", { messageType: ToastrMessageType.Success, position: ToastrPosition.TopRight })
      }
      else {
        this.toastrService.message(result.message, "Hatalı", { messageType: ToastrMessageType.Error, position: ToastrPosition.TopRight })
      }
    }
    else{
      console.log('Form geçerli değil', this.kullaniciForm.value);
    }
  }

  get component() {
    console.log(this.kullaniciForm.controls);
    return this.kullaniciForm.controls;
  }

  isFieldInvalid(fieldName: string): boolean {
    const control = this.kullaniciForm.get(fieldName);
    return control.invalid && (control.dirty || control.touched);
  }

  passwordMatchValidator(): ValidatorFn {
    return (control: FormGroup): { [key: string]: boolean } | null => {
      const password = control.get('password')?.value;
      const confirmPassword = control.get('passwordConfirm')?.value;

      return password === confirmPassword ? null : { 'passwordMismatch': true };
    };
  }

}
