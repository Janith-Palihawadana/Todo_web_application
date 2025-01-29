import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TaskListComponent} from "./components/task-list/task-list.component";

const routes: Routes = [
  {path: '', redirectTo: 'todo-list', pathMatch: 'full'},
  {path : 'todo-list', component: TaskListComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
