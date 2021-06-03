import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.css']
})
export class ErrorPageComponent implements OnInit {

  errorMessage: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
   //option 1, if  
   // this.errorMessage = this.route.snapshot.data['message'];

   // option 2. it's better, as it could handle changes as well
    this.route.data.subscribe(
      (data: Data) => {
        this.errorMessage = data['message']; 
      }
    );
  }

}
