import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { BdemapaService } from 'src/app/services/bdemapa.service';
import { LecturaService } from 'src/app/services/lecturas/lectura.service';
import { DialoglecturascreateComponent } from '../dialoglecturascreate/dialoglecturascreate.component';

@Component({
  selector: 'app-dialoglecturas',
  templateUrl: './dialoglecturas.component.html',
  styleUrls: ['./dialoglecturas.component.css']
})
export class DialoglecturasComponent implements OnInit {

  displayedColumns: string[] = ['socio', 'nombre', 'barrio', 'fechaanterior', 'lecturaant', 'fechaact', 'lecact', 'consumo', 'foto'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  socio = '';
  listalecturas: any[];
  listacatastros: any[];

  showbtncrear: boolean;

  constructor(private _lectura: LecturaService,
    private toastr: ToastrService,
    private _bdemapa: BdemapaService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.showbtncrear = false;
    
  }

  buscarSocio() {
    if (this.socio == '') {

      this.toastError('Debe ingresar el número de socio para continuar');
      this.listalecturas = [];
      this.dataSource = new MatTableDataSource(this.listalecturas);
      this.dataSource.paginator = this.paginator;
      this.showbtncrear = false;

    } else {
      this._lectura.getLecturasCliente(this.socio).subscribe(res => {

        if (res.length) {

          this.listalecturas = res;
          this.dataSource = new MatTableDataSource(this.listalecturas);
          this.dataSource.paginator = this.paginator;
          this.showbtncrear = true;

        } else {

          this.toastError("El socio no registra leturas, verifique el número e intentelo nuevamente.");
          this.listalecturas = [];
          this.dataSource = new MatTableDataSource(this.listalecturas);
          this.dataSource.paginator = this.paginator;
          this.showbtncrear = false;

        }

      });
    }
  }

  crearlectura() {

    const dialogRef = this.dialog.open(DialoglecturascreateComponent, {
      width: '500px',
      data: this.listalecturas[0]
    }
    );

    dialogRef.afterClosed().subscribe(res => {

      this._lectura.getLecturasCliente(this.socio).subscribe(res => {

        if (res.length) {

          this.listalecturas = res;
          this.dataSource = new MatTableDataSource(this.listalecturas);
          this.dataSource.paginator = this.paginator;
          this.showbtncrear = true;

        } else {

          this.toastError("El socio no registra leturas, verifique el número e intentelo nuevamente.");
          this.listalecturas = [];
          this.dataSource = new MatTableDataSource(this.listalecturas);
          this.dataSource.paginator = this.paginator;
          this.showbtncrear = false;

        }

      });

    });
  }

  lecturasmensuales() {

    this._lectura.getLecturasMensuales().subscribe(res => {
      if (res.length) {
        this.listalecturas = res;
        this.dataSource = new MatTableDataSource(this.listalecturas);
        this.dataSource.paginator = this.paginator;
      } else {
        this.toastError("No hemos podido encontrar lecturas.");
      }

    });
  }

  excel() {
    this._bdemapa.getCatastros().subscribe(res => {
      if (res) {
        this.listacatastros = res;
        this._bdemapa.exportToExcel(this.listacatastros, "castastros_nuevos");
      }
    });
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
