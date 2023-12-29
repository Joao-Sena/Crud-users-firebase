import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UsersService } from '../../../services/users.service';

@Component({
  selector: 'app-modal-add-user',
  templateUrl: './modal-add-user.component.html',
  styleUrl: './modal-add-user.component.scss'
})
export class ModalAddUserComponent implements OnInit {

  public formUser: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ModalAddUserComponent>,
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    ) {}

  ngOnInit() { this.buildForm(); }

  saveUser() {
    const dataUser = this.formUser.getRawValue();

    if(this.data && this.data.name) {
      this.usersService.update(dataUser, this.data.firebaseId).then((response: any) => {
        window.alert('Usuário alterado com sucesso');
        this.closeModal();
      })
      .catch(err => {
        window.alert('Erro ao editar o usuário');
      });
      
    } else {
      this.usersService.addUser(dataUser).then((response: any) => {
        window.alert('Usuário cadastrado com sucesso');
        this.closeModal();
      })
      .catch(err => {
        window.alert('Erro ao cadastrar o usuário');
      });
    }
  }

  buildForm() {
    this.formUser = this.formBuilder.group({
      name: [null, [Validators.required, Validators.minLength(3)]],
      email: [null, [Validators.required, Validators.email]],
      sector: [null, [Validators.required, Validators.minLength(2)]],
      role: [null, [Validators.required, Validators.minLength(5)]],
      healthPlan: [''],
      dentalPlan: [''],
    });

    if(this.data && this.data.name) {
      this.fillForm();
    }
  }

  fillForm() {
    this.formUser.patchValue({
      name: this.data.name,
      email: this.data.email,
      sector: this.data.sector,
      role: this.data.role,
      healthPlan: this.data.healthPlan,
      dentalPlan: this.data.dentalPlan,
    });
  }

  closeModal() { this.dialogRef.close(); }

}
