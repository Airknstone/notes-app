import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCategoryComponent } from './pages/add-category/add-category.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'add-category',
    component: AddCategoryComponent
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, {
    useHash: true,
    enableTracing: false,
    scrollPositionRestoration: 'enabled',
    relativeLinkResolution: 'legacy',
  }) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
