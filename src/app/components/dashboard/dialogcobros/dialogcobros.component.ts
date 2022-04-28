import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/services/dashboard/dashboard.service';

@Component({
  selector: 'app-dialogcobros',
  templateUrl: './dialogcobros.component.html',
  styleUrls: ['./dialogcobros.component.css']
})
export class DialogcobrosComponent implements OnInit {

  listacobros: any[];

  meses: any[];
  valores: any[];

  // variables para el grafico de notificaciones 
  public cobrosOptions: {};

  constructor(private _dashboard: DashboardService) { }

  ngOnInit(): void {

    this.meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    this.valores =  [];
    this.loadCobros();
  }

  loadCobros(){

    this.listacobros = [];

    this._dashboard.getDashboardCobros().subscribe(res=>{
      
      // aqui se setean solo los valores de la consulta desde la base de datos
      this.valores[0] = res[0].Enero;
      this.valores[1] = res[0].Febrero;
      this.valores[2] = res[0].Marzo;
      this.valores[3] = res[0].Abril;
      
      this.cobrosOptions = {
        title: {
          text: 'Recaudación Facturas Agua Potable',
          left: 'center',
        },
        xAxis: {
          type: 'category',
          data: this.meses
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            formatter: '{value} $'
          }
        },
        tooltip: {
          trigger: 'item',
          showDelay: 0,
          transitionDuration: 0.1,
          formatter: function (params) {
            return `<b>${params['name']}</b> : ${params['value'] + ' $'}`;
          }
        },
        series: [
          {
            data: this.valores,
            type: 'bar',
            showBackground: true,
            backgroundStyle: {
              color: 'rgba(180, 180, 180, 0.2)'
            }
          }
        ]
      };
      
    });

  }

}
