import { Message } from '../models/message';
import {MessageService} from '../services/message.service';
import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-new-message',
  templateUrl: './new-message.component.html',
  styleUrls: ['./new-message.component.css']
})
export class NewMessageComponent implements OnInit {

  messageForm: FormGroup;
  error: string;
  constructor(private formBuilder: FormBuilder,
              private messageService: MessageService,
              private router: Router) {}

  ngOnInit() {
    this.initForm();
    this.error = '';
  }

  initForm() {
    this.messageForm = this.formBuilder.group({
      title: ['', Validators.required],
      content: ['', Validators.required]
    });
  }

  onSaveMessage() {
    const title = this.messageForm.get('title').value;
    const content = this.messageForm.get('content').value;
    const message = new Message(title, content, new Date(), new Date());
    this.messageService.createMessage(message)
                    .subscribe(
                      () => this.router.navigate(['messages']),
                      (err) => { this.error = err; }
                    );
  }

}
