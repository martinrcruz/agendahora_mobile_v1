import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AgendaService {

  private apiUrl: string = environment.apiUrl;
  private controllerUrl: string = 'hora_agenda';
  constructor(private http: HttpClient) { }


  getAgenda() {
    return this.http.get(`${this.apiUrl}${this.controllerUrl}/getHoraAgenda`);
  }

  getAgendaById(id_hora_agenda: any) {
    return this.http.post(`${this.apiUrl}${this.controllerUrl}/getHoraAgendaById`, id_hora_agenda);
  }

  addAgenda(agendaData: any) {
    return this.http.post(`${this.apiUrl}${this.controllerUrl}/insertHoraAgenda`, agendaData);
  }

  updateAgenda(agendaData: any) {
    return this.http.post(`${this.apiUrl}${this.controllerUrl}/updateHoraAgenda`, agendaData);
  }

  deleteAgenda(id_hora_agenda: any) {
    return this.http.post(`${this.apiUrl}${this.controllerUrl}/deleteHoraAgenda`, id_hora_agenda);
  }

  getHorasDisponibles(fecha: string) {
    return this.http.get(`${this.apiUrl}${this.controllerUrl}/getHorasDisponibles/` + fecha);
  }
}

