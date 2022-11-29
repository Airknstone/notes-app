import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ViewNotesComponent } from './pages/view-notes/view-notes.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,

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
    relativeLinkResolution: 'legacy', scrollOffset: [ 0, 0 ],
  }) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
