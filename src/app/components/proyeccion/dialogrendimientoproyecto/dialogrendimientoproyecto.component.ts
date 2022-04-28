import { Component, OnInit, ViewChild, ɵCompiler_compileModuleAndAllComponentsSync__POST_R3__ } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { PdfMakeWrapper, Txt, Img, Table, Columns, Ul, Ol, TocItem } from 'pdfmake-wrapper';
import { DialogempleadoproyeccionComponent } from '../dialogempleadoproyeccion/dialogempleadoproyeccion.component';
import { DialogtablapujaComponent } from '../dialogtablapuja/dialogtablapuja.component';
import { DialoginsumosComponent } from '../dialoginsumos/dialoginsumos.component';
import { DialogequipominimoComponent } from '../dialogequipominimo/dialogequipominimo.component';
import { DialogempleadoeditarComponent } from '../dialogempleadoeditar/dialogempleadoeditar.component';
import { EmpleadoEditarI } from 'src/app/models/proyeccion/empleadoeditar.interfce';

@Component({
  selector: 'app-dialogrendimientoproyecto',
  templateUrl: './dialogrendimientoproyecto.component.html',
  styleUrls: ['./dialogrendimientoproyecto.component.css']
})
export class DialogrendimientoproyectoComponent implements OnInit {

  // variables para combo box
  tiempoProyecto: string = '0';
  showSelect: boolean = false;

  // varibables para el calculo de intereses y ganancias del proyecto
  valorPrestamo: any;
  retencionRenta: string = '0';
  ivaValorContrato: string = '0';
  ivaRetencionRenta: string = '0';
  valorTotalContrato: string = '0';
  valorTotalRetencion: string = '0';
  valoraCobrar: string = '0';
  valorInsumos: any;

  // varibales para los botones
  showBtnCancel: boolean = false;
  showBtnAgregar: boolean = false;
  showbtnCalcularvalorproyecto: boolean = true;
  showResultados: boolean = false;
  showPersonal: boolean;

  // variables para la lista de empleados
  listaEmpleados: any[];
  lastIndex: number = 0;
  listaInsumos: any[];
  lastIndexInsumos: number = 0;
  listaEquipominimo: any[];
  lastIndexEquipo: number = 0;
  empleadoEditar: EmpleadoEditarI;

  // variable para el total de la lista de empleados
  totalEmpleadosSueldos: number = 0;
  totalTiempoProyecto: string = '0';

  // variables para detalles del proyecto calculo
  rendimientoProyecto: string = '0';
  rendimiento1: string = '0';
  rendimientoMensual: string = '0';
  inversion: string = '0';
  otrosNoConsiderados: string = '0';
  totalCostoInversion: string = '0';
  comparativoBancario: string = '0';
  rendimientoComparativo: string = '0';
  viable: string = '';
  totalInsumos: string = '0';
  costoProyecto: string = '0';
  totalEquipoMinimo: string = '0';
  totalInsumosCalculo: string = '0';

  // variables para mostrar bajo medio alto
  showbajo: boolean = false;
  showmedio: boolean = false;
  showalto: boolean = false;

  // variable para el boton PDF
  showBtnPDF: boolean = false;

  // cargo la interfaz de la tabla 
  displayedColumns: string[] = ['empleado', 'cantidad', 'remuneracion', 'decimotercer', 'decimocuarto', 'iess', 'total', 'acciones'];
  dataSource: MatTableDataSource<any>;

  displayedColumnsEquipoMinimo: string[] = ['detalle', 'cantidad', 'valor', 'totalmes', 'total'];
  dataEquipoMinimo: MatTableDataSource<any>;

  displayedColumnsInsumos: string[] = ['detalle', 'cantidad', 'valor', 'totalmes', 'total'];
  dataInsumos: MatTableDataSource<any>;

  viable5: string = '';
  viable15: string = '';
  viable16: string = '';
  viable49: string = '';

  // porcentajes de error
  margenError: number = 0;
  porcentajeBancario: number = 0;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public dialog: MatDialog) { }


  ngOnInit(): void {
    this.listaEmpleados = [];
    this.listaInsumos = [];
    this.listaEquipominimo = [];
    this.showResultados = false;
    this.showPersonal = false;
    this.empleadoEditar = {
      empleado: '',
      cantidad: 0,
      remuneracion: 0,
      decimotercer: '',
      decimocuarto: '',
      iess: '',
      total: '',
      tiempo: '',
      posicion: 0
    }
  }

  calcularContrato() {
    if (this.valorPrestamo == null || this.valorPrestamo == '') {
      Swal.fire({
        icon: 'warning',
        confirmButtonColor: '#1d1d24',
        text: 'El valor del prestamo no puede ser menor o igual a 0'
      });
    } else {
      this.showBtnCancel = true;
      this.showbtnCalcularvalorproyecto = false;
      this.retencionRenta = (this.valorPrestamo * 0.02).toFixed(2);
      this.ivaValorContrato = (this.valorPrestamo * 0.12).toFixed(2);
      this.ivaRetencionRenta = (parseFloat(this.ivaValorContrato) * 0.7).toFixed(2);
      this.valorTotalContrato = (this.valorPrestamo + parseFloat(this.ivaValorContrato)).toFixed(2);
      this.valorTotalRetencion = (parseFloat(this.retencionRenta) + parseFloat(this.ivaRetencionRenta)).toFixed(2);
      this.valoraCobrar = (parseFloat(this.valorTotalContrato) - parseFloat(this.valorTotalRetencion)).toFixed(2);
      this.showPersonal = true;
    }
  }

  capturar() {

    // Pasamos el valor seleccionado a la variable verSeleccion
    if (this.tiempoProyecto == '0') {
      this.showBtnAgregar = false;
    } else {
      this.showBtnAgregar = true;
      this.showSelect = true;
    }

  }

  verificarProyecto() {
    if (this.valoraCobrar == null || this.valoraCobrar == '') {
      Swal.fire({
        icon: 'warning',
        confirmButtonColor: '#1d1d24',
        text: 'No hay valores del proyecto en la sección "Valores Del Proyecto"'
      });
    } else if (this.totalTiempoProyecto == '0') {
      Swal.fire({
        icon: 'warning',
        confirmButtonColor: '#1d1d24',
        text: 'No hay valores de personal en la sección "Personal Del Proyecto"'
      });
    } else {

      this.totalInsumosCalculo = (parseFloat(this.totalEquipoMinimo) + parseFloat(this.totalInsumos)).toFixed(2);

      this.showResultados = true;
      // parseFloat(this.totalTiempoProyecto) + (parseFloat(this.totalInsumosCalculo)))

      this.inversion = (parseFloat(this.totalTiempoProyecto) + parseFloat(this.totalInsumosCalculo)).toFixed(2);

      this.rendimiento1 = (this.valorPrestamo - parseFloat(this.inversion)).toFixed(2);

      this.rendimientoMensual = (parseFloat(this.rendimiento1) / parseInt(this.tiempoProyecto)).toFixed(2);

      this.otrosNoConsiderados = ((parseFloat(this.inversion) * this.margenError) / 100).toFixed(2);

      this.totalCostoInversion = (parseInt(this.otrosNoConsiderados) + parseFloat(this.inversion)).toFixed(2);

      this.comparativoBancario = ((this.porcentajeBancario / 12) * parseInt(this.tiempoProyecto)).toFixed(2);

      this.rendimientoProyecto = (this.valorPrestamo - parseFloat(this.totalCostoInversion)).toFixed(2);

      this.rendimientoComparativo = (parseFloat(this.totalCostoInversion) * (parseFloat(this.comparativoBancario) / 100)).toFixed(2);

      this.viable5 = (((parseFloat(this.rendimientoComparativo) * 5) / 100) + parseFloat(this.rendimientoComparativo)).toFixed(2);
      this.viable15 = (((parseFloat(this.rendimientoComparativo) * 15) / 100) + parseFloat(this.rendimientoComparativo)).toFixed(2);

      this.viable16 = (((parseFloat(this.rendimientoComparativo) * 16) / 100) + parseFloat(this.rendimientoComparativo)).toFixed(2);
      this.viable49 = (((parseFloat(this.rendimientoComparativo) * 49) / 100) + parseFloat(this.rendimientoComparativo)).toFixed(2);

      this.viable = (((parseFloat(this.rendimientoComparativo) * 50) / 100) + parseFloat(this.rendimientoComparativo)).toFixed(2);

      console.log("5%: " + this.viable5
        + "\n\n15%: " + this.viable15
        + "\n\n16%: " + this.viable16
        + "\n\n49%: " + this.viable49
        + "\n\n50%: " + this.viable
        + "\n\nrendimiento: " + this.rendimientoProyecto);

      if (parseFloat(this.rendimientoProyecto) > parseFloat(this.viable5)
        && parseFloat(this.rendimientoProyecto) <= parseFloat(this.viable15)) {
        Swal.fire({
          icon: 'success',
          confirmButtonColor: '#1d1d24',
          text: 'El Proyecto es viable con un porcentaje BAJO'
        });
        this.showBtnPDF = true;
        this.showbajo = true;
        this.showmedio = false;
        this.showalto = false;

      } else if (parseFloat(this.rendimientoProyecto) > parseFloat(this.viable16)
        && parseFloat(this.rendimientoProyecto) <= parseFloat(this.viable49)) {
        Swal.fire({
          icon: 'success',
          confirmButtonColor: '#1d1d24',
          text: 'El Proyecto es viable con un porcentaje MEDIO'
        });
        this.showBtnPDF = true;
        this.showmedio = true;
        this.showbajo = false;
        this.showalto = false;

      } else
        if (parseFloat(this.rendimientoProyecto) > parseFloat(this.viable)) {
          Swal.fire({
            icon: 'success',
            confirmButtonColor: '#1d1d24',
            text: 'El Proyecto es viable con un porcentaje ALTO!!!!!'
          });
          this.showBtnPDF = true;
          this.showalto = true;
          this.showbajo = false;
          this.showmedio = false;

        } else {
          Swal.fire({
            icon: 'warning',
            confirmButtonColor: '#1d1d24',
            text: 'El Proyecto NO es viable'
          });
          this.showBtnPDF = true;
          this.showbajo = false;
          this.showmedio = false;
          this.showalto = false;
        }

      // if (parseFloat(this.rendimientoProyecto) > parseFloat(this.viable)) {
      //   Swal.fire({
      //     icon: 'success',
      //     confirmButtonColor: '#1d1d24',
      //     text: 'El Proyecto es VIABLE!!!!!'
      //   });
      //   this.showBtnPDF = true;

      // } else {
      //   Swal.fire({
      //     icon: 'warning',
      //     confirmButtonColor: '#1d1d24',
      //     text: 'Lo sentimos el proyecto NO es viable'
      //   });
      //   this.showBtnPDF = true;
      // }
    }
  }

  async generarPDF() {
    if (this.valoraCobrar == null || this.valoraCobrar == '') {
      Swal.fire({
        icon: 'warning',
        confirmButtonColor: '#1d1d24',
        text: 'No hay valores del proyecto en la sección "Valores Del Proyecto"'
      });
    } else if (this.totalTiempoProyecto == '0') {
      Swal.fire({
        icon: 'warning',
        confirmButtonColor: '#1d1d24',
        text: 'No hay valores de personal en la sección "Personal Del Proyecto"'
      });
    } else if (this.valorInsumos == null || this.valorInsumos == '') {
      Swal.fire({
        icon: 'warning',
        confirmButtonColor: '#1d1d24',
        text: 'Debe ingresar el valor de los insumos para continuar'
      });
    } else {
      const pdf = new PdfMakeWrapper();

      pdf.info({
        title: 'PROYECCION'
      });
      pdf.add(new Txt('\n').end);
      pdf.add(new Txt("PROYECCION").fontSize(16).bold().alignment("center").end);
      pdf.add(new Txt('\n').end);
      pdf.add(new Txt('\n').end);
      pdf.add(new Table([
        [{ text: 'Valores Proyecto', fillColor: '#1d1d24', color: '#fff' }]
      ]).layout('noBorders').alignment('center').fontSize(14).widths(['100%']).end);
      pdf.add(new Txt('\n').end);
      pdf.add(new Table([
        ['', '', { text: 'IVA', fillColor: '#1d1d24', color: '#fff' }, { text: 'Valor Total', fillColor: '#1d1d24', color: '#fff' }]
      ]).layout('noBorders').alignment('center').fontSize(10).widths(['25%', '25%', '25%', '25%']).end);
      pdf.add(new Table([
        [{ text: 'Valor Contrato', fillColor: '#1d1d24', color: '#fff' }, this.valorPrestamo + " $", this.ivaValorContrato + " $", this.valorTotalContrato + " $"],
        [{ text: 'Rentención Renta', fillColor: '#1d1d24', color: '#fff' }, this.retencionRenta + " $", this.ivaRetencionRenta + " $", this.valorTotalRetencion + " $"],
        [{ text: 'Valor a Cobrar', fillColor: '#1d1d24', color: '#fff', bold: true }, '', '', { text: this.valoraCobrar + ' $', fillColor: '#1d1d24', color: '#fff', bold: true }]
      ]).alignment('center').fontSize(10).widths(['25%', '25%', '25%', '25%']).end);
      pdf.add(new Txt('\n\n').end);
      pdf.add(new Table([
        [{ text: 'Personal Requerido', fillColor: '#1d1d24', color: '#fff' }]
      ]).layout('noBorders').alignment('center').fontSize(14).widths(['100%']).end);
      pdf.add(new Txt('\n').end);
      pdf.add(new Txt('Tiempo Del Proyecto: ').fontSize(14).end);
      pdf.add(new Txt(this.tiempoProyecto + ' MESES').bold().fontSize(14).end);
      pdf.add(new Txt('\n').end);

      pdf.add(new Table([
        [{ text: 'Tipo Personal', fillColor: '#1d1d24', color: '#fff' }, { text: 'Cantidad', fillColor: '#1d1d24', color: '#fff' }, { text: 'Remuneración', fillColor: '#1d1d24', color: '#fff' }, { text: 'Decimo Tercer', fillColor: '#1d1d24', color: '#fff' }, { text: 'Decimo Cuarto', fillColor: '#1d1d24', color: '#fff' }, { text: 'Total', fillColor: '#1d1d24', color: '#fff' }]
      ]).alignment('center').fontSize(10).widths(['20%', '16%', '16%', '16%', '16%', '16%']).end);

      for (let i = 0; i < this.listaEmpleados.length; i++) {
        pdf.add(new Table([
          [{ text: this.listaEmpleados[i].empleado }, { text: this.listaEmpleados[i].cantidad }, { text: this.listaEmpleados[i].remuneracion }, { text: this.listaEmpleados[i].decimotercer }, { text: this.listaEmpleados[i].decimocuarto }, { text: this.listaEmpleados[i].total }]
        ]).alignment('center').fontSize(10).widths(['20%', '16%', '16%', '16%', '16%', '16%']).end);
      }

      pdf.add(new Table([
        ['', '', '', { text: 'Total Mensual', fillColor: '#1d1d24', color: '#fff' }, { text: this.totalEmpleadosSueldos + ' $', fillColor: '#1d1d24', color: '#fff' }],
        ['', '', '', { text: 'Total Tiempo Proyecto', fillColor: '#1d1d24', color: '#fff' }, { text: this.totalTiempoProyecto, fillColor: '#1d1d24', color: '#fff' }]
      ]).layout('noBorders').alignment('center').fontSize(10).widths(['20%', '16%', '16%', '32%', '16%']).end);
      pdf.add(new Txt('\n').end);
      pdf.add(new Txt('\n').end);

      pdf.add(new Table([
        [{ text: 'Valores Rendimiento Proyecto', fillColor: '#1d1d24', color: '#fff' }]
      ]).layout('noBorders').alignment('center').fontSize(14).widths(['100%']).end);
      pdf.add(new Txt('\n').end);

      pdf.add(new Table([
        [{ text: 'Rendimiento Proyecto', fillColor: '#1d1d24', color: '#fff' }, { text: this.rendimientoProyecto }, { text: 'Total Costo Inversión', fillColor: '#1d1d24', color: '#fff' }, { text: this.totalCostoInversion }],
        [{ text: 'Rendimiento Mensual', fillColor: '#1d1d24', color: '#fff' }, { text: this.rendimientoMensual }, { text: 'Comparativo bancario rendimiento mejor tasa 4,5% Anual', fillColor: '#1d1d24', color: '#fff' }, { text: this.comparativoBancario }],
        [{ text: 'Inversión', fillColor: '#1d1d24', color: '#fff', bold: true }, { text: this.inversion }, { text: 'Rendimiento Comparativo', fillColor: '#1d1d24', color: '#fff' }, { text: this.rendimientoComparativo }],
        [{ text: 'Otros no considerados depreciables', fillColor: '#1d1d24', color: '#fff' }, { text: this.otrosNoConsiderados }, { text: 'Rendimiento Proyecto', fillColor: '#1d1d24', color: '#fff' }, { text: this.rendimientoProyecto }]
      ]).alignment('center').fontSize(10).widths(['25%', '25%', '25%', '25%']).end);

      // Fin de la factura
      pdf.create().open();
    }
  }

  agregarEmpleado() {
    const dialogRef = this.dialog.open(DialogempleadoproyeccionComponent, {
      width: '450px',
      data: this.tiempoProyecto
    }
    );

    dialogRef.afterClosed().subscribe(res => {

      if (res != undefined) {

        if (!this.listaEmpleados.length) {

          this.listaEmpleados[0] = res;

        } else {

          this.lastIndex = this.listaEmpleados.length;
          this.listaEmpleados[this.lastIndex] = res;

        }

        this.totalEmpleadosSueldos = 0;

        for (let i = 0; i < this.listaEmpleados.length; i++) {

          this.totalEmpleadosSueldos += parseFloat(this.listaEmpleados[i].total);
          this.totalTiempoProyecto = (this.totalEmpleadosSueldos * parseInt(this.tiempoProyecto)).toFixed(2);
          
        }
        this.dataSource = new MatTableDataSource(this.listaEmpleados);
      }
    });
  }

  editarEmpledo(empleado: any) {

    this.empleadoEditar.empleado = empleado.empleado;
    this.empleadoEditar.cantidad = empleado.cantidad;
    this.empleadoEditar.remuneracion = empleado.remuneracion;
    this.empleadoEditar.decimotercer = empleado.decimotercer;
    this.empleadoEditar.decimocuarto = empleado.decimocuarto;
    this.empleadoEditar.iess = empleado.iess;
    this.empleadoEditar.total = empleado.total;
    this.empleadoEditar.tiempo = this.tiempoProyecto;

    if(this.listaEmpleados.length){
      for (let i = 0; i < this.listaEmpleados.length; i++) {
        if(this.listaEmpleados[i].empleado == empleado.empleado && 
          this.listaEmpleados[i].cantidad == empleado.cantidad){
            this.empleadoEditar.posicion = i;
            break;
        }
      }
    }    
    
    const dialogRef = this.dialog.open(DialogempleadoeditarComponent, {
      width: '450px',
      data: this.empleadoEditar
    }
    );

    dialogRef.afterClosed().subscribe(res => {

      if (res != undefined) {

        console.log(res);
        

      //   if (!this.listaEmpleados.length) {
      //     this.listaEmpleados[0] = res;
      //   } else {
      //     this.lastIndex = this.listaEmpleados.length;
      //     console.log(this.lastIndex);
      //     this.listaEmpleados[this.lastIndex] = res;
      //     console.log(this.listaEmpleados);

      //   }
      //   this.totalEmpleadosSueldos = 0;
      //   for (let i = 0; i < this.listaEmpleados.length; i++) {

      //     this.totalEmpleadosSueldos += parseFloat(this.listaEmpleados[i].total);
      //     this.totalTiempoProyecto = (this.totalEmpleadosSueldos * parseInt(this.tiempoProyecto)).toFixed(2);

      //     console.log(this.totalEmpleadosSueldos);
      //     console.log(this.totalTiempoProyecto);
          

      //   }
      //   this.dataSource = new MatTableDataSource(this.listaEmpleados);
      }
    });

  }

  eliminarEmpledo(empleado: any) {

    for (let i = 0; i < this.listaEmpleados.length; i++) {

      if (this.listaEmpleados[i].empleado == empleado.empleado && this.listaEmpleados[i].cantidad == empleado.cantidad) {
        this.listaEmpleados.splice(i, 1);
        break;
      }
    }

    this.totalEmpleadosSueldos = 0;

    if(this.listaEmpleados.length){
      for (let i = 0; i < this.listaEmpleados.length; i++) {

        this.totalEmpleadosSueldos += parseFloat(this.listaEmpleados[i].total);
        
        this.totalTiempoProyecto = (this.totalEmpleadosSueldos * parseInt(this.tiempoProyecto)).toFixed(2);        
      }
    }else{
      this.totalTiempoProyecto = '0';
      this.totalEmpleadosSueldos = 0;
      
    }

    this.dataSource = new MatTableDataSource(this.listaEmpleados);

  }

  tablPuja() {

    const dialogRef = this.dialog.open(DialogtablapujaComponent, {
      width: 'auto',
      // data: this.tiempoProyecto
    }
    );

    dialogRef.afterClosed().subscribe(res => {

      if (res != undefined) {

        // if (!this.listaInsumos.length) {
        //   this.listaInsumos[0] = res;
        // } else {
        //   this.lastIndexInsumos = this.listaInsumos.length;
        //   this.listaInsumos[this.lastIndexInsumos] = res;

        // }

        // this.totalInsumos = '0';

        // for (let i = 0; i < this.listaInsumos.length; i++) {
        //   this.totalInsumos = (parseFloat(this.totalInsumos) + parseFloat(this.listaInsumos[i].total)).toFixed(2);
        // }

        // this.costoProyecto = (parseFloat(this.totalTiempoProyecto) + parseFloat(this.totalInsumos) + parseFloat(this.totalEquipoMinimo)).toFixed(2);

        // // this.totalEmpleadosSueldos = 0;
        // // for (let i = 0; i < this.listaInsumos.length; i++) {

        // //   this.totalEmpleadosSueldos += parseFloat(this.listaInsumos[i].total);
        // //   this.totalTiempoProyecto = (this.totalEmpleadosSueldos * parseInt(this.tiempoProyecto)).toFixed(2);

        // // }
        // this.dataInsumos = new MatTableDataSource(this.listaInsumos);
      }
    });
  }

  agregarInsumos() {
    const dialogRef = this.dialog.open(DialoginsumosComponent, {
      width: '450px',
      data: this.tiempoProyecto
    }
    );

    dialogRef.afterClosed().subscribe(res => {

      if (res != undefined) {

        if (!this.listaInsumos.length) {
          this.listaInsumos[0] = res;
        } else {
          this.lastIndexInsumos = this.listaInsumos.length;
          this.listaInsumos[this.lastIndexInsumos] = res;

        }

        this.totalInsumos = '0';

        for (let i = 0; i < this.listaInsumos.length; i++) {
          this.totalInsumos = (parseFloat(this.totalInsumos) + parseFloat(this.listaInsumos[i].total)).toFixed(2);
        }

        this.costoProyecto = (parseFloat(this.totalTiempoProyecto) + parseFloat(this.totalInsumos) + parseFloat(this.totalEquipoMinimo)).toFixed(2);

        // this.totalEmpleadosSueldos = 0;
        // for (let i = 0; i < this.listaInsumos.length; i++) {

        //   this.totalEmpleadosSueldos += parseFloat(this.listaInsumos[i].total);
        //   this.totalTiempoProyecto = (this.totalEmpleadosSueldos * parseInt(this.tiempoProyecto)).toFixed(2);

        // }
        this.dataInsumos = new MatTableDataSource(this.listaInsumos);
      }
    });
  }

  agregarEquipoMinimo() {
    const dialogRef = this.dialog.open(DialogequipominimoComponent, {
      width: '450px',
      data: this.tiempoProyecto
    }
    );

    dialogRef.afterClosed().subscribe(res => {

      if (res != undefined) {

        if (!this.listaEquipominimo.length) {
          this.listaEquipominimo[0] = res;
        } else {
          this.lastIndexEquipo = this.listaEquipominimo.length;
          this.listaEquipominimo[this.lastIndexEquipo] = res;

        }

        this.totalEquipoMinimo = '0';

        for (let i = 0; i < this.listaEquipominimo.length; i++) {
          this.totalEquipoMinimo = (parseFloat(this.totalEquipoMinimo) + parseFloat(this.listaEquipominimo[i].total)).toFixed(2);
        }

        // this.costoProyecto = (parseFloat(this.totalTiempoProyecto) + parseFloat(this.totalInsumos)).toFixed(2);

        // this.totalEmpleadosSueldos = 0;
        // for (let i = 0; i < this.listaInsumos.length; i++) {

        //   this.totalEmpleadosSueldos += parseFloat(this.listaInsumos[i].total);
        //   this.totalTiempoProyecto = (this.totalEmpleadosSueldos * parseInt(this.tiempoProyecto)).toFixed(2);

        // }
        this.dataEquipoMinimo = new MatTableDataSource(this.listaEquipominimo);
      }
    });
  }

  calcularSueldos() {

    if (!this.listaEmpleados.length) {
      Swal.fire({
        icon: 'warning',
        confirmButtonColor: '#1d1d24',
        text: 'El valor del prestamo no puede ser menor o igual a 0'
      })
    } else {
      console.log("ponte a calcular oe ajjajaj");
      for (let i = 0; i < this.listaEmpleados.length; i++) {

      }
    }
  }

  nuevaProyeccion() {
    this.cancelar();
    this.cancelarEmpelados();
    this.showPersonal = false;
    this.showResultados = false;
    this.valorInsumos = '';
    this.totalTiempoProyecto = '';
  }

  cancelarEmpelados() {
    this.listaEmpleados = [];
    this.tiempoProyecto = '0';
    this.showBtnAgregar = false;
    this.showSelect = false;
    this.totalEmpleadosSueldos = 0;
    this.totalTiempoProyecto = '0';
    this.dataSource = new MatTableDataSource(this.listaEmpleados);
  }

  cancelar() {
    this.showBtnCancel = false;
    this.showbtnCalcularvalorproyecto = true;
    this.valorPrestamo = '';
    this.retencionRenta = '';
    this.ivaValorContrato = '';
    this.ivaRetencionRenta = '';

    this.valorTotalContrato = '';
    this.valorTotalRetencion = '';

    this.valoraCobrar = '';
  }
}
