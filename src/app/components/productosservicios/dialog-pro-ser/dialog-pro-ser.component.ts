import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProsernuevoI } from 'src/app/models/prosernuevo.interface';
import { ProdservService } from 'src/app/services/prodserv.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dialog-pro-ser',
  templateUrl: './dialog-pro-ser.component.html',
  styleUrls: ['./dialog-pro-ser.component.css']
})
export class DialogProSerComponent implements OnInit {

  // variables de combo box
  opcionSeleccionado: string = '0';
  verSeleccion: string = '';
  causas: any;

  // variables para registro de un nuevo PROD/SERV
  nuevoProductoServicio: ProsernuevoI;
  showguardar: boolean = false;

  // variable para habilitar campos
  showlote: boolean = false;
  disableiva: boolean = false;

  constructor(public dialogRef: MatDialogRef<DialogProSerComponent>, @Inject(MAT_DIALOG_DATA)
  public prodserUpdate: ProsernuevoI) { }

  ngOnInit() {

    this.showlote = false;
    this.disableiva = true;
    
    this.nuevoProductoServicio = {
      id_proser: 0,
      codigo_proser: '',
      categoria_proser: '0',
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
      created_at: '',
      IVA_proser: '1'
    }

    if (this.prodserUpdate == null) {
      this.prodserUpdate = {
        id_proser: 0,
        codigo_proser: '',
        categoria_proser: '0',
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
    } else {
      this.nuevoProductoServicio = this.prodserUpdate;
    }

  }

  capturar() {
    // Pasamos el valor seleccionado a la variable verSeleccion
    this.verSeleccion = this.nuevoProductoServicio.categoria_proser;
    if (this.verSeleccion == '0') {

      this.showlote = false;
      this.disableiva = true;

    } else if (this.verSeleccion == 'PRODUCTO') {

      this.showlote = true;
      this.disableiva = false;

    } else if (this.verSeleccion == 'SERVICIO') {

      this.showlote = false;
      this.disableiva = true;
      this.nuevoProductoServicio.IVA_proser = '0';

    } else if (this.verSeleccion == 'SUMINISTROS') {

      this.showlote = false;
      this.disableiva = true;

    } else if (this.verSeleccion == 'SUJETOCONTROL') {

      this.showlote = false;
      this.disableiva = true;

    }
  }

  guardar() {
    if (this.verSeleccion == "" || this.verSeleccion == '0') {
      Swal.fire({
        icon: 'warning',
        confirmButtonColor: '#1d1d24',
        text: 'Debe seleccionar la categoria'
      });
    } else if (this.nuevoProductoServicio.codigo_proser == "") {
      Swal.fire({
        icon: 'warning',
        confirmButtonColor: '#1d1d24',
        text: 'Debe escanear el codigo de barras del producto a registrar'
      });
    } else if (this.nuevoProductoServicio.nombre_proser == '') {
      Swal.fire({
        icon: 'warning',
        confirmButtonColor: '#1d1d24',
        text: 'Debe ingresar el nombre del Producto/servicio'
      });
    } else if (this.nuevoProductoServicio.descripcion_proser == '') {
      Swal.fire({
        icon: 'warning',
        confirmButtonColor: '#1d1d24',
        text: 'Debe ingresar la descripción del Producto/servicio'
      });
    } else if (this.nuevoProductoServicio.precio_proser <= 0) {
      Swal.fire({
        icon: 'warning',
        confirmButtonColor: '#1d1d24',
        text: 'El precio no puede ser menor a 0'
      });
    } else if (this.nuevoProductoServicio.cantidad_proser <= 0) {
      Swal.fire({
        icon: 'warning',
        confirmButtonColor: '#1d1d24',
        text: 'La cantidad debe ser mayor a 0'
      });
    } else {
      this.nuevoProductoServicio.categoria_proser = this.verSeleccion;
      this.nuevoProductoServicio.cantidadfinal_proser = this.nuevoProductoServicio.cantidad_proser;
      this.nuevoProductoServicio.marca_proser = '';
      this.nuevoProductoServicio.modelo_proser = '';
      this.nuevoProductoServicio.serie_proser = '';
      this.nuevoProductoServicio.tipobien_proser = 'SUMINISTRO';
      this.nuevoProductoServicio.unidadmedida_proser = 'UNIDAD';
      this.nuevoProductoServicio.foto = '';

      if (this.prodserUpdate == null) {
        delete this.nuevoProductoServicio.id_proser;
        delete this.nuevoProductoServicio.created_at;
        this.dialogRef.close(this.nuevoProductoServicio);
      } else {
        delete this.nuevoProductoServicio.created_at;
        this.dialogRef.close(this.nuevoProductoServicio);
      }

    }
  }

  cancelar() {
    this.dialogRef.close();
  }

}