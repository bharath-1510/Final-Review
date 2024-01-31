import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  display = [
    {
      icon: 'library_add',
      content: 'Create Question',
      navigate: '/create-question',
    },
    {
      icon: 'view_list',
      content: 'View Question',
      navigate: '/view-question',
    },
    {
      icon: 'assignment',
      content: 'Assign Questions To Candidate',
      navigate: '/assign-question',
    },
    {
      icon: 'view_list',
      content: 'View Candidate',
      navigate: '/view-candidate',
    },
  ];
}
