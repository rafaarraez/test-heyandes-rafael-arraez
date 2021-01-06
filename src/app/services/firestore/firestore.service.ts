import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  public empresas;

  constructor(
    private firestore: AngularFirestore,
    private http: HttpClient
  ) { }
  
  //Obtiene una empresa
  public getCompany(id: string) {
    return this.firestore.collection("sales").doc(id).snapshotChanges();
  }
  //Obtiene todas las empresas
  public getCompanys() {
    return this.firestore.collection("sales").snapshotChanges();
  }

  public getData(): Observable<any>{
    return this.http.get("../../assets/sales.json");
  }
  
}
