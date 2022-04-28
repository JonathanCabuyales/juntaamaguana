import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ClienteI } from 'src/app/models/cliente.interface';
import { ClienteserService } from 'src/app/services/clienteser.service';
import { DialogclientesComponent } from 'src/app/components/clientes/dialogclientes/dialogclientes.component';
import { DialogconfirmacionComponent } from 'src/app/components/productosservicios/dialogconfirmacion/dialogconfirmacion.component';
import { DialognuevomedidorComponent } from 'src/app/components/clientes/dialognuevomedidor/dialognuevomedidor.component';
import { CookieService } from 'ngx-cookie-service';
import { BdemapaService } from 'src/app/services/bdemapa.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  // cargo la interfaz de la tabla 
  displayedColumns: string[] = ['estadocli', 'cliente', 'ciruc', 'direccion', 'email', 'telefono', 'editar'];
  dataSource: MatTableDataSource<any>;

  @ViewChild('nuevaconexion', { static: false }) nuevaconexion: DialognuevomedidorComponent;

  active = 0;


  @ViewChild(MatPaginator) paginator: MatPaginator;

  // variables para guardar clientes
  cliente: ClienteI;
  clientes: ClienteI[];

  constructor(public dialog: MatDialog,
    public _cliente: ClienteserService,
    private toastr: ToastrService,
    private cookieservice: CookieService,
    private _bd: BdemapaService) { }

  ngOnInit(): void {
    this.loadClientes();
  }

  loadClientes() {
    let token = this.cookieservice.get('token');

    this._cliente.getAll(token).subscribe(res => {
      
      this.clientes = res;
      this.dataSource = new MatTableDataSource(this.clientes);
      this.dataSource.paginator = this.paginator;
    });

  }

  excel(){
    this._cliente.getclientebarrios('TODO').subscribe(res=>{
      this._bd.exportToExcel(res, "clientes");

    });
  }

  onTabChange(e) {
    if(e == 0){
      this.loadClientes();
    }
    // else if(e == 1){
    //   this.nuevaconexion.ngOnInit();
    // }
  }

  // Abrir dialogo para agregar cliente a la base de datos
  createCliente() {
    const dialogRef = this.dialog.open(DialogclientesComponent, {
      width: '450px'
    }
    );

    dialogRef.afterClosed().subscribe(res => {

      if (res != undefined) {
        this.cliente = res;
        
        this._cliente.createCliente(this.cliente).subscribe(res => {
          
          console.log(res);
          
          if (res) {
            this.loadClientes();
            this.toastSuccess("grabado");
          } else {
            this.toastError("Tenemos problemas para guardar el registro intentalo nuevamente");
          }
          
        });
      }
    });
  }

  // abro el dialogo para editar los clientes cargando la informacion
  editCliente(clienteUpdate: ClienteI) {
    const dialogRef = this.dialog.open(DialogclientesComponent, {
      width: '450px',
      data: clienteUpdate
    }
    );

    dialogRef.afterClosed().subscribe(res => {

      if (res != undefined) {
        this.cliente = res;
        this._cliente.updateCliente(this.cliente).subscribe(datos => {
                    
          if (datos) {
            this.loadClientes();
            this.toastSuccess("actualizado");
          }
        });

      }
    });

  }
  
  // elimino el cliente con el campo id
  deleteCliente(idCliente: any) {
    // eliminar los clientes
    const dialogRef = this.dialog.open(DialogconfirmacionComponent, {
      width: '350px'
    }
    );

    dialogRef.afterClosed().subscribe(res => {

      if (res != undefined) {        
        this._cliente.deleteCliente(idCliente).subscribe(res => {
          if (res['resultado']=='OK') {
            this.loadClientes();
            this.toastSuccess("borrado");
          }
        });
      }
    });
  }
  
  // mensaje de confirmacion al realizar un registro, actualiza o elimniar
  toastSuccess(mensaje: string) {
    this.toastr.success('Registro ' + mensaje + ' exitosamente!!!', 'Exito', {
      timeOut: 3000,
    });
  }

  toastError(mensaje: string) {
    this.toastr.error(mensaje, 'ERROR', {
      timeOut: 4000,
    });
  }

  // funcion para filtro de busqueda
  applyFilter(filtro: string){
     filtro = filtro.trim(); // Remove whitespace
     filtro = filtro.toLowerCase(); // MatTableDataSource defaults to lowercase matches
     this.dataSource.filter = filtro;
 }

}
