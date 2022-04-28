import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ComprasI } from 'src/app/models/compras.interface';
import { ComprasService } from 'src/app/services/compras.service';

@Component({
  selector: 'app-dialogcomprasregistradas',
  templateUrl: './dialogcomprasregistradas.component.html',
  styleUrls: ['./dialogcomprasregistradas.component.css']
})
export class DialogcomprasregistradasComponent implements OnInit {

  displayedColumns: string[] = ['numerofac', 'conceptofac', 'tipocom', 'tipo','fecha', 'acciones'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  listaCompras: ComprasI[];
  listaComprasAux: ComprasI[];
  listaItems: any[];

  constructor(private _compras: ComprasService) { }

  ngOnInit(): void {
    this.loadCompras();
  }

  loadCompras(){
    
    this._compras.getAll().subscribe(res=>{

      this.listaComprasAux = res;

      // console.log(this.listaComprasAux);

      this.dataSource = new MatTableDataSource(this.listaComprasAux);
      this.dataSource.paginator = this.paginator;

    });

  }

}