import {TestBed, inject} from '@angular/core/testing';
import {Message} from '../models/message';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {Observable} from 'rxjs/Observable';
import {Injector} from '@angular/core';
import {MessageService} from './message.service';

describe('MessageService', () => {
  const mockMessages = [
    {
      id: 1,
      title: 'Title 1',
      content: 'Content 1',
      beginDate: new Date(),
      endDate: new Date()
    },
    {
      id: 2,
      title: 'Title 2',
      content: 'Content 2',
      beginDate: new Date(),
      endDate: new Date()
    }
  ];

  let injector: Injector;
  let httpMock: HttpTestingController;
  let messageService: MessageService;

  beforeEach(() => {
    injector = TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MessageService]
    });
    messageService = injector.get(MessageService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });


  it('MessageService should be created', () => {
    expect(messageService).toBeTruthy();
  });

  it('#getAllMessages should return list of messages', () => {
    messageService.getAllMessages()
      .subscribe(messages => {
        expect(messages.length).toBe(2);
        expect(messages[0].id).toEqual(1);
        expect(messages[1].id).toEqual(2);
      });
    const request = httpMock.expectOne(messageService.API_MESSAGE);
    expect(request.request.method).toEqual('GET');
    expect(request.request.responseType).toEqual('json');
    request.flush(mockMessages);
  });


  it('#createMessage should create a message', () => {
    const message = new Message('title', 'content', new Date(), new Date());
    messageService.createMessage(message)
      .subscribe(() => {});
    const request = httpMock.expectOne(messageService.API_MESSAGE);
    expect(request.request.method).toEqual('POST');
    expect(request.request.body).toEqual(message);
    expect(request.cancelled).toBeFalsy();
    expect(request.request.responseType).toEqual('json');
    request.flush([]);
  });

  it('#createMessage should throw error when API return an error.', () => {
    const errorMessage = 'Bad Request - Message content is mandatory';
    const message = new Message('title', null, new Date(), new Date());
    messageService.createMessage(message)
      .catch(error => {
        expect(Observable.of(error)).toBeTruthy();
        expect(error).toBeTruthy();
        return Observable.of(errorMessage);
      })
      .subscribe(() => {});

    const request = httpMock.expectOne(messageService.API_MESSAGE);
    expect(request.request.method).toEqual('POST');
    request.flush({errorMessage: errorMessage}, {status: 400, statusText: errorMessage});
  });

  it('#deleteMessage should delete a message', () => {
    const idMessage = 1;
    messageService.deleteMessage(idMessage)
      .subscribe(() => {});
    const request = httpMock.expectOne(messageService.API_MESSAGE + '/' + idMessage);
    expect(request.request.method).toEqual('DELETE');
    expect(request.request.body).toEqual(null);
    request.flush([]);
  });

  //
  //   API: GET /message/:id
  //  public getMessageById(messageId: number): Observable<Message> {
  //    const params = new HttpParams().set('id', messageId.toString());
  //    return this.httpClient.get<Message>(this.API_MESSAGE, {params});
  //  }
  //
  //   API: PUT /message/:id
  //  public updateMessage(message: Message): Observable<any> {
  //    return this.httpClient.put(this.API_MESSAGE, message);
  //  }

});
