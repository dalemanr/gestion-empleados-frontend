import Swal from 'sweetalert2';
import { Component, OnInit } from '@angular/core';
import { Empleado } from '../empleado';
import { EmpleadoService } from '../empleado.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-lista-empleados',
  templateUrl: './lista-empleados.component.html',
  styleUrl: './lista-empleados.component.css'
})
export class ListaEmpleadosComponent implements OnInit{

  empleados:Empleado[];

  constructor(private empleadoService:EmpleadoService, private router: Router){}

  ngOnInit(): void {
    this.obtenerEmpleados();
  }

  private obtenerEmpleados(){
    this.empleadoService.getEmpleados().subscribe(e =>
    {
      this.empleados=e;
    }
    )
  }

  public detailsEmpleado(id: number){
    this.router.navigate(['detalle-empleado', id]);
  }

  public updateEmpleado(id: number){
    this.router.navigate(['actualizar-empleado', id]);
  }

  public deleteEmpleado(id: number): void {
    if (window.confirm("¿Estás seguro que deseas eliminar al empleado?")) {
      this.empleadoService.deleteEmpleado(id).subscribe({
        next: (dato) => {
          console.log(dato);
          this.obtenerEmpleados();
          window.alert("Empleado eliminado con éxito.");
        },
        error: (err) => {
          console.error(err);
          window.alert("Hubo un error al eliminar al empleado.");
        }
      });
    }
  }
  
  
  
  

  
}
