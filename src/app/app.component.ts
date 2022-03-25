import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Task } from './tasks/task.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  name: string = "Alexander";
  showName: boolean = false;
  showActiveTasks: boolean = true;
  tasks: Array<Task> = [
    {
      id: 1,
      name: 'First task'
    }
  ];

  completeTasks: Array<Task> = [];

  /**
   * Добавляет задачу в массив
   */
  addTask(myForm: NgForm): void {

    const taskName = myForm.value.task;

    if (taskName.trim().length == 0) {
      return;
    }

    this.tasks.push(
      {
        id: this.getLastIndexNumber(),
        name: taskName
      }
    );

    myForm.reset();
  }

  /**
   * Обработчик события удаления задачи
   */
  onDelete(id: number): void {
    this.tasks = this.tasks.filter(task => task.id != id);
  }

  /**
   * Обработчик события выполнения задачи
   * @param id
   */
  onComplete(id: number): void {
    const findIndex = this.tasks.findIndex(task => task.id == id);

    this.completeTasks.push(this.tasks[findIndex]);

    this.tasks.splice(findIndex, 1);
  }

  /**
   * Возвращает новый индекс для добавляемого элемента
   * @returns
   */
  getLastIndexNumber(): number {
    if (this.tasks.length == 0) {
       return 1;
    }

    return this.tasks.reduce((previous, current) => current.id > previous.id ? current : previous).id + 1;
  }
}
