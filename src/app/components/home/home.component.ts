import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from 'src/app/services/login.service';
import { DialogperfilusuarioComponent } from '../perfilusuario/dialogperfilusuario/dialogperfilusuario.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @ViewChild('sidenav') sidenav: MatSidenav;
  isExpanded = false;
  showSubmenu: boolean = false;
  isShowing = false;
  showSubSubMenu: boolean = false;
  token: string;
  usuario: string;
  rol: string;
  foto: string = '';

  constructor(private toastr: ToastrService,
    public dialog: MatDialog,
    private router: Router,
    private _login: LoginService,
    private _cookie: CookieService) { }

  ngOnInit(): void {
    // this.token = this._cookie.get("token");

    // this._login.getuserdata(this.token).subscribe(res=>{
    //   this.usuario = res.data.usuario;
    //   this.rol = res.data.rol;
    //   this.foto = res.data.foto;      
    // });
  }

  mouseenter() {
    if (!this.isExpanded) {
      this.isShowing = true;
    }
  }

  mouseleave() {
    if (!this.isExpanded) {
      this.isShowing = false;
    }
  }

  // perfilUsuario(){
  //   const dialogRef = this.dialog.open(DialogperfilusuarioComponent, {
  //     width: '550px'
  //   });

  //   dialogRef.afterClosed().subscribe(res => {

  //     if (res != undefined) {
        
  //     }
  //   });
  // }

  salir(){
    this.router.navigate(['']);

  }

  toastSuccess(mensaje: string) {
    this.toastr.success(mensaje, 'Sesión Iniciada', {
      timeOut: 3000,
    });
  }

}
