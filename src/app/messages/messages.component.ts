import {Message} from '../models/message';
import {LocalStorageService} from '../services/localstorage.service';
import {MessageService} from '../services/message.service';
import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  messages: Array<Message>;
  errorMessage: string;

  constructor(private messageService: MessageService,
    private localStorageService: LocalStorageService,
    private router: Router) {}

  ngOnInit(): void {
    this.fetchMessages();
  }

  onNewMessage(): void {
    this.router.navigate(['/messages', 'new']);
  }

  onBack(): void {
    this.router.navigate(['/messages']);
  }

  logout(): void {
    if (confirm('Etes-vous sûr de vouloir vous deconnecter ?')) {
      this.localStorageService.removeToken();
      this.router.navigate(['/']);
    }
  }

  fetchMessages(): void {
    this.messageService.getAllMessages().subscribe(
      (messages: Array<Message>) => {
        console.log('les messages : ' + messages.length);
        this.messages = messages;
      },
      error => {
        this.errorMessage = <any>error;
      }
    );
  }

  onModify(message: Message) {
    return null;
  }

  onDetail(message: Message) {
    return null;
  }

  deleteMessage(message: Message) {
    if (confirm('Etes-vous sûr de vouloir supprimer ce message ?')) {
      this.messageService.deleteMessage(message.id).subscribe(
          () => { this.fetchMessages(); },
          error => { this.errorMessage = <any>error; }
      );
    } else {
      return null;
    }
  }

}
