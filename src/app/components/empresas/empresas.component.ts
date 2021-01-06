import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from "rxjs";
import { FirestoreService } from '../../services/firestore/firestore.service';
import { Sale } from "../../models/sale.model";

@Component({
	selector: 'app-empresas',
	templateUrl: './empresas.component.html',
	styleUrls: ['./empresas.component.css']
})
export class EmpresasComponent implements OnInit {

	public empresas: Sale[] = [];
	public ventas: Sale[] = [];
	public empresaMasVentas: Sale = null;
	public asc: boolean = true;

	constructor(
		private firestoreService: FirestoreService
	) { }

	ngOnInit() {
		this.getData();
	}

	getData() {

		this.firestoreService.getCompanys().subscribe((companysSnapshot) => {
			companysSnapshot.forEach((companysData: any) => {
				this.empresas.push(
					companysData.payload.doc.data()
				);
			});

			this.empresas.reduce((acc, item) => {
				//validando que el nombre de la agencia no este dentro del arreglo acc
				if ( !acc[item.nameAgency] ) {
					//agregando los valores necesarios al arreglo
					acc[item.nameAgency] = {
						nameAgency: item.nameAgency,
						finalPrice: 0
					};
					//agregando al arreglo ventas
					this.ventas.push(acc[item.nameAgency]);
				}

				//Acumulando el valor para obtener el precio final
				acc[item.nameAgency].finalPrice += item.finalPrice;
				
				let aux = 0;
				//verificando si el valor de precio final es mayor que el de la varible aux creada e iniciada en 0
				if (acc[item.nameAgency].finalPrice > aux) {
					// si este mayor la variable aux tomara su valor y empresaMasVentas almacenara 
					//los datos necesarios para mostrar en pantalla luego continuar evaluando hata llegar al final
					aux = acc[item.nameAgency].finalPrice;
					this.empresaMasVentas = acc[item.nameAgency];
				}
				return acc;
			}, {});
			this.ventas.sort((a,b) => a.nameAgency.localeCompare(b.nameAgency));
		});
	}

	sortByAgency(){

		if(!this.asc){
			this.ventas.sort((a,b) => a.nameAgency.localeCompare(b.nameAgency));
			this.asc = true;
		}else{
			this.ventas.sort((a,b) => b.nameAgency.localeCompare(a.nameAgency));
			this.asc = false;
		}
		
	}

}
