import { AfterViewInit, Component, DoCheck, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageCode } from '../enum/message-code.enum';
import { SessionHandler } from '../miscellaneous/session-handler.class';
import { JwtService } from '../services/auth/jwt.service';
import { UserService } from '../services/bussiness/user.service';
import { MessageService } from '../services/generic/message.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, DoCheck, AfterViewInit {

  constructor(private router: Router, 
    private jwtService : JwtService, 
    private userService : UserService,
    private messageService : MessageService) { }


  ngDoCheck() {
    if(!SessionHandler.getUserDetails()) {
      this.userService.getUserDetails().subscribe({
        next: (data) => {
          SessionHandler.setUserDetails(data);
          this.messageService.sendMessageToAnotherComponent(MessageCode.SET_MENU_TYPE_NAVIGATION, {});
          this.messageService.sendMessageToAnotherComponent(MessageCode.SET_MENU_TYPE_USER, {});
        }
      })
    }
  }

  ngOnInit() {
    if(!this.jwtService.loggedIn) {
      this.router.navigateByUrl('/auth/login');
      return;
    }


  }

  ngAfterViewInit(): void {
    if(SessionHandler.getUserDetails()) {
      this.messageService.sendMessageToAnotherComponent(MessageCode.SET_MENU_TYPE_NAVIGATION, false);
      this.messageService.sendMessageToAnotherComponent(MessageCode.SET_MENU_TYPE_USER, {});    
    }  
  }

  public getCurrentRoute(url : string) : boolean {
    return this.router.url.includes(url);
  }

}
