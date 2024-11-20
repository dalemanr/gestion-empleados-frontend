import { Component } from '@angular/core';
import { Empleado } from '../empleado';
import { EmpleadoService } from '../empleado.service';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, of, tap } from 'rxjs';
import { error } from 'console';
import { subscribe } from 'diagnostics_channel';

@Component({
  selector: 'app-actualizar-empleado',
  templateUrl: './actualizar-empleado.component.html',
  styleUrl: './actualizar-empleado.component.css'
})
export class ActualizarEmpleadoComponent {

  id: number;
  empleado : Empleado = new Empleado();

  constructor(private empleadoService : EmpleadoService, private router: Router, private route: ActivatedRoute){}

  ngOnInit():void{
    this.id = this.route.snapshot.params['id'];

    this.empleadoService.getEmpleadoById(this.id).pipe(
      tap(e=>{
        this.empleado = e;
      }),
      catchError(error =>{
        console.error(error);
        return of(null);
      })
    ).subscribe();
  }

  public irAEmpleados(){
    this.router.navigate(['/empleados']);
  }

  onSubmit(): void{
    if(this.empleado){
      this.empleadoService.updateEmpleado(this.id, this.empleado).pipe(
        tap(e=>{
          this.irAEmpleados();
        }),
        catchError(error=>{
          console.error('Error al actualizar el emplado:', error);
          return of(null);
        })
      ).subscribe();
    }
  }
}
