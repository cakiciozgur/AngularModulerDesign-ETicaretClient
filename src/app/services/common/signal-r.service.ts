import { Inject, Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder, HubConnectionState } from '@microsoft/signalr';
import { error } from 'console';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {

  constructor(@Inject("baseSignalRUrl") private baseSignalRUrl: string) { }

  start(hubUrl: string) { // başlatılmış bir hub dönecek

    hubUrl = this.baseSignalRUrl + hubUrl;

      const builder: HubConnectionBuilder = new HubConnectionBuilder();

      const hubConnection: HubConnection = builder.withUrl(hubUrl)
        .withAutomaticReconnect()
        .build();

      hubConnection.start()
        .then(() => {
          console.log("Connected");
        })
        .catch(error => { // start işlemi başarılı değilse 2sn de bir denenecek
          setTimeout(() => this.start(hubUrl), 2000)
        });

    hubConnection.onreconnected(connectionId => console.log("reconnected"));
    hubConnection.onreconnecting(error => console.log("reconnecting"));
    hubConnection.onclose(error => console.log("close reconnection"));

    return hubConnection;
  }


  // signal r üzerinden başka hub/client message gönderme durumunda kullanılacak // event() fırlatmak
  invoke(hubUrl: string, procedurName: string, message: string, successCallBack?: (value) => void, errorCallBack?: (error) => void) {
    this.start(hubUrl).invoke(procedurName, message)
      .then(successCallBack)
      .catch(errorCallBack);
  }

  // serverdan gelen anlık mesajları yakalamamı sağlayan fonskiyon
  on(hubUrl: string, procedurName: string, callBack: (...message: any) => void) {  //(...message şeklinde verdiğimizde c# params'a denk geliyor)
    this.start(hubUrl).on(procedurName, callBack);
  }
}
