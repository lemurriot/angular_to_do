import { Component } from '@angular/core';
//annotation
@Component({
  selector: 'app-root',
  template: `
      <div class="container">
        <h1>To Do List for {{month}}/{{day}}/{{year}}</h1>
        <h3>{{currentFocus}}</h3>
        <ul>
          <li [class]="priorityColor(currentTask)" (click)="isDone(currentTask)" *ngFor="let currentTask of tasks">{{currentTask.description}} <button (click)="editTask(currentTask)">Edit!</button></li>
        </ul>
        <hr>
        <div *ngIf="selectedTask">
          <h3>{{selectedTask.description}}</h3>
          <p>Task Complete? {{selectedTask.done}}</p>
          <h3>Edit Task</h3>
          <label>Enter Task Description:</label>
          <input [(ngModel)]="selectedTask.description">
          <label>Enter Task Priority (1-3):</label>
          <br>
          <input type="radio" [(ngModel)]="selectedTask.priority" [value]="1">1 (Low Priority)<br>
          <input type="radio" [(ngModel)]="selectedTask.priority" [value]="2">2 (Medium Priority)<br>
          <input type="radio" [(ngModel)]="selectedTask.priority" [value]="3">3 (High Priority)
          <button (click)="finishedEditing()">Done</button>
       </div>
     </div>
  `
})
//class declaration
export class AppComponent {
  currentFocus: string = 'Angular Homework';
  currentTime = new Date();
  month: number = this.currentTime.getMonth() + 1;
  day: number = this.currentTime.getDate();
  year: number = this.currentTime.getFullYear();
  //'this' is necessary b/c In Angular, when a variable in a component's class declaration references another variable in the class, it must be prefaced with the this keyword.
  tasks: Task[] = [
    new Task('Finish weekend Angular homework for Epicodus course', 3),
    new Task('Begin brainstorming possible JavaScript group projects', 2),
    new Task('Add README file to last few Angular repos on GitHub', 2)   ];
  selectedTask = null;

  editTask(clickedTask) {
    this.selectedTask = clickedTask;
  }

  isDone(clickedTask: Task) {
    if(clickedTask.done === true) {
      alert("This task is DONE.");
    } else {
      alert("This ain't done - GET TO WORK.")
    }
  }

  priorityColor(currentTask){
    if (currentTask.priority === 3){
      return "bg-danger";
    } else if (currentTask.priority === 2) {
      return  "bg-warning";
    } else {
      return "bg-info";
    }
  }

  finishedEditing() {
    this.selectedTask = null;
  }
}
//below is our Task model
export class Task {

  public done: boolean = false;
  constructor(public description: string, public priority: number) { }
}
//because we've exported Task class, Task is now a valid data type for variables.
