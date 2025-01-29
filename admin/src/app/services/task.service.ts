import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class TaskService {


  private ApiUrl = 'http://127.0.0.1:8000/api/'

  constructor(
    private http : HttpClient
  ) { }

  getTodoList(count:any) {
    return this.http.get(this.ApiUrl + 'tasks/get_todo_list?list_count=' + count);
  }
  createTodo(data:any) {
    return this.http.post(this.ApiUrl + 'tasks/create_todo', data);
  }

  completeTodo(task_ref: any) {
    return this.http.get(this.ApiUrl + 'tasks/complete_todo?task_ref=' + task_ref);
  }
}
