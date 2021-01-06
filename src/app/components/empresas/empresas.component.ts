import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../services/firestore/firestore.service';

@Component({
	selector: 'app-empresas',
	templateUrl: './empresas.component.html',
	styleUrls: ['./empresas.component.css']
})
export class EmpresasComponent implements OnInit {
	empresas: any;
	nuevoObjeto: any = [];
	cont = 0;
	constructor(
		private firestoreService: FirestoreService
	) { }

	ngOnInit() {

		// this.firestoreService.getCompanys().subscribe(data => {
		// 	this.empresas = data;
		// 	console.log(this.empresas);
		// 	//Recorremos el arreglo 
		// 	this.empresas.forEach(x => {
		// 		//Si la ciudad no existe en nuevoObjeto entonces
		// 		//la creamos e inicializamos el arreglo de profesionales. 
		// 		if (!this.nuevoObjeto.hasOwnProperty(x.nameAgency)) {
		// 			this.nuevoObjeto[x.nameAgency] = {
		// 				gruped: []
		// 			}
		// 		}

		// 		//Agregamos los datos de profesionales. 
		// 		this.nuevoObjeto[x.nameAgency].gruped.push({
		// 			finalPrice: x.finalPrice,
		// 		})
		// 		this.cont++;
		// 	})
		// 	for (var val of this.nuevoObjeto) {
		// 		console.log(val); // prints values: 10, 20, 30, 40
		// 	}
		// 	console.log(typeof this.nuevoObjeto);
		//});

		this.firestoreService.getCompanys().subscribe((companysSnapshot) => {
			this.empresas = [];
			companysSnapshot.forEach((companysData: any) => {
			  this.empresas.push({
				data: companysData.payload.doc.data()
			  });
			})

			console.log( this.empresas);
			
		  });
	}

}
