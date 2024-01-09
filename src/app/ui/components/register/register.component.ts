import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { debug } from 'console';
import { User } from '../../../entities/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {
  kullaniciForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.kullaniciForm = this.fb.group({
      adSoyad: ['', [Validators.required,
                     Validators.maxLength(50),
                     Validators.minLength(3)]],
      kullaniciAdi: ['', [Validators.required,
                            Validators.maxLength(50),
                            Validators.minLength(3)]],
      eposta: ['', [Validators.required,
                    Validators.email,
                    Validators.maxLength(250)]],
      sifre: ['', [Validators.required,
                   Validators.maxLength(50),
                   Validators.minLength(3)]],
      sifreTekrar: ['', [Validators.required,
                         Validators.maxLength(50),
        Validators.minLength(3)]],

    }, { validators: this.passwordMatchValidator() });
  }

  submitForm(data: User) {
    if (this.kullaniciForm.valid) {
      console.log('Form gönderildi', this.kullaniciForm.value);
      // Burada formu sunucuya gönderme işlemleri yapılabilir.
    } else {
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
      const password = control.get('sifre')?.value;
      const confirmPassword = control.get('sifreTekrar')?.value;

      return password === confirmPassword ? null : { 'passwordMismatch': true };
    };
  }

}
