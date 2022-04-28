import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { ClienteI } from 'src/app/models/cliente.interface';
import { FacturaelectronicaI } from 'src/app/models/facturaelectronica.interdace';
import { ItemsI } from 'src/app/models/items.interface';
import { MultaconexionI } from 'src/app/models/multasconexion/multaconexion.interface';
import { ProsernuevoI } from 'src/app/models/porsernuevomul.interface';
import { MultaService } from 'src/app/services/multa/multa.service';
import { ProdservService } from 'src/app/services/prodserv.service';
import { DialogallclientesComponent } from '../../clientes/dialogallclientes/dialogallclientes.component';
import { DialoginventariomulComponent } from '../dialoginventariomul/dialoginventariomul.component';

@Component({
  selector: 'app-dialogconexionnueva',
  templateUrl: './dialogconexionnueva.component.html',
  styleUrls: ['./dialogconexionnueva.component.css']
})
export class DialogconexionnuevaComponent implements OnInit {


  displayedColumns: string[] = ['descripcion', 'cantidad', 'total', 'eliminar'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  // variables para crear la conexion nueva
  listaItems: any[];
  lastIndex: number = 0;

  subtotal12: string = '0';
  subtotal0: string = '0';
  iva: string = '0';
  ice: number = 0;
  propina: number = 0;
  totalFactura: string = '0';

  cliente: ClienteI;

  item: ProsernuevoI;

  totalitem: string = '';
  cantidaditem: string = '';

  listaProSer: ProsernuevoI[];
  multaconexionnueva: MultaconexionI;

  facturaelec: FacturaelectronicaI;

  tipo: string = '0';

  constructor(private toastr: ToastrService,
    public dialog: MatDialog,
    private _multaConexiones: MultaService,
    private _proser: ProdservService) { }

  ngOnInit(): void {

    this.cliente = {
      id_cli: 0,
      nombres_cli: '',
      apellidos_cli: '',
      ciruc_cli: '',
      direccion_cli: '',
      telefono_cli: '',
      email_cli: ''
    };


    this.item = {
      id_proser: 0,
      id_prove: '',
      codigo_proser: '',
      categoria_proser: '',
      nombre_proser: '0',
      descripcion_proser: '0',
      precio_proser: 0,
      preciosugerido_proser: '',
      cantidad_proser: 0,
      cantidadfinal_proser: 0,
      lote_proser: '',
      IVA_proser: '',
    };

    this.facturaelec = {
      id_usuario: '',
      nombre_empresa: '',
      ciruc_empresa: '',
      direccion_empresa: '',
      nombre_cliente: '',
      direccion_cliente: '',
      tipoidentificacion: '',
      ciruc_cliente: '',
      email_cliente: '',
      subtotal0: '',
      subtotal12: '',
      ivatotal: '',
      items: '',
      token: '',
      secuencial: ''
    };

    this.multaconexionnueva = {
      id_cli: '',
      tipo_mul: '0',
      descripcion_mul: '',
      valor_mul: '',
      saldo_mul: '',
      cancelada_mul: '',
      fechapago: '',
      valorpagado_mul: '',
      detalles_mul: ''
    }

    this.listaProSer = [];
  }

  buscarSocio() {

    const dialogRef = this.dialog.open(DialogallclientesComponent, {
      width: '70%'
    }
    );

    dialogRef.afterClosed().subscribe(res => {

      // console.log(res);

      if (res != undefined) {
        this.cliente = res;
      }

    });

  }

  loadMateriales() {

    const dialogRef = this.dialog.open(DialoginventariomulComponent, {
      width: '70%'
    }
    );

    dialogRef.afterClosed().subscribe(res => {

      if (res != undefined) {
        this.item = res;
      }

    });

  }

  // funcion para calcular el total de cada item ingresado de manera automatica
  calcularItem() {
    if (this.cantidaditem <= '0' || this.cantidaditem == null) {
      this.toastError('La cantidad no puede ser menor o igual a 0');
      this.totalitem = '0';
    } else if (this.item.cantidadfinal_proser < parseInt(this.cantidaditem)) {
      this.toastWarning('No tenemoms stock suficiente');
      this.totalitem = '0';
    } else {
      this.totalitem = (this.item.precio_proser * parseInt(this.cantidaditem)).toFixed(2);
    }
  }

  sumarItem() {

    if (this.cantidaditem <= '0' || this.cantidaditem == null) {
      this.toastError('No has ingresado la cantidad del item');
    } else if (this.item.cantidadfinal_proser < parseInt(this.cantidaditem)) {
      this.toastWarning('No tenemoms stock suficiente');
    } else {

      this.calcularItem();
      let additem = false;

      for (let i = 0; i < this.listaProSer.length; i++) {
        console.log(this.listaProSer);

        if (this.listaProSer[i].id_proser == this.item.id_proser) {
          additem = true;
          break;
        } else {
          additem = false;
        }
      }

      if (additem) {
        this.toastWarning(
          'Ya se encuentra registrado este item, borralo para que lo puedas añadir nuevamente'
        );
      } else {
        let stockrestante = this.item.cantidadfinal_proser - parseInt(this.cantidaditem);

        // console.log(this.item);

        if (this.item.IVA_proser == '12') {
          this.item.iva12 = (parseFloat(this.totalitem) * 0.12).toFixed(2);
          this.item.subtotal12 = (this.item.precio_proser * parseInt(this.cantidaditem)).toFixed(2);
          this.item.subtotal0 = '0';
          this.item.total = (this.item.precio_proser * parseInt(this.cantidaditem)).toFixed(2);
          this.item.iva0 = '0';
          this.item.cantidadvendida = this.cantidaditem;
          this.item.cantidadfinal_proser = stockrestante;
        } else if (this.item.IVA_proser == '0') {
          this.item.subtotal0 = (this.item.precio_proser * parseInt(this.cantidaditem)).toFixed(2);
          this.item.total = (this.item.precio_proser * parseInt(this.cantidaditem)).toFixed(2);
          this.item.iva12 = '0';
          this.item.iva0 = (parseFloat(this.cantidaditem) * this.item.precio_proser).toFixed(2);
          this.item.subtotal12 = '0';
          this.item.cantidadvendida = this.cantidaditem;
          this.item.cantidadfinal_proser = stockrestante;
        }

        if (!this.listaProSer.length) {
          this.listaProSer[0] = this.item;
        } else {
          this.lastIndex = this.listaProSer.length;
          this.listaProSer[this.lastIndex] = this.item;
        }

        this.subtotal12 = '0';
        this.subtotal0 = '0';
        this.iva = '0';
        this.totalFactura = '0';

        for (let i = 0; i < this.listaProSer.length; i++) {
          this.subtotal12 = (parseFloat(this.subtotal12) + parseFloat(this.listaProSer[i].subtotal12)).toFixed(2);
          this.subtotal0 = (parseFloat(this.subtotal0) + parseFloat(this.listaProSer[i].subtotal0)).toFixed(2);
          this.iva = (parseFloat(this.iva) + parseFloat(this.listaProSer[i].iva12)).toFixed(2);
        }

        this.totalFactura = (parseFloat(this.subtotal12) + parseFloat(this.subtotal0) + parseFloat(this.iva)).toFixed(2);

        this.borraritem();


        this.dataSource = new MatTableDataSource(this.listaProSer);
        this.dataSource.paginator = this.paginator;
      }
    }
  }


  grabarConexion() {

    if (this.cliente.ciruc_cli == '') {
      this.toastError("El socio no ha sido seleccionado");
    } else if (!this.listaProSer.length) {
      this.toastError("Ingresa al menos un detalle para continuar");
    } else if (this.tipo == '' || this.tipo == null || this.tipo == '0') {
      this.toastError("Debes ingresar el tipo de registro para continuar");
    } else {
      // console.log("graba");
      this.facturaelec.id_usuario = this.cliente.id_cli + '';

      this.facturaelec.nombre_cliente = this.cliente.nombres_cli + ' ' + this.cliente.apellidos_cli;
      this.facturaelec.ciruc_cliente = this.cliente.ciruc_cli;
      this.facturaelec.direccion_cliente = this.cliente.direccion_cli;
      this.facturaelec.email_cliente = this.cliente.email_cli;

      // añado el total de la fatura al json
      let totalsinimp = '0';
      for (let i = 0; i < this.listaProSer.length; i++) {
        delete this.listaProSer[i].lote_proser;
        totalsinimp = (parseFloat(totalsinimp) + parseFloat(this.listaProSer[i].subtotal12) + parseFloat(this.listaProSer[i].subtotal0)).toFixed(2);
      }

      // items de la factura (servicios o productos) 
      // primero convierto en json a la lista y luego lo asigno
      this.facturaelec.items = JSON.stringify(this.listaProSer);

      this.facturaelec.totalsinimpu = totalsinimp;
      this.facturaelec.totalFactura = this.totalFactura;

      if (this.cliente.ciruc_cli.length == 13) {

        if (this.cliente.ciruc_cli == '9999999999999') {
          this.facturaelec.tipoidentificacion = '07';
        } else {
          this.facturaelec.tipoidentificacion = '04';
        }

      } else if (this.cliente.ciruc_cli.length == 10) {
        this.facturaelec.tipoidentificacion = '05';
      }

      this.facturaelec.formapago = '01';
      this.facturaelec.subtotal0 = this.subtotal0;
      this.facturaelec.subtotal12 = this.subtotal12;
      this.facturaelec.ivatotal = this.iva;
      this.facturaelec.id_usuario = '1';
      // this.facturaelec.secuencial = this.secuencial;

      this.multaconexionnueva.fechapago = '';
      this.multaconexionnueva.cancelada_mul = 'NO';
      this.multaconexionnueva.saldo_mul = this.totalFactura;
      this.multaconexionnueva.detalles_mul = JSON.stringify(this.listaProSer);
      this.multaconexionnueva.valorpagado_mul = '0';
      this.multaconexionnueva.valor_mul = this.totalFactura;
      this.multaconexionnueva.tipo_mul = this.tipo;
      this.multaconexionnueva.id_cli = this.cliente.id_cli + '';
      this.multaconexionnueva.descripcion_mul = this.tipo;

      // console.log(this.listaProSer);

      let prodactu = true;

      for (let i = 0; i < this.listaProSer.length; i++) {

        // aqui valido que sea un producto o suministro ya que son los unicos que tienen inventario
        // servicios no poseen inventario por lo tanto no se puede ni restar ni sumar 
        if(this.listaProSer[i].categoria_proser != 'SERVICIO'){

          this._proser.updateProdserMat(this.listaProSer[i]).subscribe(res => {

            if (res) {
              prodactu = true;
            } else {
              prodactu = false;
            }
          });

        }

      }

      if (prodactu) {
        this._multaConexiones.createMulta(this.multaconexionnueva).subscribe(res => {

          if (res) {
            this.toastSuccess("Hemos guardado exitosamente el registro, revisa la sección valores si deseas cobrar");
            this.cancelarItems();

          } else {
            this.toastError("No podemos guardar el registro intentalo nuevamente");
          }

        });

      }

    }

  }

  borrarItems(item: any) {
    for (let i = 0; i < this.listaProSer.length; i++) {
      if (this.listaProSer[i].id_proser == item.id_proser) {
        this.listaProSer.splice(i, 1);
      }
    }

    this.subtotal12 = '0';
    this.subtotal0 = '0';
    this.iva = '0';
    this.totalFactura = '0';

    if (this.listaProSer.length) {
      for (let i = 0; i < this.listaProSer.length; i++) {
        this.subtotal12 = (parseFloat(this.subtotal12) + parseFloat(this.listaProSer[i].subtotal12)).toFixed(2);
        this.subtotal0 = (parseFloat(this.subtotal0) + parseFloat(this.listaProSer[i].subtotal0)).toFixed(2);
        this.iva = (parseFloat(this.iva) + parseFloat(this.listaProSer[i].iva12)).toFixed(2);
      }

      this.totalFactura = (parseFloat(this.subtotal12) + parseFloat(this.subtotal0) + parseFloat(this.iva)).toFixed(2);
    }

    this.dataSource = new MatTableDataSource(this.listaProSer);
    this.dataSource.paginator = this.paginator;
  }

  cancelarItems() {

    this.cantidaditem = '0';
    this.totalitem = '0';

    this.cliente = {
      id_cli: 0,
      nombres_cli: '',
      apellidos_cli: '',
      ciruc_cli: '',
      direccion_cli: '',
      telefono_cli: '',
      email_cli: ''
    };


    this.item = {
      id_proser: 0,
      id_prove: '',
      codigo_proser: '',
      categoria_proser: '',
      nombre_proser: '0',
      descripcion_proser: '0',
      precio_proser: 0,
      preciosugerido_proser: '',
      cantidad_proser: 0,
      cantidadfinal_proser: 0,
      lote_proser: '',
      IVA_proser: '',
    };

    this.facturaelec = {
      id_usuario: '',
      nombre_empresa: '',
      ciruc_empresa: '',
      direccion_empresa: '',
      nombre_cliente: '',
      direccion_cliente: '',
      tipoidentificacion: '',
      ciruc_cliente: '',
      email_cliente: '',
      subtotal0: '',
      subtotal12: '',
      ivatotal: '',
      items: '',
      token: '',
      secuencial: ''
    };

    this.multaconexionnueva = {
      id_cli: '',
      tipo_mul: '0',
      descripcion_mul: '',
      valor_mul: '',
      saldo_mul: '',
      cancelada_mul: '',
      fechapago: '',
      valorpagado_mul: '',
      detalles_mul: ''
    }

    this.listaProSer = [];

    this.dataSource = new MatTableDataSource(this.listaProSer);
    this.dataSource.paginator = this.paginator;

  }

  borraritem() {
    this.cantidaditem = '0';
    this.totalitem = '0';
    this.item = {
      id_proser: 0,
      id_prove: '',
      codigo_proser: '',
      categoria_proser: '',
      nombre_proser: '0',
      descripcion_proser: '',
      precio_proser: 0,
      preciosugerido_proser: '',
      cantidad_proser: 0,
      cantidadfinal_proser: 0,
      lote_proser: '',
      IVA_proser: '',
    };
  }

  toastSuccess(mensaje: string) {
    this.toastr.success(mensaje, 'Exito', {
      timeOut: 4000,
    });
  }

  toastWarning(mensaje: string) {
    this.toastr.warning(mensaje, 'Advertencia', {
      timeOut: 4500,
    });
  }

  toastError(mensaje: string) {
    this.toastr.error(mensaje, 'ERROR', {
      timeOut: 4500,
    });
  }

}
