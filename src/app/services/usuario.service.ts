import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  url = 'http://localhost:3000/';
  constructor(public http:HttpClient, public https:HttpClient) { }
  saveUsuario(usuario:any){
    return new Promise(resolve => {
      this.http.post(this.url+'usuario',usuario).subscribe({
        next: (data) => {
          resolve(data);
        },
        error: (err)=> {
          console.log(err);
        }
      });
    });
  }
  getUsers(){
    return new Promise(resolve => {
      this.http.get(this.url+'usuarios').subscribe({
        next: (data) => {
          resolve(data);
        },
        error: (err)=> {
          console.log(err);
        }
      });
    });
  }
  getUsers1(){
    return new Promise(resolve => {
      this.http.get(this.url+'usuarios1').subscribe({
        next: (data) => {
          resolve(data);
        },
        error: (err)=> {
          console.log(err);
        }
      });
    });
  }
  getUserById(id: number){
    return new Promise(resolve => {
      this.http.get(this.url + 'usuario/getById/' + id).subscribe({
        next: (data) =>{
          resolve(data);
        },
        error:(err) =>{
          console.log(err);
        }
      });
    });
  }
  updateUsuario(id: number, usuario: any) {
    return new Promise((resolve, reject) => {
      this.http.put(this.url + 'usuario/update/' + id, usuario).subscribe({
        next: (data) => {
          resolve(data);
        },
        error: (err) => {
          console.log(err);
          reject(err);
        }
      });
    });
  }
  deleteUsuario(id: number) {
    return new Promise((resolve, reject) => {
      this.http.delete(this.url + 'usuario/delete/' + id).subscribe({
        next: (data) => {
          resolve(data);
        },
        error: (err) => {
          console.log(err);
          reject(err);
        }
      });
    });
  }
  checkEmailExists(email: string): Observable<{ emailExists: boolean }> {
    return this.http.get<{ emailExists: boolean }>(`${this.url}usuario/checkEmail/${email}`);
  }
  checkCedulaExists(cedula: string): Observable<{ cedulaExists: boolean }> {
    return this.http.get<{ cedulaExists: boolean }>(`${this.url}usuario/checkCedula/${cedula}`);
  }
}
