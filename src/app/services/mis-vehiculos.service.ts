import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MisVehiculosService {

  private apiUrl: string = environment.apiUrl;
  private controllerUrl: string = 'vehiculo';

  constructor(private http: HttpClient) { }

  getVehiculo(data: any) {
    return this.http.post(`${this.apiUrl}${this.controllerUrl}/getVehiculoMobile`, data);
  }

  getMarcasVehiculo() {
    return this.http.get(`${this.apiUrl}/marca/getMarca`);
  }

  getModelosVehiculo(id_modelo: any) {
    return this.http.get(`${this.apiUrl}/modelo/getModelo/` + id_modelo);
  }

  getVersionVehiculo(id_version: any) {
    return this.http.get(`${this.apiUrl}/version/getVersion/` + id_version);
  }

  getVehiculoById(id: any) {
    return this.http.post(`${this.apiUrl}${this.controllerUrl}/getVehiculoById`, id);
  }

  getHistorialSolicitud(user_id: any) {
    return this.http.post(`${this.apiUrl}/solicitud_vehiculo/getSolicitudVehiculo`, user_id);
  }

  getHistorialSolicitudById(id_solicitud_vehiculo: any) {
    return this.http.get(`${this.apiUrl}/solicitud_vehiculo/getSolicitudVehiculoById/` + id_solicitud_vehiculo);
  }

  addVehiculo(vehiculoData: any) {
    return this.http.post(`${this.apiUrl}${this.controllerUrl}/insertVehiculo`, vehiculoData);
  }

  addSolicitudVehiculo(vehiculoData: any) {
    return this.http.post(`${this.apiUrl}/solicitud_vehiculo/insertSolicitudVehiculo`, vehiculoData);
  }


  updateVehiculo(vehiculoData: any) {
    return this.http.post(`${this.apiUrl}${this.controllerUrl}/updateVehiculo`, vehiculoData);
  }

  deleteVehiculo(id_vehiculo: any) {
    return this.http.post(`${this.apiUrl}${this.controllerUrl}/deleteVehiculo`, id_vehiculo);
  }
}
