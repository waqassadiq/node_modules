import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/aut-servive';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router, 
    private route: ActivatedRoute,
    private authService: AuthService
    ) { }

  ngOnInit() {
  }

  onLoadServers(){
    // complex calculations
    // it's an absolute path
    // routerlink know, in which route you are in
    // the navigate method doesn't know, where it sit
    // so we can tell it, where it's resides now
    // so we sing relatedto: path, we can guide it
    this.router.navigate(['/servers',{ralateTo: this.ngOnInit}]);
  }

  onLoadServer(id: number){
    this.router.navigate(['/servers', id, 'edit'], {queryParams: {allowEdit: '1'}, fragment: 'loading' });
  }

  onLogin(){
    this.authService.logIn();
  }

  onLogout(){
    this.authService.logout();
  }

}
