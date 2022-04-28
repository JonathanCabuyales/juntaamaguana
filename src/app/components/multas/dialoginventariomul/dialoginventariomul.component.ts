import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { ProsernuevoI } from 'src/app/models/prosernuevo.interface';
import { ProdservService } from 'src/app/services/prodserv.service';

@Component({
  selector: 'app-dialoginventariomul',
  templateUrl: './dialoginventariomul.component.html',
  styleUrls: ['./dialoginventariomul.component.css']
})
export class DialoginventariomulComponent implements OnInit {

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

  constructor(public dialogRef: MatDialogRef<DialoginventariomulComponent>, @Inject(MAT_DIALOG_DATA)
    public usuario: any,
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


  loadProdSer() {
    this._prodser.getAll().subscribe(res => {
      
      this.productosServicios = res;
      this.dataSource = new MatTableDataSource(this.productosServicios);
      this.dataSource.paginator = this.paginator;
    });
  }

  itemSelected(element){

    this.dialogRef.close(element);

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
