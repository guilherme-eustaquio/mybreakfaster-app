import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { JwtService } from 'src/app/services/auth/jwt.service';
import { BehaviorSubject } from 'rxjs';
import { MessageCode } from 'src/app/enum/message-code.enum';
import { MessageViewModel } from 'src/app/models/message-view.model';
import { MessageService } from 'src/app/services/generic/message.service';
import { SessionHandler } from 'src/app/miscellaneous/session-handler.class';

const openedMenuClass = "navbar-collapse offcanvas-collapse open";
const closedMenuClass = "navbar-collapse offcanvas-collapse";

@Component({
  selector: 'app-user-navigation',
  templateUrl: './user-navigation.component.html',
  styleUrls: ['./user-navigation.component.scss'],
})
export class UserNavigationComponent implements OnInit {

  private menuClass = closedMenuClass;

  constructor(private router: Router, 
    private location: Location,
    private jwtService: JwtService,
    private cdRef: ChangeDetectorRef, 
    private messageService : MessageService,) {}

  ngOnInit() {
    this.initializeMenu();
  }

  public userType$ = new BehaviorSubject<boolean>(false);

  public initializeMenu() : void {
    this.messageService.listenMessageFromAnotherComponent().subscribe((data : MessageViewModel) => {
      if(data != null) {
        switch(data.exec) {
          case MessageCode.SET_MENU_TYPE_USER:
            this.userType$.next(this.getUserType());
            this.cdRef.detectChanges();
            break;
        }
      }
    });
  }


  private getUserType() : boolean {
    return SessionHandler.getUserDetails().type != 'CLIENT';
  }

  public getCurrentClass() : string {    

    if(this.getCurrentRoute('user-menu')) {
      this.menuClass = openedMenuClass;
    } else {
      this.menuClass = closedMenuClass;
    }

    return this.menuClass;
  }

  public toggleMenu() : void {
    if(this.menuClass == closedMenuClass) {
      this.router.navigateByUrl('/dashboard/user-menu');
      this.menuClass = openedMenuClass;
    } else {
      this.location.back();
    }
  }

  private getCurrentRoute(url : string) : boolean {
    return this.router.url.includes(url);
  }

  public logout() : void {
    this.jwtService.logout();
    this.router.navigateByUrl('/auth/login');
  }

}
