import { ChangeDetectorRef } from '@angular/core';
import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { MessageCode } from 'src/app/enum/message-code.enum';
import { SessionHandler } from 'src/app/miscellaneous/session-handler.class';
import { MessageViewModel } from 'src/app/models/message-view.model';
import { MessageService } from 'src/app/services/generic/message.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {


  constructor(private cdRef:ChangeDetectorRef, 
    private messageService : MessageService,
    private router : Router) {}

  public userType$ = new BehaviorSubject<boolean>(false);

  public initializeMenu() : void {
    this.messageService.listenMessageFromAnotherComponent().subscribe((data : MessageViewModel) => {
      
      if(data != null) {
        switch(data.exec) {
          case MessageCode.SET_MENU_TYPE_NAVIGATION:
            this.userType$.next(this.getUserType());
            this.cdRef.detectChanges();
            
            if(data.message) {
              this.defineMainRoute();
            }
            
            break;
        }
      }
    });
  }

  ngOnInit() {
    this.initializeMenu();
  }

  private getUserType() : boolean {
    return SessionHandler.getUserDetails().type != 'CLIENT';
  }

  private defineMainRoute() : void {

    if(this.getUserType()) { // establishment 
      this.router.navigateByUrl('dashboard');
    } else {
      this.router.navigateByUrl('dashboard/establishment');
    }

  }

}
