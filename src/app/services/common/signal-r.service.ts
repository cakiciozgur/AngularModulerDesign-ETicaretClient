import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder, HubConnectionState } from '@microsoft/signalr';
import { error } from 'console';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {

  constructor() { }

  private _connection: HubConnection;
  get connection(): HubConnection {
    return this._connection;
  }


  start(hubUrl: string) { // başlatılmış bir hub dönecek

    if (!this.connection || this.connection.state == HubConnectionState.Disconnected) {

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

      this._connection = hubConnection
    }

    this._connection.onreconnected(connectionId => console.log("reconnected"));
    this._connection.onreconnecting(error => console.log("reconnecting"));
    this._connection.onclose(error => console.log("close reconnection"));
  }


  // signal r üzerinden başka hub/client message gönderme durumunda kullanılacak // event() fırlatmak
  invoke(procedurName: string, message: string, successCallBack?: (value) => void, errorCallBack?: (error) => void) {
    this.connection.invoke(procedurName, message)
      .then(successCallBack)
      .catch(errorCallBack);
  }

  // serverdan gelen anlık mesajları yakalamamı sağlayan fonskiyon
  on(procedurName: string, callBack: (...message: any) => void) {  //(...message şeklinde verdiğimizde c# params'a denk geliyor)
    this.connection.on(procedurName, callBack);
  }
}
