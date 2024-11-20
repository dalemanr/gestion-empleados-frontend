import { Component } from '@angular/core';
import { Empleado } from '../empleado';
import { ActivatedRoute } from '@angular/router';
import { EmpleadoService } from '../empleado.service';

@Component({
  selector: 'app-empleado-detalles',
  templateUrl: './empleado-detalles.component.html',
  styleUrl: './empleado-detalles.component.css'
})
export class EmpleadoDetallesComponent {

  id:number;
  empleado: Empleado;

  constructor(private route: ActivatedRoute, private empleadoService: EmpleadoService){}

  ngOnInit(): void{
    this.id = this.route.snapshot.params['id'];
    this.empleado = new Empleado();
    this.empleadoService.getEmpleadoById(this.id).subscribe(e =>{
      this.empleado = e;
    });

  }

}
