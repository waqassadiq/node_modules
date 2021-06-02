import { trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { ServersService } from '../servers.service';
import { CanComponentDeactivate } from './can-deactivate-guard';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit, CanComponentDeactivate {
  server: { id: number, name: string, status: string };
  serverName = '';
  serverStatus = '';
  allowEdit = false;
  changesSaved = false;

  constructor(private serversService: ServersService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {

    this.route.queryParams.subscribe(
      (queryParam: Params) => {
        this.allowEdit = queryParam['allowEdit'] === '1' ? true : false;
      }
    );

    //Way 1 - isn't reactive
    // the following approch is not reactive
    // it woulld only be called, when your component is created, once the values
    // change, it won't work
    console.log(this.route.snapshot.queryParams);
    console.log(this.route.snapshot.fragment);

    // way 2 - making queryParams as observables
    // we don't need to unsscribe it, 
    // angular automatically hanldles it
    this.route.queryParams.subscribe();
    this.route.fragment.subscribe();
    // adding + to convert it to number 
    const id = +this.route.snapshot.params['id'];
    // Subscribe the route params to update the id if the params change
    /** TODO: I have asked the question Following code doesn't work, look into it later
      */
    this.route.params.subscribe(
      (params: Params) => {
       this.server = this.serversService.getServer(+params['id']);
      }
    );
    
     
    this.server = this.serversService.getServer(id);
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, { name: this.serverName, status: this.serverStatus });
    this.changesSaved = true;
    this.router.navigate(['../', { relativeTo: this.route }]);
  }

  candeactivate(): boolean | Observable<boolean> | Promise<boolean> {
    console.log("in candeactivate()");
    if (!this.allowEdit) {
      return true;
    }

    if ((this.serverName !== this.server.name || this.serverStatus !== this.server.status)
      && !this.changesSaved) {
      return confirm("Do you want to discard the changes");
    } else {
      return true;
    }
  }
}
