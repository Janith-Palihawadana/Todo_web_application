import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TaskService} from "../../services/task.service";
import {NgxSpinnerService} from "ngx-spinner";
import {GlobalService} from "../../services/global.service";

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent {
  taskForm: FormGroup;
  todoData:any;
  count = 5;

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private spinner: NgxSpinnerService,
    private globalService: GlobalService
  ){
    this.taskForm = this.fb.group({
      title: [null ,[Validators.required]],
      description: [null ,[Validators.required]],
      is_active: [true,[Validators.required]],
      is_completed: [false ,[Validators.required]]
    });
  }

  ngOnInit(): void {
    this._fetchData();
  }
  onSubmit() {
    this.taskForm.patchValue({
      is_active: true,
      is_completed: false
    })
    this.spinner.show();
    this.taskService.createTodo(this.taskForm.value).subscribe({
      next:(response:any)=>{
        this.taskForm.reset();
        this._fetchData();
        this.spinner.hide();
        this.globalService.showSuccess(response.message);
      },error:(error : any) =>{
        console.log(error.error.message);
        this.spinner.hide();
        this.globalService.showError(error.error.message);
      }
    });
  }

  _fetchData() {
    this.spinner.show();
    this.taskService.getTodoList(this.count).subscribe({
      next:(response:any)=>{
        this.todoData = response.data;
        this.spinner.hide();
      },error:(error : any) =>{
        this.spinner.hide();
        this.globalService.showError(error.error.message);
      }
    });
  }

  completeTask(task_ref: any) {
    this.spinner.show();
    this.taskService.completeTodo(task_ref).subscribe({
      next:(response:any)=>{
        this._fetchData();
        this.spinner.hide();
        this.globalService.showSuccess(response.message);
      },error:(error : any) =>{
        this.spinner.hide();
        this.globalService.showError(error.error.message);
      }
    });
  }
}
