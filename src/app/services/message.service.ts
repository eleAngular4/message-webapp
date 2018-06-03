import {environment} from '../../environments/environment';
import {Message} from '../models/message';
import {HttpHeaders} from '@angular/common/http';
import {HttpParams, HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class MessageService {

  readonly API_MESSAGE: string = environment.BACKEND_ADDRESS + '/api/secured/message';

  constructor(private httpClient: HttpClient) {}

  // API: GET /messages
  public getAllMessages(): Observable<Array<Message>> {
    return this.httpClient.get<Array<Message>>(this.API_MESSAGE);
  }

  // API: POST /message
  public createMessage(message: Message): Observable<any> {
    return this.httpClient.post(this.API_MESSAGE, message);
  }

  // API: GET /message/:id
  public getMessageById(messageId: number): Observable<Message> {
    const params = new HttpParams().set('id', messageId.toString());
    return this.httpClient.get<Message>(this.API_MESSAGE, {params});
  }

  // API: PUT /message/:id
  public updateMessage(message: Message): Observable<any> {
    return this.httpClient.put(this.API_MESSAGE, message);
  }

  // DELETE /message/:id
  public deleteMessage(messageId: number): Observable<any> {
    return this.httpClient.delete(`${this.API_MESSAGE}/${messageId}`);
  }

}
