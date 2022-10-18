import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCategoryComponent } from './pages/add-category/add-category.component';
import { HomeComponent } from './pages/home/home.component';
import { ViewNotesComponent } from './pages/view-notes/view-notes.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,

  },
  {
    path: 'add-category',
    component: AddCategoryComponent
  },
  {
    path: 'view-notes/:noteId',
    component: ViewNotesComponent, pathMatch: 'full'
  }


];

@NgModule({
  imports: [ RouterModule.forRoot(routes, {
    useHash: true,
    enableTracing: false,
    anchorScrolling: "enabled",
    scrollPositionRestoration: 'enabled',
    relativeLinkResolution: 'legacy',
  }) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
