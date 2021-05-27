import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {
  user: {id: number, name: string};
  parameterSubscription: Subscription;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.user = {
      id: this.route.snapshot.params['id'],
      name: this.route.snapshot.params['name']
    };
    // its observeable are features by 3rd patry
    // allows you to work wit async tasks.
    // this would only run when param is changed
    // Note: eveen though you page is destoryed but the subsction
    // stauys in the mentory so use OnDestory, to destory it
    this.parameterSubscription = this.route.params
      .subscribe(
        (params: Params) => {
          this.user.id = params['id'],
          this.user.name = params['name']
        }
      );
  }

  ngOnDestroy(){
    // now this would be destoryed with the component
    // it's optional, now here, but it's good to write it down
    this.parameterSubscription.unsubscribe();
  }

}
