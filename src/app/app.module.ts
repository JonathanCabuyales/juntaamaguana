import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';

// importacion para las rutas de home
import { HomeModule } from './home/home.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// importaciones de angular material
import { MatToolbarModule} from '@angular/material/toolbar';
import { MatSidenavModule} from '@angular/material/sidenav';
import { MatButtonModule} from '@angular/material/button';
import { MatIconModule} from '@angular/material/icon';
import { MatDividerModule} from '@angular/material/divider';
import { MatListModule} from '@angular/material/list';
import { FormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ProductosserviciosComponent } from './home/productosservicios/productosservicios.component';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCheckboxModule } from '@angular/material/checkbox';

// importacion para el modulo http
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// importacion para el tost de confirmacion
import { ToastrModule } from 'ngx-toastr';
import { ClientesComponent } from './home/clientes/clientes.component';
import { EmpleadosComponent } from './home/empleados/empleados.component';
import { ProyeccionComponent } from './home/proyeccion/proyeccion.component';
import { VentasComponent } from './home/ventas/ventas.component';
import { MatDatepickerModule } from '@angular/material/datepicker';

// importacion de la libreria de graficas ng2 charts
import { ChartsModule } from 'ng2-charts';

// importaciones de modulos
import { ComprasComponent } from './home/compras/compras.component';


// importaciones de firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { environment } from 'src/environments/environment';
import { NgxEchartsModule } from 'ngx-echarts';
import { DashboardComponent } from './home/dashboard/dashboard.component';

import { PdfMakeWrapper } from 'pdfmake-wrapper';
import pdfFonts from "pdfmake/build/vfs_fonts";

// importacion para los emogis
import { AngularEmojisModule } from 'angular-emojis';
import { MilesPipe } from './pipes/miles.pipe';
import { DialogasignarempleadoComponent } from './components/inventario/dialogasignarempleado/dialogasignarempleado.component';
import { DialoginventarioComponent } from './components/inventario/dialoginventario/dialoginventario.component';
import { DialoginventarioasignadoComponent } from './components/inventario/dialoginventarioasignado/dialoginventarioasignado.component';
import { DialogdevolucionComponent } from './components/inventario/dialogdevolucion/dialogdevolucion.component';
import { DialognotificacionesComponent } from './components/emapa/dialognotificaciones/dialognotificaciones.component';
import { DialognovedadesComponent } from './components/emapa/dialognovedades/dialognovedades.component';
import { CatastrosComponent } from './components/emapa/catastros/catastros.component';
import { InventarioesmeraldasComponent } from './components/inventario/inventarioesmeraldas/inventarioesmeraldas.component';
import { EmapaComponent } from './home/emapa/emapa.component';
import { SueldosComponent } from './components/empleados/sueldos/sueldos.component';
import { DialogsueldoempleadoComponent } from './components/empleados/dialogsueldoempleado/dialogsueldoempleado.component';
import { SueldospagadosComponent } from './components/empleados/sueldospagados/sueldospagados.component';
import { DialogcortesComponent } from './components/emapa/dialogcortes/dialogcortes.component';
import { DialogreconexionesComponent } from './components/emapa/dialogreconexiones/dialogreconexiones.component';
import { DialogdocumentosComponent } from './components/empleados/dialogdocumentos/dialogdocumentos.component';
import { DialogempleadosComponent } from './components/empleados/dialogempleados/dialogempleados.component';
import { DialogempleadoComponent } from './components/empleados/dialogempleado/dialogempleado.component';
import{ImageUploadModule} from 'angular2-image-upload';
// Set the fonts to use
PdfMakeWrapper.setFonts(pdfFonts);

// importacion para ver PDF
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { DialogeditempleadoComponent } from './components/empleados/dialogeditempleado/dialogeditempleado.component';
import { DialogappfacturasComponent } from './components/ventas/dialogappfacturas/dialogappfacturas.component';
import { DialogcomprasComponent } from './components/compras/dialogcompras/dialogcompras.component';
import { DialogcomprasregistradasComponent } from './components/compras/dialogcomprasregistradas/dialogcomprasregistradas.component';
import { DialoregistroempleadosComponent } from './components/empleados/dialoregistroempleados/dialoregistroempleados.component';
import { DialogrendimientoproyectoComponent } from './components/proyeccion/dialogrendimientoproyecto/dialogrendimientoproyecto.component';
import { DialogempleadoproyeccionComponent } from './components/proyeccion/dialogempleadoproyeccion/dialogempleadoproyeccion.component';
import { DialoginsumosComponent } from './components/proyeccion/dialoginsumos/dialoginsumos.component';
import { DialogequipominimoComponent } from './components/proyeccion/dialogequipominimo/dialogequipominimo.component';
import { DialogtablapujaComponent } from './components/proyeccion/dialogtablapuja/dialogtablapuja.component';
import { DialogcatastrosComponent } from './components/proyeccion/dialogcatastros/dialogcatastros.component';
import { DialogclientesComponent } from './components/clientes/dialogclientes/dialogclientes.component';
import { DialogallclientesComponent } from './components/clientes/dialogallclientes/dialogallclientes.component';
import { DialogconveniopagoComponent } from './components/ventas/dialogconveniopago/dialogconveniopago.component';
import { DialogconvenioComponent } from './components/ventas/dialogconvenio/dialogconvenio.component';
import { DialogventasComponent } from './components/ventas/dialogventas/dialogventas.component';
import { DialogregistroappComponent } from './components/ventas/dialogregistroapp/dialogregistroapp.component';
import { DialogitemscompraComponent } from './components/compras/dialogitemscompra/dialogitemscompra.component';
import { DialogitemsnotaventaComponent } from './components/compras/dialogitemsnotaventa/dialogitemsnotaventa.component';
import { DialogProSerComponent } from './components/productosservicios/dialog-pro-ser/dialog-pro-ser.component';
import { DialogprodservComponent } from './components/productosservicios/dialogprodserv/dialogprodserv.component';
import { DialogconfirmacionComponent } from './components/productosservicios/dialogconfirmacion/dialogconfirmacion.component';
import { DialogperfilusuarioComponent } from './components/perfilusuario/dialogperfilusuario/dialogperfilusuario.component';
import { DialognuevomedidorComponent } from './components/clientes/dialognuevomedidor/dialognuevomedidor.component';
import { DialogcalculoempleadosComponent } from './components/empleados/dialogcalculoempleados/dialogcalculoempleados.component';
import { DialogfacturaComponent } from './components/ventas/dialogfactura/dialogfactura.component';
import { DialogempleadosventasComponent } from './components/ventas/dialogempleadosventas/dialogempleadosventas.component';
import { EmapadashComponent } from './components/dashboard/emapadash/emapadash.component';
import { DialogallnovedadesComponent } from './components/emapa/dialogallnovedades/dialogallnovedades.component';
import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { DialogempleadoeditarComponent } from './components/proyeccion/dialogempleadoeditar/dialogempleadoeditar.component';
registerLocaleData(localeFr);

// libreria para uso de cookies
import { CookieService } from 'ngx-cookie-service';
import { JwtInterceptorInterceptor } from './interceptor/jwt-interceptor.interceptor';
import { PerfilusuarioComponent } from './home/perfilusuario/perfilusuario.component';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DialogeditrolComponent } from './components/empleados/dialogeditrol/dialogeditrol.component';
import { CerrarsesionComponent } from './components/menuhorizontal/cerrarsesion/cerrarsesion.component';
import { MultasComponent } from './home/multas/multas.component';
import { DialogmultasComponent } from './components/multas/dialogmultas/dialogmultas.component';
import { DialogporcobrarComponent } from './components/ventas/dialogporcobrar/dialogporcobrar.component';
import { DialogcobradasComponent } from './components/ventas/dialogcobradas/dialogcobradas.component';
import { DialogreportesComponent } from './components/ventas/dialogreportes/dialogreportes.component';
import { DialoglecturasComponent } from './components/lecturas/dialoglecturas/dialoglecturas.component';
import { LecturasComponent } from './home/lecturas/lecturas.component';
import { DialogmultaeditarComponent } from './components/multas/dialogmultaeditar/dialogmultaeditar.component';
import { DialogmultacobrarComponent } from './components/multas/dialogmultacobrar/dialogmultacobrar.component';
import { DialogmultareporteComponent } from './components/multas/dialogmultareporte/dialogmultareporte.component';
import { DialogmultacrearComponent } from './components/multas/dialogmultacrear/dialogmultacrear.component';
import { DialogclientesreporteComponent } from './components/clientes/dialogclientesreporte/dialogclientesreporte.component';
import { DialogcrearprefacComponent } from './components/ventas/dialogcrearprefac/dialogcrearprefac.component';
import { DialoglecturascreateComponent } from './components/lecturas/dialoglecturascreate/dialoglecturascreate.component';
import { DialogconexionnuevaComponent } from './components/multas/dialogconexionnueva/dialogconexionnueva.component';
import { DialoginventariomulComponent } from './components/multas/dialoginventariomul/dialoginventariomul.component';
import { DialogeditinventarioComponent } from './components/inventario/dialogeditinventario/dialogeditinventario.component';
import { DialogcobrosComponent } from './components/dashboard/dialogcobros/dialogcobros.component';
import { DialogconsumoaguaComponent } from './components/dashboard/dialogconsumoagua/dialogconsumoagua.component';
import { EditlecturasComponent } from './components/lecturas/editlecturas/editlecturas.component';
import { GenerarFacturasComponent } from './home/generar-facturas/generar-facturas.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ProductosserviciosComponent,
    ClientesComponent,
    EmpleadosComponent,
    DialogProSerComponent,
    ProyeccionComponent,
    DialogclientesComponent,
    DashboardComponent,
    DialogconfirmacionComponent,
    VentasComponent,
    DialogventasComponent,
    ComprasComponent,
    DialogcomprasComponent,
    DialogcomprasregistradasComponent,
    DialogprodservComponent,
    DialogempleadosComponent,
    DialoregistroempleadosComponent,
    DialogregistroappComponent,
    DialogempleadoComponent,
    DialogperfilusuarioComponent,
    DialogappfacturasComponent,
    DialogconveniopagoComponent,
    DialognuevomedidorComponent,
    DialogallclientesComponent,
    DialogconvenioComponent,
    DialogrendimientoproyectoComponent,
    DialogempleadoproyeccionComponent,
    DialogitemscompraComponent,
    DialogitemsnotaventaComponent,
    DialoginsumosComponent,
    DialogequipominimoComponent,
    MilesPipe,
    DialogcalculoempleadosComponent,
    DialogtablapujaComponent,
    DialogcatastrosComponent,
    DialogasignarempleadoComponent,
    DialoginventarioComponent,
    DialoginventarioasignadoComponent,
    DialogdevolucionComponent,
    DialognotificacionesComponent,
    DialognovedadesComponent,
    CatastrosComponent,
    InventarioesmeraldasComponent,
    EmapaComponent,
    SueldosComponent,
    DialogsueldoempleadoComponent,
    SueldospagadosComponent,
    DialogcortesComponent,
    DialogreconexionesComponent,
    DialogdocumentosComponent,
    DialogeditempleadoComponent,
    DialogfacturaComponent,
    DialogempleadosventasComponent,
    EmapadashComponent,
    DialogallnovedadesComponent,
    DialogempleadoeditarComponent,
    PerfilusuarioComponent,
    DialogeditrolComponent,
    CerrarsesionComponent,
    MultasComponent,
    DialogmultasComponent,
    DialogporcobrarComponent,
    DialogcobradasComponent,
    DialogreportesComponent,
    DialoglecturasComponent,
    LecturasComponent,
    DialogmultaeditarComponent,
    DialogmultacobrarComponent,
    DialogmultareporteComponent,
    DialogmultacrearComponent,
    DialogclientesreporteComponent,
    DialogcrearprefacComponent,
    DialoglecturascreateComponent,
    DialogconexionnuevaComponent,
    DialoginventariomulComponent,
    DialogeditinventarioComponent,
    DialogcobrosComponent,
    DialogconsumoaguaComponent,
    EditlecturasComponent,
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HomeModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatListModule,
    MatPaginatorModule,
    MatTableModule,
    MatDialogModule,
    MatFormFieldModule,
    MatTabsModule,
    MatDatepickerModule,
    MatCheckboxModule,
    FormsModule,
    HttpClientModule,
    ChartsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularEmojisModule,
    PdfViewerModule,
    ImageUploadModule.forRoot(),
    ToastrModule.forRoot(),
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    }),
    MatProgressSpinnerModule
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'fr-FR'},
    CookieService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptorInterceptor,
      multi: true
    }
],
  entryComponents:[DialogProSerComponent],
  bootstrap: [AppComponent]
  
})
export class AppModule { }
