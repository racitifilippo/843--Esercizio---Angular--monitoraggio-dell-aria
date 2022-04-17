import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';   // importare questo modulo
import { environment } from './../environments/environment';
import { HttpClient }  from'@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit , OnDestroy {
  
  title = '843-Esercizio-Angular-monitoraggio-dellaria';

  meteo:any;
  subscription:Subscription;

  apiEndpoint=environment.apiEndpoint;

  constructor( private httclient : HttpClient){}
 


  ngOnInit(): void {
    let observable=this.httclient.get<any>('https://dati.comune.milano.it/dataset/cc3c732a-99e1-432d-948d-12caad4c336d/resource/91451e4a-e73f-4db9-9c2b-22a6a0753ebd/download/qaria_reportariagiorno.json')
    this.subscription=observable.subscribe( httpResponse => { console.log(httpResponse); this.setMeteoData(httpResponse) })
  }

  setMeteoData(data:any){
    this.meteo = data; 
  }


  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe() 
    }
  }
}
