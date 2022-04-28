import { Component, OnInit, ViewChild } from '@angular/core';
import { DialoginventarioComponent } from 'src/app/components/inventario/dialoginventario/dialoginventario.component';
import { DialoginventarioasignadoComponent } from 'src/app/components/inventario/dialoginventarioasignado/dialoginventarioasignado.component';
import { InventarioesmeraldasComponent } from 'src/app/components/inventario/inventarioesmeraldas/inventarioesmeraldas.component';

@Component({
  selector: 'app-productosservicios',
  templateUrl: './productosservicios.component.html',
  styleUrls: ['./productosservicios.component.css']
})

export class ProductosserviciosComponent implements OnInit {

  @ViewChild('inventarionuevo', { static: false }) inventarionuevo: DialoginventarioComponent;
  @ViewChild('inventarioasignado', { static: false }) inventarioasignado: DialoginventarioasignadoComponent;
  @ViewChild('iventarioesmeraldas', {static: false}) iventarioesmeraldas: InventarioesmeraldasComponent;

  active = 0;

  constructor() { }

  ngOnInit(): void {
  }

  onTabChange(e) {
    if(e == 0){
      this.inventarionuevo.ngOnInit();
    }else if(e == 1){
      this.inventarioasignado.ngOnInit();
    }else if (e == 2){
      this.iventarioesmeraldas.ngOnInit();
    }

  }

}