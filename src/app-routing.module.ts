import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ErrorPageComponent } from "./app/error-page/error-page/error-page.component";

import { HomeComponent } from "./app/home/home.component";
import { PageNotFoundComponent } from "./app/page-not-found/page-not-found.component";
import { CanDeactivateGuard } from "./app/servers/edit-server/can-deactivate-guard";
import { EditServerComponent } from "./app/servers/edit-server/edit-server.component";
import { ServerResolver } from "./app/servers/server/server-resolver.service";
import { ServerComponent } from "./app/servers/server/server.component";
import { ServersComponent } from "./app/servers/servers.component";
import { UserComponent } from "./app/users/user/user.component";
import { UsersComponent } from "./app/users/users.component";
import { AuthService } from "./aut-servive";
import { AuthGuard } from "./auth-guard-service";

const appRoutes: Routes = [
    { path: '', component: HomeComponent},
    { path: 'users', component: UsersComponent, children: [
      { path: ':id/:name', component: UserComponent}
    ]},
    { path: 'servers', 
    //canActivate: [AuthGuard], // to protect parent route and it's child
    canActivateChild: [AuthGuard], // to protect child routers only
    component: ServersComponent, children: [
      { path: ':id', component: ServerComponent, resolve: {server: ServerResolver}},
      { path: ':id/edit', component: EditServerComponent, canDeactivate: [CanDeactivateGuard] }
    ]
    },
    //{ path: 'not-found', component: PageNotFoundComponent},
    { path: 'not-found', component: ErrorPageComponent, data: {message: 'Page not found!'}},
    //* ** or wildcard rout shoulld be the last route as routers are look-ed into from top to bottom, if you add it on top, all requests would be redited to it. */
    { path: '**', redirectTo: '/not-found'}
  
  ];

 @NgModule({
     imports: [
        // use this strategy to assit the hosting server on prod, to take care the part before the 
        //RouterModule.forRoot(appRoutes, {useHash: true})
        RouterModule.forRoot(appRoutes)
     ],
     exports: [RouterModule]
 }) 
export class AppRoutingModule{ 



}