import { Component } from '@angular/core';

@Component({
  selector: 'app-diretiva-ngif',
  templateUrl: './diretiva-ngif.component.html',
  styleUrls: ['./diretiva-ngif.component.css']
})
export class DiretivaNgifComponent {

  cursos = ["Angular2"];

  mostrarCursos = false;

  onMostrarCursos(){
    this.mostrarCursos = !this.mostrarCursos;
  }
}
