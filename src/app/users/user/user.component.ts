import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user: {id: number, name: string};

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.user = {
      id: this.route.snapshot.params['id'],
      name: this.route.snapshot.params['name']
    };
    // its observeable are features by 3rd patry
    // allows you to work wit async tasks.
    // this would only run when param is changed
    this.route.params
      .subscribe(
        (params: Params) => {
          this.user.id = params['id'],
          this.user.name = params['name']
        }
      );
  }

}
