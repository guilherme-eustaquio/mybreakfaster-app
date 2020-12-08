import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { MessageViewModel } from 'src/app/models/message-view.model';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

    private subject = new Subject<MessageViewModel>();

    sendMessageToAnotherComponent(exec: any, message: any) {
        this.subject.next(new MessageViewModel({exec, message}));
    }
    clearMessage() {
        this.subject.next();
    }
    listenMessageFromAnotherComponent(): Observable<MessageViewModel> {
        return this.subject.asObservable();
    }
}
