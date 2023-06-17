import { Component, OnInit } from '@angular/core';
import { Auth, signInWithEmailAndPassword, updatePassword } from '@angular/fire/auth';
import { Firestore, doc, docData } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ConfirmPassword } from 'src/app/shared/confirm.validators';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit {
  public passwordForm!: FormGroup;
  public userEmail!: string;

  constructor(
    private afs: Firestore,
    private auth: Auth,
    private toastr: ToastrService,
    private fb: FormBuilder
  ) {}
  ngOnInit(): void {
    this.initForm();
    this.getUserEmail();
  }

  initForm(): void {
    this.passwordForm = this.fb.group({
      old: [null, Validators.required],
      new: [null, Validators.required],
      confirm: [null, [Validators.required, ConfirmPassword('new')]],
    });
  }
  getUserEmail(): void{
    if (localStorage.length > 0 && localStorage.getItem('currentUser')) {
      const user = JSON.parse(localStorage.getItem('currentUser') as string);
      this.userEmail = user.email;
    }
  }

  changePassword(): void {
    this.checkPassword()
      .then(() => {
        this.passwordForm.reset();
        this.toastr.success('Пароль успішно змінено');
      })
      .catch((e) => {
        this.toastr.error(e.message);
      });
  }
  async checkPassword(): Promise<void> {
    const credential = await signInWithEmailAndPassword(
      this.auth,
      this.userEmail,
      this.passwordForm.get('old')?.value
    );
    updatePassword(credential.user, this.passwordForm.get('new')?.value);
  }
}
