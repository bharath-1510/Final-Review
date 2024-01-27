import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewQuestionComponent } from './view-question/view-question.component';
import { ViewCandidateComponent } from './view-candidate/view-candidate.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { CreateQuestionComponent } from './create-question/create-question.component';
import { AssignQuestionComponent } from './assign-question/assign-question.component';

const routes: Routes = [
  {
    path: 'view-question',
    component: ViewQuestionComponent,
  },
  {
    path: 'view-candidate',
    component: ViewCandidateComponent,
  },
  { path: 'create-question', component: CreateQuestionComponent },
  { path: 'assign-question', component: AssignQuestionComponent },
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
