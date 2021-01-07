import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../services/firestore/firestore.service';
import { ActivatedRoute } from '@angular/router';
import { Sale } from "../../models/sale.model";

@Component({
	selector: 'app-empresa',
	templateUrl: './empresa.component.html',
	styleUrls: ['./empresa.component.css']
})
export class EmpresaComponent implements OnInit {

	public ventas: Sale[] = [];
	public nameAgency: string;
	public asc: boolean = false;
	public sortClientes: boolean = false;
	public sortPersonas: boolean = false;
	public sortVentas: boolean = false;
	public sortDias: boolean = false;

	constructor(
		private route: ActivatedRoute,
		private firestoreService: FirestoreService
	) { }

	ngOnInit() {
		this.nameAgency = this.route.snapshot.paramMap.get('nombre_empresa');
		this.getData(this.nameAgency);
	}

	getData(name: string) {

		this.firestoreService.getCompanys().subscribe((companysSnapshot) => {
			companysSnapshot.forEach((companysData: any) => {
				if (name === companysData.payload.doc.data().nameAgency) {
					this.ventas.push(
						companysData.payload.doc.data()
					);
				}
			});
		});
	}

	sortBy(order: string) {
		if (order === 'clientes') {
			this.sortClientes = true;
			this.sortPersonas = false;
			this.sortVentas = false;
			this.sortDias = false;
			if (!this.asc) {
				this.ventas.sort((a, b) => a.name.localeCompare(b.name));
				this.asc = true;
			} else {
				this.ventas.sort((a, b) => b.name.localeCompare(a.name));
				this.asc = false;
			}
		} else if (order === 'personas') {
			this.sortPersonas = true;
			this.sortClientes = false;
			this.sortVentas = false;
			this.sortDias = false;
			if (!this.asc) {
				this.ventas.sort((a, b) => a.persons - b.persons);
				this.asc = true;
			} else {
				this.ventas.sort((a, b) => b.persons - a.persons);
				this.asc = false;
			}
		} else if (order === 'ventas') {
			this.sortVentas = true;
			this.sortPersonas = false;
			this.sortClientes = false;
			this.sortDias = false;
			if (!this.asc) {
				this.ventas.sort((a, b) => a.finalPrice - b.finalPrice);
				this.asc = true;
			} else {
				this.ventas.sort((a, b) => b.finalPrice - a.finalPrice);
				this.asc = false;
			}
		} else if (order === 'dia') {
			this.sortDias = true;
			this.sortVentas = false;
			this.sortPersonas = false;
			this.sortClientes = false;
			if (!this.asc) {
				this.ventas.sort((a, b) => {
					var c = new Date(a.day);
					var d = new Date(b.day);
					return c > d ? 1 : -1;
				});
				this.asc = true;
			} else {
				this.ventas.sort((a, b) => {
					var c = new Date(a.day);
					var d = new Date(b.day);
					return c < d ? 1 : -1;  
				});
				this.asc = false;
			}
		}


	}

}
