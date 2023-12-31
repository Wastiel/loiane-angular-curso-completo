# Serviços

# 01. Introdução a Serviços

- [Vídeo Aula](https://youtu.be/1-HAHOc4ZJY)
- Introdução a Serviçe
- Serviço são classes que são responsaveis por buscar dados do servidor e enviar dados par ao servidor.
- Não colocamos no componente um busca dados do servidor, e sim dentro da Serviçe.
- Vai muito além de fazer um crud.
- São uties para não repetirmos códigos na nossa aplicação
- Digamos que tenhamos 3 componentes com um método de fazerAlgumaCoisa()
	- Se no futuro, termos que ajustar em tudo que é lugar.
	- Utilizamos o método dry, não repita código
	- Fazemos uma classe de serviço.
	- Como nossos componentes precisam utilizar este método.
	- Aplicamos nossa lógica dentro
	- O ideal é que toda a lógica de negócio, fique nas classes de serviço.
	- Componentes responsáveis por pegar o dado e mostrar o dado na tela.
	- Qualquer manipulação de dados o ideal é dentro da classe de serviço.
	- Facilita migração de tecnologia
- dry: don't repeat yourself
- Classes utilitárias pode utilizar classes de serviço. 
	- metodos de formatação
	- Metodos de utilitarios
	- Metodos de tradução
- exemplo pokeapi
- Classe para podermos fazer crud
	- Utilizamos http para fazermos conexão com o nosso servidor.
- Adiantmaos a criação do projeto
	- ng new 05_servicos
 

# 02. Criando um serviço (Service)

- [Vídeo Aula](https://youtu.be/8fE1e9j6fJo)
- Vamos criar uma classe de serviço.
	- ng new 05_servicos
	- ng g c cursos
- Vamos entender, pq utilizar serviços
- Fizemos um vetor e colocamos algumas informações e mostramos em tela
	- Em uma aplicação não vamos ter os dados de forma estatica
- Para exemplificar a maneira simples de realizars uma chamada via service, fizemos as seguintes questões:
	- Criamos uma classe de serviço de forma manual junto ao componente
		- cursos.service.ts
	- Posterior populamos a classe com um vetor e expomos a mesma
		````typeScript
			export class CursosService{

		    getCursos(){
		        return ['Angular 2', 'Java', 'Phonegap'];
		    }

		}
		````
	- Posterior ajustamos o nosso componente
		````typeScript
			import { Component, OnInit } from '@angular/core';

			import { CursosService } from './cursos.service';

			@Component({
			  selector: 'app-cursos',
			  templateUrl: './cursos.component.html',
			  styleUrls: ['./cursos.component.css']
			})
			export class CursosComponent implements OnInit{

			  cursos: string[] = [];
			  cursosService!: CursosService;

			  constructor(){
			    this.cursosService = new CursosService();
			  }

			  ngOnInit(){
			    this.cursos = this.cursosService.getCursos();
			  }

			}
		````
	- Ajustamos o nosso html
		````html
			<h5>Lista de cursos</h5>

			<ul>
			    <li *ngFor="let curso of cursos">
			    {{ curso }}
			    </li>

			</ul>

		````
- No mundo real, não queremos instanciar a service manualmente.
	- Injeção de dependencia, criando a instancia automáticamente.
	- Vamos aprender nas próximas aulas.

# 03. Injeção de Dependência (DI) + como usar um serviço em um componente

- [Vídeo Aula](https://youtu.be/KqsFxBMlM9s)
- Injeção de dependencias
	- Como usar um serviço em um componente
- Precisamos nos perguntar, o que é uma dependencia?
	- Classes de javaScript
- Uma classe 1 precise de outra instancia de outra classe para funcionar
- Conseguimos fazer de 3 maneiras diferentes
	- Construtores
	- Métodos setters
	- Atributos
- Vamos ver como fazer automaticamente, sem ser manualmente.
- Usamos a injeção na classe de serviço, para dizer que a mesma pode ser utilizadas
	````typeScript
		import { Injectable } from "@angular/core";

		@Injectable()
		export class CursosService{

		    getCursos(){
		        return ['Angular 2', 'Java', 'Phonegap'];
		    }

		}

	````
- Posterior passamos no contrutor o determinado parametro
	````typeScript
		import { Component, OnInit } from '@angular/core';

		import { CursosService } from './cursos.service';

		@Component({
		  selector: 'app-cursos',
		  templateUrl: './cursos.component.html',
		  styleUrls: ['./cursos.component.css']
		})
		export class CursosComponent implements OnInit{

		  cursos: string[] = [];
		  cursosService!: CursosService;

		  constructor(_cursosService: CursosService){
		    //this.cursosService = new CursosService();
		    this.cursosService = _cursosService;
		  }

		  ngOnInit(){
		    //this.cursos = this.cursosService.getCursos();
		  }

		}
	````
- Posterior precisamos dizer ao angular, pelo fato de termos criado a classe de serviço automáticamente, que a mesma é um provider
	````typeScript
		import { NgModule } from '@angular/core';
		import { BrowserModule } from '@angular/platform-browser';

		import { AppRoutingModule } from './app-routing.module';
		import { AppComponent } from './app.component';
		import { CursosComponent } from './cursos/cursos.component';
		import { CursosService } from './cursos/cursos.service';

		@NgModule({
		  declarations: [
		    AppComponent,
		    CursosComponent
		  ],
		  imports: [
		    BrowserModule,
		    AppRoutingModule
		  ],
		  providers: [CursosService],
		  bootstrap: [AppComponent]
		})
		export class AppModule { }

	````

- Com estes 3 passos conseguimos utilizar a injeção de dependencia.


# 04. Escopo de instâncias de serviços e módulos (singleton e várias instâncias)

- [Vídeo Aula](https://youtu.be/R3lU_qFsPlg)
- Criamos o componente para utilização
	- ng g c criar-curso
- Aprender entre ter varias instancias de classe de serviço
- Aprender a ter uma instancia, o modo singinton
- Vamos fazer com que dois componentes utilizem o mesmo serviço.
- Fizemos a plógica do nosso componente de serviço, conforme a seguir:
	````typeScript
		import { Component } from '@angular/core';

		import { CursosService } from '../cursos/cursos.service'

		@Component({
		  selector: 'app-criar-curso',
		  templateUrl: './criar-curso.component.html',
		  styleUrls: ['./criar-curso.component.css']
		})
		export class CriarCursoComponent {

		  cursos: string[] = [];

		  constructor(private cursosService: CursosService){ 

		  }

		  ngOnInit(){
		    this.cursos = this.cursosService.getCursos();
		  }


		}
	````
	````html
		<h5>Lista de cursos compartilhada entre serviços</h5>

		<ul>
		    <li *ngFor="let curso of cursos">
		    {{ curso }}
		    </li>

		</ul>


	````
- Colocamos um console.log('CrusosService'), para avaliar quantas vezes a mesma é instanciada
	- Somente uma.
- Singlinton, uma instancia do serviço para tudo
	- Vai depender do escopo que você quer para o seu serviço.
- Se quer escopo para dentro da aplicação
	- Declara dentro do app.module
- Caso contrario, se declara um serviço no provider a um determinado módulo
- Quando declaramos o serviço dentro do módulo, todos decorations vao ter acesso aquele serviço
	- Se Voc~e quer que um serviço seja acessado por um unico componente
	- Adicionamos dentro do provider do component
	````typeScript
		@Component({
		  selector: 'app-criar-curso',
		  templateUrl: './criar-curso.component.html',
		  styleUrls: ['./criar-curso.component.css'],
		  providers: [CursosService]
		})
	````
	- Temos duas saidas do console do contrutor do serviço.
- Vamos refatorar para a próxima aula
- Criamos um botao para acessar a service e adicionar cursos
	````html
		<h5>Lista de cursos compartilhada entre serviços</h5>

		<input type="text" #cursoInput>
		<button (click)="onAddCurso(cursoInput.value)">Add Curso</button>

		<ul>
		    <li *ngFor="let curso of cursos">
		    {{ curso }}
		    </li>

		</ul>

	````
	- Ajustamos a nossa service para receber o determinado curso

	````typeScript
		import { Injectable } from "@angular/core";

		@Injectable()
		export class CursosService{

		    private cursos: string[] = ['Angular 2', 'Java', 'Phonegap'];

		    constructor(){
		        console.log('CruosService');
		    }

		    getCursos(){
		        return this.cursos;
		    }

		    addCurso(curso: string){
		        this.cursos.push(curso);
		    }

		}

	````
	- Posterior ajustamos o nosso criar-curso.component, para pegar a serviçe e adicionar um curso
	````typeScript
		import { Component } from '@angular/core';

		import { CursosService } from '../cursos/cursos.service'

		@Component({
		  selector: 'app-criar-curso',
		  templateUrl: './criar-curso.component.html',
		  styleUrls: ['./criar-curso.component.css'],
		  //providers: [CursosService]
		})
		export class CriarCursoComponent {

		  cursos: string[] = [];

		  constructor(private cursosService: CursosService){ 

		  }

		  ngOnInit(){
		    this.cursos = this.cursosService.getCursos();
		  }

		  onAddCurso(curso: string){
		    this.cursosService.addCurso(curso);
		  }

		}

	````


# 05. Comunicação entre componentes usando serviços (broadcast de eventos)

- [Vídeo Aula](https://youtu.be/R9afVKty3Dg)
- Para componentes se comunicar
	- Input propreties
	- Ouptput propreties
- A maneira que vamos utilizar aqui é o componente para componente, excluindo a ideia de pai e filho
- Adicionamos na nossa classe de serviço algo para ouvir um evento
	- EventEmitter
- Ajustamos o curso componente, para ficar ouvindo o que estamos digitando
- Criamos um novo componente
	- ng g c receber-curso-criado
- Depois de criarmos o componente, nao queremos que o nosso appmodle tenha o mesmo inicializado
- Retiramos a nossa injeção e adicionamos no criar-curso.module
	- ReceberCursoCriadoComponent
- Chamaos o seletor do receber curso criado dentro do nosso cirar curso
	- <app-receber-curso-criado></app-receber-curso-criado>
- Injetamos o serviço dentro do componente criado
	````typeScript
		export class ReceberCursoCriadoComponent {

		  constructor(private cursoService: CursosService){}

		}
	````
- Fizemos um ajuste para o receber curso criado
	- Ajustamos o HTMl para mostrar o ultimo curso criado
		````html
		<p *ngIf="curso">
		    O Ultimo curso criado fi: {{ curso }}
		</p>

		````
	- Também fizemos um ajuste na nossa classe typeScript
		````typeScript
			export class ReceberCursoCriadoComponent implements OnInit {

			  curso!: string;
			  

			  constructor(private cursosService: CursosService){}

			  ngOnInit(){
			    this.cursosService.emitirCursosCriado.subscribe(
			      cursoCriado=> this.curso = cursoCriado
			    )
			  }

			}
		````
- Com isto temos a emissão de um componente para outro componente
- Criamos um metodo static, nao precisamos da instancia da classe para acessar o mesmo
	- Diferente do acesso ao mesmo
- Com o static, nao precisamos injetar nada no código

# 06. Injetando um serviço em outro serviço

- [Vídeo Aula](https://youtu.be/hMhCDO75Aus)
- Injetar um serviço em outro serviço.
- Criar um serviço com angular CLI
	- ng g s shared/log
- Posterior precisamos adicionar este serviço ao nosso app.Module (Não faz sozinho), com escopo gobal
	````typeScript
		import { NgModule } from '@angular/core';
		import { BrowserModule } from '@angular/platform-browser';

		import { AppRoutingModule } from './app-routing.module';
		import { AppComponent } from './app.component';
		import { CursosModule } from './cursos/cursos.module';
		import { CursosService } from './cursos/cursos.service';
		import { CriarCursoModule } from './criar-curso/criar-curso.module';
		import { LogService } from './shared/log.service';



		@NgModule({
		  declarations: [
		    AppComponent,        
		  ],
		  imports: [
		    BrowserModule,
		    AppRoutingModule,
		    CriarCursoModule,
		    CursosModule    
		  ],
		  providers: [
		    CursosService,
		    LogService
		  ],
		  bootstrap: [AppComponent]
		})
		export class AppModule { }

	````
- Como injetar este serviço na nossa classe do curso service
	- vamos na classe de serviço desejada
	````typeScript
		import { EventEmitter, Injectable } from "@angular/core";

		import { LogService } from "../shared/log.service";

		@Injectable()
		export class CursosService{

		    emitirCursosCriado = new EventEmitter<string>();
		    static criouNovoCurso = new EventEmitter<string>();

		    private cursos: string[] = ['Angular 2', 'Java', 'Phonegap'];

		    constructor(private logService: LogService){
		        console.log('CruosService');
		    }

		    getCursos(){
		        return this.cursos;
		    }

		    addCurso(curso: string){
		        this.cursos.push(curso);
		        this.emitirCursosCriado.emit(curso);
		        CursosService.criouNovoCurso.emit(curso);
		    }

		}
	```` 
- Validamos via ngserve se deu tudo certo e depois podemos começar a utilizar a nossa classe de serviço.
- Ajustamos o nosso curso service, injetando o determinado servico:
	````typeScript
		import { EventEmitter, Injectable } from "@angular/core";

		import { LogService } from "../shared/log.service";

		@Injectable()
		export class CursosService{

		    emitirCursosCriado = new EventEmitter<string>();
		    static criouNovoCurso = new EventEmitter<string>();

		    private cursos: string[] = ['Angular 2', 'Java', 'Phonegap'];

		    constructor(private logService: LogService){
		        console.log('CruosService');
		    }

		    getCursos(){
		        this.logService.consoleLog('obtendo lista de cursos');
		        return this.cursos;
		    }

		    addCurso(curso: string){
		        this.logService.consoleLog(`criando um novo curso ${curso}`);
		        this.cursos.push(curso);
		        this.emitirCursosCriado.emit(curso);
		        CursosService.criouNovoCurso.emit(curso);
		    }

		}
	````
- Com isto conseguimos injetar um serviço dentro de outro serviço.