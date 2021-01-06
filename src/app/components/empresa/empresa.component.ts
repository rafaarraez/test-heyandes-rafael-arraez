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
			console.log(this.ventas);

		});
	}

}
