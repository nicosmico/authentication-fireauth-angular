import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { User } from '../core/models/user.model';
import { UsersService } from '../core/services/users.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  currentUser: any = null;
  userPhone!: string;

  constructor(
    private authService: AuthService,
    private userService: UsersService
  ) { }

  ngOnInit(): void {
    this.getUserInfo();
  }

  logout(){
    this.authService.logout()
      .then(response => console.log("Usuario deslogeado", response))
      .catch(response => console.log("Error al deslogear", response));
  }

  getUserInfo(){
    this.authService.authState().subscribe(state =>{
      this.currentUser = state;
      if(state){
        this.getPhone(this.currentUser.email);
      }
    });
  }

  getPhone(email: string){
    this.userService.getUser(email).subscribe((user: any) => {
      this.userPhone = user.phone;
    });
  }
}
