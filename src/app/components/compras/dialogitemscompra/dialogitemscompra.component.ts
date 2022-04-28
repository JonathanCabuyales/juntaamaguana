import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ItemsI } from 'src/app/models/items.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dialogitemscompra',
  templateUrl: './dialogitemscompra.component.html',
  styleUrls: ['./dialogitemscompra.component.css']
})
export class DialogitemscompraComponent implements OnInit {

  item: ItemsI;
  ivaSelccion: string = '0';


  constructor(public dialogRef: MatDialogRef<DialogitemscompraComponent>, @Inject(MAT_DIALOG_DATA)
  public it: ItemsI) { }

  ngOnInit(): void {
    this.item = {
      categoria: '0',
      descripcion: '',
      cantidad: '',
      precio: '',
      subtotal12: '',
      subtotal0: '',
      notaVenta: '',
      iva12: '',
      iva0: '',
      total: '',
      IVA_proser: ''
    }
  }

  grabarItem() {

    console.log(this.ivaSelccion);
    

    if (this.item.categoria == '0' || this.item.descripcion == '' || this.item.cantidad == '' ||
      this.item.precio == '' || this.ivaSelccion == '0') {
      Swal.fire({
        icon: 'warning',
        confirmButtonColor: '#1d1d24',
        text: 'Debe ingresar todos los datos del concepto'
      });
    }else{
      if(this.ivaSelccion == '12'){
        this.item.IVA_proser = '12';
        this.item.iva0 = '0';
        this.item.iva12 = ((parseFloat(this.item.cantidad) * parseFloat(this.item.precio))* 0.12).toFixed(2);
        this.item.subtotal12 = (parseFloat(this.item.cantidad) * parseFloat(this.item.precio)).toFixed(2);
        this.item.total = (parseFloat(this.item.cantidad) * parseFloat(this.item.precio)).toFixed(2);
        this.item.subtotal0 = '0';
        this.dialogRef.close(this.item); 
      }else if(this.ivaSelccion == '1'){
        this.item.IVA_proser == '0';
        this.item.iva12 = '0';
        this.item.iva0 = (parseFloat(this.item.cantidad) * parseFloat(this.item.precio)).toFixed(2);
        this.item.subtotal0 = (parseFloat(this.item.cantidad) * parseFloat(this.item.precio)).toFixed(2);
        this.item.total = (parseFloat(this.item.cantidad) * parseFloat(this.item.precio)).toFixed(2);
        this.item.subtotal12 = '0';
        this.dialogRef.close(this.item); 
      }
    }
  }


}
