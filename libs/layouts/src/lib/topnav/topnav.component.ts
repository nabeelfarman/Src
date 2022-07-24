import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedServicesAuthModule } from '@society/shared/services/auth';
import { SharedServicesGlobalDataModule } from '@society/shared/services/global-data';
import {
  ApplicationModuleInterface,
  UserInterface,
} from '@society/shared/interface';
import { SharedServicesDataModule } from '@society/shared/services/data';
import { SidenavComponent } from '../sidenav/sidenav.component';
import { environment } from 'apps/society/src/environments/environment';

@Component({
  selector: 'society-topnav',
  templateUrl: './topnav.component.html',
  styleUrls: ['./topnav.component.scss'],
})
export class TopnavComponent implements OnInit {
  @Output() public drawerToggle = new EventEmitter();

  applicationModulesList: ApplicationModuleInterface[] = [];

  // menuList: ApplicationModuleInterface[] = [];

  menu_btn = 'menu';
  title = '';
  userName = '';
  roleId = 0;
  currentUser!: UserInterface;
  logoUrl: any = '';

  constructor(
    private globalService: SharedServicesGlobalDataModule,
    private router: Router,
    private authService: SharedServicesAuthModule,
    private dataService: SharedServicesDataModule,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.globalService.header_title$.subscribe((str: string) => {
      this.title = str;
    });
    
    this.getCompany();
    this.currentUser = this.authService.currentUserValue;
    this.userName = 'Hi, ' + this.currentUser.fullName;
    this.roleId = this.currentUser.roleId;

    this.getModuleData();
  }

  getCompany(){
    this.dataService.getHttp('company-api/Company/getCompany', '').subscribe(
      (response: any) => {
        if (response.length > 0) {
          this.logoUrl = environment.imageSavedPath +'company/' + 
                            response[0].companyShortName + '.png';
        }
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  getModuleData() {
    this.dataService
      .getHttp(
        'user-api/ApplicationModule/getUserModules?roleId=' +
          this.roleId +
          '&userId=' +
          this.globalService.getUserId(),
        ''
      )
      .subscribe((response: ApplicationModuleInterface[]) => {
        this.applicationModulesList = response;

        // this.router.navigate(['home']);
        if (!localStorage.getItem('moduleId')) {
          this.globalService.setMenuItems(response[0].applicationModuleId);

          localStorage.setItem('moduleId', response[0].applicationModuleId);
        }
      });
  }

  public onToggleDrawer = () => {
    this.drawerToggle.emit();

    if (this.menu_btn == 'menu') {
      this.menu_btn = 'menu_open';
    } else if (this.menu_btn == 'menu_open') {
      this.menu_btn = 'menu';
    }
  };

  setSidebarMenu(selectedModule: any) {
    localStorage.setItem('moduleId', selectedModule.applicationModuleId);

    this.globalService.setMenuItems(selectedModule.applicationModuleId);
    this.router.navigate(['home']);
  }

  async logout() {
    await this.authService.logout();
    this.router.navigate(['auth/login']);
  }
}
