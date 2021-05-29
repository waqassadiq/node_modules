import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { ServersService } from '../servers.service';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {
  server: {id: number, name: string, status: string};

  constructor(private serversService: ServersService,
    private router: Router,
    private route: ActivatedRoute) { 
    }


  ngOnInit() {
    // to treat the id as a numbere, we added + before it
    const id = +this.route.snapshot.params['id'];
    console.log("serverId: " + id);

    this.server = this.serversService.getServer(id);
    this.route.params.subscribe(
      (params: Params) => {
        this.server = this.serversService.getServer(+params['id']);
      }
    );
  }

  onReloadPage(){
    console.log("onReloadPage()...");
    this.router.navigate(['servers',{relateTo: this.route}]);
  }

  onEdit(){
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

}
