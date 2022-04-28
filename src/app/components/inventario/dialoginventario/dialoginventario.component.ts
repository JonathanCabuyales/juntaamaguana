import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ProsernuevoI } from 'src/app/models/prosernuevo.interface';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { ProdservService } from 'src/app/services/prodserv.service';
import { DialogasignarempleadoComponent } from '../dialogasignarempleado/dialogasignarempleado.component';
import { DialogProSerComponent } from '../../productosservicios/dialog-pro-ser/dialog-pro-ser.component';
import { DialogconfirmacionComponent } from '../../productosservicios/dialogconfirmacion/dialogconfirmacion.component';
import { DialogeditinventarioComponent } from '../dialogeditinventario/dialogeditinventario.component';

@Component({
  selector: 'app-dialoginventario',
  templateUrl: './dialoginventario.component.html',
  styleUrls: ['./dialoginventario.component.css']
})
export class DialoginventarioComponent implements OnInit{

  displayedColumns: string[] = ['nombre', 'categoria', 'descripcion', 'cantidad', 'precio', 'foto','asignar'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  // variables de combo box
  opcionSeleccionado: string = '0';
  verSeleccion: string = '';
  causas: any;

  // interfaz para cargar todos los productos
  productosServicios: ProsernuevoI[];

  // variables para registro de un nuevo PROD/SERV
  nuevoProductoServicio: ProsernuevoI;
  prodSerAct: ProsernuevoI;
  prodSerActInv: ProsernuevoI;

  constructor(
    private _prodser: ProdservService,
    private toastr: ToastrService,
    public dialog: MatDialog) { }

  ngOnInit() {
    // se cargan todos los productos y servicios de la base de datos
    this.loadProdSer();
    this.nuevoProductoServicio = {
      id_proser: 0,
      codigo_proser: '',
      categoria_proser: '',
      nombre_proser: '',
      descripcion_proser: '',
      precio_proser: 0,
      cantidad_proser: 1,
      cantidadfinal_proser: 0,
      tipobien_proser: '',
      unidadmedida_proser: '',
      marca_proser: '',
      modelo_proser: '',
      serie_proser: '',
      estado_proser: '',
      foto: '',
      created_at: ''
    }
  }

  capturar() {
    // Pasamos el valor seleccionado a la variable verSeleccion
    this.verSeleccion = this.opcionSeleccionado;
  }

  // funcion para abrir el dialogo y guardar el producto o servicio
  createProSer() {
    const dialogRef = this.dialog.open(DialogProSerComponent, {
      width: '450px'
    });

    dialogRef.afterClosed().subscribe(res => {

      if (res != undefined) {
        this.nuevoProductoServicio = res;
        this._prodser.createProdSer(this.nuevoProductoServicio).subscribe(res => {

          if (res == true) {
            this.toastSuccess("grabado");
            this.loadProdSer();
          }
          
        }, error => {
          this.toastError(error);
        }
        );
      }
    });
  }


  editarProdser(prodserUpdate: any) {

    const dialogRef = this.dialog.open(DialogeditinventarioComponent, {
      width: '450px',
      data: prodserUpdate
    }
    );

    dialogRef.afterClosed().subscribe(res => {

      if (res != undefined) {
        this.prodSerAct = res;

        this._prodser.updateProdSer(this.prodSerAct).subscribe(res => {
          
          if (res) {
            this.toastSuccess("actualizado");
            this.loadProdSer();
          }
        });
      }

    });

  }

  deleteProdSer(id_proser: any) {
    const dialogRef = this.dialog.open(DialogconfirmacionComponent, {
      width: '350px'
    }
    );

    dialogRef.afterClosed().subscribe(res => {
      if (res != undefined) {
        this._prodser.deleteProdSer(id_proser).subscribe(res => {
          if (res['resultado'] == 'OK') {
            this.loadProdSer();
            this.toastSuccess("borrado");
          }
        }, error => {
          this.toastError(error);
        });
      }
    });
  }

  loadProdSer() {
    this._prodser.getAll().subscribe(res => {
      
      this.productosServicios = res;
      this.dataSource = new MatTableDataSource(this.productosServicios);
      this.dataSource.paginator = this.paginator;
    });
  }

  // seccion para asignacion de empleados
  asignarEmpleado(item: ProsernuevoI) {

    const dialogRef = this.dialog.open(DialogasignarempleadoComponent, {
      width: '700px',
      data: item
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res != undefined) {

        this.prodSerActInv = res;
        this._prodser.updateProdSer(this.prodSerActInv).subscribe(res => {          
          if (res == true) {
            this.toastSuccess("El inventario general se ha actualizado exitosamenete!!!!!");
            this.loadProdSer();
          }
        }, error => {          
          this.toastError(error);
        });

      }
    });

  }

  // funcion para filtro de busqueda
  applyFilter(filtro: string) {
    filtro = filtro.trim(); // Remove whitespace
    filtro = filtro.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filtro;
  }

  toastSuccess(mensaje: string) {
    this.toastr.success(mensaje, 'Exito', {
      timeOut: 3000,
    });
  }

  toastError(mensaje: string) {
    this.toastr.error('Ha ocurrido un problema, intentelo nuevamente más tarde ' + mensaje, 'ERROR', {
      timeOut: 3000,
    });
  }

}
