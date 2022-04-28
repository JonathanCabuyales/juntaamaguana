import { Component, OnInit, ViewChild } from '@angular/core';
import { DialogrendimientoproyectoComponent } from 'src/app/components/proyeccion/dialogrendimientoproyecto/dialogrendimientoproyecto.component';
import { AmortizacionI } from 'src/app/models/amortizacion.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-proyeccion',
  templateUrl: './proyeccion.component.html',
  styleUrls: ['./proyeccion.component.css']
})
export class ProyeccionComponent implements OnInit {

  @ViewChild('calculoproyeccion', { static: false }) calculoproyeccion: DialogrendimientoproyectoComponent;

  active = 0;

  proyeccion: AmortizacionI;

  constructor() { }

  ngOnInit() {
    this.proyeccion = {
      valorPrestamo: 0,
      TNA: 0,
      anios: 0,
      frecuenciaPago: 0,
      interesEqui: 0,
      pagosanio: 0,
      totalCuaotas: 0
    }
  }

  calcular() {
    if(this.proyeccion.valorPrestamo <= 0){
      Swal.fire({
        icon: 'warning',
        confirmButtonColor: '#1d1d24',
        text: 'El monto del prestamo no puede ser cero'
      });
    }else if(this.proyeccion.TNA <= 0){
      Swal.fire({
        icon: 'warning',
        confirmButtonColor: '#1d1d24',
        text: 'La tasa de interes no puede ser menor a cero'
      });
    }else if (this.proyeccion.anios <= 0){
      Swal.fire({
        icon: 'warning',
        confirmButtonColor: '#1d1d24',
        text: 'Debe ingresar el número de años'
      });
    }else if(this.proyeccion.frecuenciaPago == 0){
      Swal.fire({
        icon: 'warning',
        confirmButtonColor: '#1d1d24',
        text: 'Debe seleccionar la frecuencia de pago'
      });
    }else{
      console.log(this.proyeccion);
      
    }

  }

  onTabChange(e) {
    if(e == 0){
      this.calculoproyeccion.ngOnInit();
    }

  }
}
