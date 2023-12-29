import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../../interfaces/user';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { ModalAddUserComponent } from './modal-add-user/modal-add-user.component';
import { UsersService } from '../../services/users.service';
import { ModalViewUserComponent } from './modal-view-user/modal-view-user.component';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.scss'
})
export class UsuariosComponent implements OnInit {

  listUsers: User[] = [];
  displayedColumns: string[] = ['id', 'name', 'email', 'role', 'benefits', 'actions'];
  dataSource: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    public dialog: MatDialog,
    private usersService: UsersService,
    ) {
      this.dataSource = new MatTableDataSource<any>(this.listUsers);
    }

  ngOnInit() {
    this.getListUsers();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getListUsers() {

    this.usersService.getAllUsers().subscribe({
      next: (response) => {
        this.listUsers = response;

        this.dataSource = new MatTableDataSource<any>(this.listUsers);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => {
        console.error(err);
      }
    });
    
  }

  deleteUser(firebaseId: string) {
    this.usersService.deleteUser(firebaseId).then(
      (response: any) => {
        window.alert('Usuário excluido com sucesso!')
    });
  }

  openModalAddUser() {
    this.dialog.open(ModalAddUserComponent,{
      width: '700px',
      height: '400px'
    }).afterClosed().subscribe(() => this.getListUsers());
  }

  openModalEdit(user: User) {
    this.dialog.open(ModalAddUserComponent,{
      width: '700px',
      height: '400px',
      data: user
    }).afterClosed().subscribe(() => this.getListUsers());
  }

  openModalViewUser(user: User) {
    this.dialog.open(ModalViewUserComponent,{
      width: '700px',
      height: '330px',
      data: user
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
