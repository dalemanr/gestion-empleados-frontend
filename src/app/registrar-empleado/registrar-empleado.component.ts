import { Component, OnInit } from '@angular/core';
import { Empleado } from '../empleado';
import { EmpleadoService } from '../empleado.service';
import { Router } from '@angular/router';
import { error } from 'console';

@Component({
  selector: 'app-registrar-empleado',
  templateUrl: './registrar-empleado.component.html',
  styleUrl: './registrar-empleado.component.css'
})
export class RegistrarEmpleadoComponent implements OnInit{
  
  empleado:Empleado = new Empleado();
  
  constructor(private empleadoService : EmpleadoService, private router : Router){}

  ngOnInit(): void {
      
  }

  public saveEmpleado(){
    this.empleadoService.saveEmpleado(this.empleado).subscribe(e =>{
      console.log(e);
      this.listEmpleados();
    }, error => console.log(error));
  }

  public listEmpleados(){
    this.router.navigate(['/empleados'])
  }

  public onSubmit(){
    this.saveEmpleado();
  }

}
