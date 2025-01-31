import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule, ToastrService } from 'ngx-toastr';

import { TaskListComponent } from './task-list.component';
import { TaskService } from '../../services/task.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { GlobalService } from '../../services/global.service';

describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;
  let taskService: TaskService;
  let spinnerService: NgxSpinnerService;
  let globalService: GlobalService;
  let toastrService: ToastrService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaskListComponent],
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        NgxSpinnerModule,
        ToastrModule.forRoot(),
      ],
      providers: [
        TaskService,
        NgxSpinnerService,
        GlobalService,
        ToastrService,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskListComponent);
    component = fixture.componentInstance;
    taskService = TestBed.inject(TaskService);
    spinnerService = TestBed.inject(NgxSpinnerService);
    globalService = TestBed.inject(GlobalService);
    toastrService = TestBed.inject(ToastrService);

    fixture.detectChanges();
  });

  // Test 1: Check if the component is created
  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  // Test 2: Check if the form is initialized correctly
  it('should initialize the form with default values', () => {
    expect(component.taskForm).toBeDefined();
    expect(component.taskForm.controls['title'].value).toBeNull();
    expect(component.taskForm.controls['description'].value).toBeNull();
    expect(component.taskForm.controls['is_active'].value).toBe(true);
    expect(component.taskForm.controls['is_completed'].value).toBe(false);
  });

  // Test 3: Test the onSubmit method with a valid form
  it('should call createTodo and fetchData on valid form submission', () => {
    const createTodoSpy = spyOn(taskService, 'createTodo').and.returnValue(
      of({ message: 'Task created successfully' })
    );
    const fetchDataSpy = spyOn(component, '_fetchData');
    const spinnerShowSpy = spyOn(spinnerService, 'show');
    const spinnerHideSpy = spyOn(spinnerService, 'hide');
    const showSuccessSpy = spyOn(toastrService, 'success');

    // Set valid form values
    component.taskForm.setValue({
      title: 'Test Task',
      description: 'Test Description',
      is_active: true,
      is_completed: false,
    });

    component.onSubmit();

    // Assertions
    expect(createTodoSpy).toHaveBeenCalledWith({
      title: 'Test Task',
      description: 'Test Description',
      is_active: true,
      is_completed: false,
    });
    expect(fetchDataSpy).toHaveBeenCalled();
    expect(spinnerShowSpy).toHaveBeenCalled();
    expect(spinnerHideSpy).toHaveBeenCalled();
    expect(showSuccessSpy).toHaveBeenCalledWith('Task created successfully', '');
  });

  // Test 4: Test the onSubmit method with an error response
  it('should handle error on createTodo', () => {
    const createTodoSpy = spyOn(taskService, 'createTodo').and.returnValue(
      throwError({ error: { message: 'Error creating task' } })
    );
    const spinnerShowSpy = spyOn(spinnerService, 'show');
    const spinnerHideSpy = spyOn(spinnerService, 'hide');
    const showErrorSpy = spyOn(toastrService, 'error');

    // Set valid form values
    component.taskForm.setValue({
      title: 'Test Task',
      description: 'Test Description',
      is_active: true,
      is_completed: false,
    });

    component.onSubmit();

    // Assertions
    expect(createTodoSpy).toHaveBeenCalledWith({
      title: 'Test Task',
      description: 'Test Description',
      is_active: true,
      is_completed: false,
    });
    expect(spinnerShowSpy).toHaveBeenCalled();
    expect(spinnerHideSpy).toHaveBeenCalled();
    expect(showErrorSpy).toHaveBeenCalledWith('Error creating task','');
  });

  // Test 5: Test the _fetchData method
  it('should fetch todo data', () => {
    const mockData = [
      { id: 1, title: 'Task 1', description: 'Description 1', is_active: true, is_completed: false },
      { id: 2, title: 'Task 2', description: 'Description 2', is_active: true, is_completed: false },
    ];
    const getTodoListSpy = spyOn(taskService, 'getTodoList').and.returnValue(of({ data: mockData }));
    const spinnerShowSpy = spyOn(spinnerService, 'show');
    const spinnerHideSpy = spyOn(spinnerService, 'hide');

    // Trigger data fetch
    component._fetchData();

    // Assertions
    expect(getTodoListSpy).toHaveBeenCalledWith(5);
    expect(spinnerShowSpy).toHaveBeenCalled();
    expect(spinnerHideSpy).toHaveBeenCalled();
    expect(component.todoData).toEqual(mockData);
  });

  // Test 6: Test the _fetchData method with an error response
  it('should handle error on fetchData', () => {
    const getTodoListSpy = spyOn(taskService, 'getTodoList').and.returnValue(
      throwError({ error: { message: 'Error fetching data' } })
    );
    const spinnerShowSpy = spyOn(spinnerService, 'show');
    const spinnerHideSpy = spyOn(spinnerService, 'hide');
    const showErrorSpy = spyOn(toastrService, 'error');

    // Trigger data fetch
    component._fetchData();

    // Assertions
    expect(getTodoListSpy).toHaveBeenCalledWith(5);
    expect(spinnerShowSpy).toHaveBeenCalled();
    expect(spinnerHideSpy).toHaveBeenCalled();
    expect(showErrorSpy).toHaveBeenCalledWith('Error fetching data','');
  });

  // Test 7: Test the completeTask method
  it('should complete a task', () => {
    const completeTodoSpy = spyOn(taskService, 'completeTodo').and.returnValue(
      of({ message: 'Task completed successfully' })
    );
    const fetchDataSpy = spyOn(component, '_fetchData');
    const spinnerShowSpy = spyOn(spinnerService, 'show');
    const spinnerHideSpy = spyOn(spinnerService, 'hide');
    const showSuccessSpy = spyOn(toastrService, 'success');

    // Trigger task completion
    component.completeTask(1);

    // Assertions
    expect(completeTodoSpy).toHaveBeenCalledWith(1);
    expect(fetchDataSpy).toHaveBeenCalled();
    expect(spinnerShowSpy).toHaveBeenCalled();
    expect(spinnerHideSpy).toHaveBeenCalled();
    expect(showSuccessSpy).toHaveBeenCalledWith('Task completed successfully','');
  });

  // Test 8: Test the completeTask method with an error response
  it('should handle error on completeTask', () => {
    const completeTodoSpy = spyOn(taskService, 'completeTodo').and.returnValue(
      throwError({ error: { message: 'Error completing task' } })
    );
    const spinnerShowSpy = spyOn(spinnerService, 'show');
    const spinnerHideSpy = spyOn(spinnerService, 'hide');
    const showErrorSpy = spyOn(toastrService, 'error');

    // Trigger task completion
    component.completeTask(1);

    // Assertions
    expect(completeTodoSpy).toHaveBeenCalledWith(1);
    expect(spinnerShowSpy).toHaveBeenCalled();
    expect(spinnerHideSpy).toHaveBeenCalled();
    expect(showErrorSpy).toHaveBeenCalledWith('Error completing task','');
  });
});
