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
	public mesMasVentas: any = {};
	public empresaMasVentas: Sale = null;
	public asc: boolean = false;
	public sortVentas: boolean = false;
	public sortAgency: boolean = false;

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
				if (!acc[item.nameAgency]) {
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

			let resultado = [];
			this.empresas.reduce((res, value) => {
				// Creamos la posición del array para cada mes
				let mes = new Date(value.createdAt).getMonth();
				if (!res[mes]) {
					res[mes] = { 
						mes: mes,
						finalPrice: 0 
					};
					resultado.push(res[mes])
				}
				res[mes].finalPrice += value.finalPrice;
				return res;
			}, {});

			this.mesMasVentas = Object.values(resultado).reduce((prev: Sale, current: Sale) => prev.finalPrice > current.finalPrice ? prev : current);
			console.log(this.mesMasVentas.mes);
			console.log(resultado);
			
		});
	}

	sortByAgency(order: string) {
		if (order === 'agency') {
			this.sortAgency = true;
			this.sortVentas = false;
			if (!this.asc) {
				this.ventas.sort((a, b) => a.nameAgency.localeCompare(b.nameAgency));
				this.asc = true;
			} else {
				this.ventas.sort((a, b) => b.nameAgency.localeCompare(a.nameAgency));
				this.asc = false;
			}

		} else {
			this.sortVentas = true;
			this.sortAgency = false;
			if (!this.asc) {
				this.ventas.sort((a, b) => a.finalPrice - b.finalPrice);
				this.asc = true;
			} else {
				this.ventas.sort((a, b) => b.finalPrice - a.finalPrice);
				this.asc = false;
			}
		}


	}

	getMonth(month: number): string {
		let months = {
			0: "Enero",
			1: "Febrero",
			2: "Marzo",
			3: "Abril",
			4: "Mayo",
			5: "Junio",
			6: "Julio",
			7: "Agosto",
			8: "Septiembre",
			9: "Octubre",
			10: "Noviembre",
			11: "Diciembre"
		};
		return months[month];
	}

}
