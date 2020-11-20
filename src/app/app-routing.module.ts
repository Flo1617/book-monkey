import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { CanNavigateToAdminGuard } from './can-navigate-to-admin.guard';

import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'books', loadChildren: () => import('./books/books.module').then(b => b.BooksModule)},
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(a => a.AdminModule), canActivate: [ CanNavigateToAdminGuard ]},
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
