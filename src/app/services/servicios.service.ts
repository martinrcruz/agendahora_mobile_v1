import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServiciosService {

  private apiUrl: string = environment.apiUrl;
  private controllerUrl: string = 'servicio';

  constructor(
    private http: HttpClient
  ) { }


  getServicio(user_id: any | null | '' = '') {
    return this.http.post(`${this.apiUrl}${this.controllerUrl}/getServiciosActivos`, user_id);
  }
  getHistorialServicio(filtroData: any | null | '' = ''){
    return this.http.get(`${this.apiUrl}${this.controllerUrl}/getServicio`);
  }

  getIndicadores(data: any){
    return this.http.post(`${this.apiUrl}${this.controllerUrl}/getIndicadores`, data);

  }
}
