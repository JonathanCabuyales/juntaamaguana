import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/services/dashboard/dashboard.service';

@Component({
  selector: 'app-dialogconsumoagua',
  templateUrl: './dialogconsumoagua.component.html',
  styleUrls: ['./dialogconsumoagua.component.css']
})
export class DialogconsumoaguaComponent implements OnInit {

  // variables para el grafico de notificaciones 
  public consumoOptions: {};

  constructor(private _dashboard: DashboardService) { }

  ngOnInit(): void {

    this.loadConsumo();
  }

  loadConsumo(){
    this._dashboard.getConsumoAgua().subscribe(res=>{
      console.log(res);

      this.consumoOptions = {
        title: {
          text: 'Consumo Mensual Agua Potable Por Barrios',
          left: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: 'left'
        },
        series: [
          {
            name: 'Consumo De Agua',
            type: 'pie',
            radius: '50%',
            data: [
              { value: res[0].CUENDINACHICO, name: 'Cuendina Chico' },
              { value: res[0].ELROSARIO, name: 'El Rosario' },
              { value: res[0].GUAMBA, name: 'Guambra' },
              { value: res[0].SANJUAN, name: 'San Juan' },
              { value: res[0].SANLUIS, name: 'San Luis' },
              { value: res[0].SANTAROSA, name: 'Santa Rosa' }
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      };
      
    });
  }

}
