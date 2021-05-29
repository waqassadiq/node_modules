import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { ServersService } from '../servers.service';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit {
  server: {id: number, name: string, status: string};
  serverName = '';
  serverStatus = '';
  allowEdit = false;

  constructor(private serversService: ServersService, private route: ActivatedRoute) { }

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

    this.server = this.serversService.getServer(1);
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {name: this.serverName, status: this.serverStatus});
  }

}
