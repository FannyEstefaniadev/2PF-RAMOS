import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs'
import { users, teachers } from './modelos';

@Injectable({
  providedIn: 'root'
})
export class UserService {

private USERS_DATA: users[] = [

  {
  id: 1,
  nombres: 'Nestor Gabriel',
  apellidos: "Ramos",
  usuario: "sysy344",
  edad: 36,
  correo: "nesGa@hotmail.com",
  password: "1334243"
  },

  {
  id: 2,
  nombres: 'Gustavo ',
  apellidos: "Ramos",
  usuario: "nini345",
  edad: 21,
  correo: "gust@gmail.com",
  password: "13242343"
  },
  {
  id: 3,
  nombres: 'Camila selene',
  apellidos: "Ramos",
  usuario: "coraz99",
  edad: 26,
  correo: "camiSel@gmail.com",
  password: "32443234"
  },
];

private TEACHERS_DATA: teachers[] = [

  {
  id: 1,
  nombres: 'Miguel',
  apellidos: "Gonzales",
  usuario: "mi432534e",
  edad: 38,
  nivelAcademico: '---',
  materias: ['Angular'],
  correo: "guel@hotmail.com",
  password: "12345678"
  },
  {
  id: 2,
  nombres: 'Emilio',
  apellidos: "Barrios",
  usuario: "fddf2345",
  edad: 27,
  nivelAcademico: '---',
  materias: ['Desarrollo web'],
  correo: "emi@gmail.com",
  password: "12345678"
  },
  {
  id: 3,
  nombres: 'Antonia',
  apellidos: "Luz",
  usuario: "dsdf12323",
  edad: 30,
  nivelAcademico: '---',
  materias: ['Java'],
  correo: "luxz@gmail.com",
  password: "12345678"
  },
];

private _users$ = new BehaviorSubject<users[]>([]);
private users$ = this._users$.asObservable();

private _teachers$ = new BehaviorSubject<teachers[]>([]);
private teachers$ = this._teachers$.asObservable();

  constructor() {}

    isTeacher(data: users | teachers){
      return ('nivelAcademico' in data)
    }

    getUsers(): Observable<users[]>{
    
      this._users$.next(this.USERS_DATA);
      return this.users$;
    }

    getTeachers(): Observable<teachers[]>{
      this._teachers$.next(this.TEACHERS_DATA);
      return this.teachers$;
    }

    createUser(user: users | teachers): void {
      if('nivelAcademico' in user){
        this.TEACHERS_DATA = [...this.TEACHERS_DATA, user];
        this._teachers$.next(this.TEACHERS_DATA)
      }else{
        this.USERS_DATA = [...this.USERS_DATA, user];
        this._users$.next(this.USERS_DATA)
      }
    }

    updateUser(userToUpdate: users | teachers): void {
      const {id, ...rest} = userToUpdate;
      if(this.isTeacher(userToUpdate)){
      const NEW_USER_DATA = this.TEACHERS_DATA.map((user) => {
        if(user.id === id){
          return {...user, ...rest}
        }else{
          return user
        }
      })
    
        this.TEACHERS_DATA = NEW_USER_DATA;
        this._teachers$.next(NEW_USER_DATA)
      }else{
        const NEW_USER_DATA = this.USERS_DATA.map((user) => {
          if(user.id === id){
            return {...user, ...rest}
          }else{
            return user
          }
        })
        this.USERS_DATA = NEW_USER_DATA;
        this._users$.next(NEW_USER_DATA)
      }
    }

    deleteUser(userToDelete: users | teachers ): void {
      if(this.isTeacher(userToDelete)){
        this.TEACHERS_DATA = this.TEACHERS_DATA.filter((user) => user.id !== userToDelete.id)
        this._teachers$.next(this.TEACHERS_DATA)
      }else{
        this.USERS_DATA = this.USERS_DATA.filter((user) => user.id !== userToDelete.id)
        this._users$.next(this.USERS_DATA)
      }
    }
}
