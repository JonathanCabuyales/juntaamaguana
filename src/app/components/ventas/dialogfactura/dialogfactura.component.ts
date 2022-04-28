import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { ClienteI } from 'src/app/models/cliente.interface';
import { EmpleadoVentaI } from 'src/app/models/empleados/empleadoventa.interface';
import { EmpresaI } from 'src/app/models/empresa/empresa.interface';
import { ProsernuevoI } from 'src/app/models/prosernuevo.interface';
import { EmpresaService } from 'src/app/services/empresa.service';
import { ProdservService } from 'src/app/services/prodserv.service';
import { DialogallclientesComponent } from '../../clientes/dialogallclientes/dialogallclientes.component';
import { DialogprodservComponent } from '../../productosservicios/dialogprodserv/dialogprodserv.component';
import { DialogempleadosventasComponent } from '../dialogempleadosventas/dialogempleadosventas.component';

@Component({
  selector: 'app-dialogfactura',
  templateUrl: './dialogfactura.component.html',
  styleUrls: ['./dialogfactura.component.css']
})
export class DialogfacturaComponent implements OnInit {

  displayedColumns: string[] = ['nombre', 'descripcion', 'cantidad', 'precio', 'eliminar'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  listaProSer: ProsernuevoI[];
  prodser: ProsernuevoI[];

  // variables para el cliente
  cliente: ClienteI;
  showCliente: boolean = false;

  // variable para cargar la informacion de la empresa
  empresa: EmpresaI;

  // variables para los empleados
  showVendedor: boolean = false;
  empleado: EmpleadoVentaI;

  // varibales para los items de la factura
  lastIndex: number = 0;
  subtotal12: string = '0.00';
  subtotal0: string = '0.00';
  iva: string = '0.00';
  ice: number = 0;
  propina: number = 0;
  totalFactura: string = '0.00';


  constructor(public dialog: MatDialog,
    private _prodser: ProdservService,
    private _empresa: EmpresaService,
    private toastr: ToastrService) { }

  ngOnInit(): void {

    this.cliente = {
      id_cli: 0,
      nombres_cli: '',
      apellidos_cli: '',
      ciruc_cli: '',
      direccion_cli: '',
      telefono_cli: '',
      email_cli: '',
      created_at: new Date()
    }

    this.loadEmpresa();

    this.listaProSer = [];

  }

  loadEmpresa() {

    this._empresa.getAll().subscribe(res => {
      console.log(res);

      if (res.length) {
        this.empresa = res;
      } else {
        this.toastWarning("No hay información de la empresa, por favor verifique e intente nuevamente más tarde");
      }
    });

  }

  loadProSer() {
    const dialogRef = this.dialog.open(DialogprodservComponent, {
      width: '70%'
    });

    dialogRef.afterClosed().subscribe(res => {

      if (res != undefined) {
        if (!this.listaProSer.length) {
          this.listaProSer[0] = res;
        } else {
          this.lastIndex = this.listaProSer.length;
          this.listaProSer[this.lastIndex] = res;
        }
      }

      this.dataSource = new MatTableDataSource(this.listaProSer);
      this.dataSource.paginator = this.paginator;

    });
  }

  cargarClientes() {

    const dialogRef = this.dialog.open(DialogallclientesComponent, {
      width: '70%'
    });

    dialogRef.afterClosed().subscribe(res => {

      console.log(res);

      if (res) {
        this.showCliente = true;
        this.cliente = res;
      } else {
        this.showCliente = false;
      }

      // if (res != undefined) {
      //   this.clienteSeleccionado = res;
      //   this.btnRegistrar = true;
      // }
    });

  }

  // funcion para cargar los empleados de ventas
  loadEmpleadosVentas() {
    const dialogRef = this.dialog.open(DialogempleadosventasComponent, {
      width: '70%'
    });

    dialogRef.afterClosed().subscribe(res => {


      if (res) {
        this.showVendedor = true;
        this.empleado = res;
      }

      // if (res != undefined) {

      //   this.listaProSer = [];
      //   this.listaProSer[0] = res;
      //   console.log(this.listaProSer);

      // this.dataSource = new MatTableDataSource(this.listaProSer);
      // this.dataSource.paginator = this.paginator;
      // }
    });
  }

  // funciones para la seccion de items

  borrarItems(item: any) {

    for (let i = 0; i < this.listaProSer.length; i++) {

      if (this.listaProSer[i].id_proser == item.id_proser) {
        this.listaProSer.splice(i, 1);
      }

    }

    this.dataSource = new MatTableDataSource(this.listaProSer);
    this.dataSource.paginator = this.paginator;
  }

  // funcion para filtro de busqueda
  applyFilter(filtro: string) {
    filtro = filtro.trim(); // Remove whitespace
    filtro = filtro.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filtro;
  }

  toastSuccess(mensaje: string) {
    this.toastr.success('Registro ' + mensaje + ' exitosamente!!!', 'Exito', {
      timeOut: 3000,
    });
  }

  toastWarning(mensaje: string) {
    this.toastr.warning(mensaje + '!!!', 'Advertencia', {
      timeOut: 3000,
    });
  }

  toastError(mensaje: string) {
    this.toastr.error('Ha ocurrido un problema, intentelo nuevamente más tarde ' + mensaje, 'ERROR', {
      timeOut: 3000,
    });
  }

}
