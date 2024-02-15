import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../models/task.model';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
})
export default class TaskComponent {
  @Input() task?: Task;

  @Output()
  onPinTask = new EventEmitter<Event>();

  @Output()
  onArchiveTask = new EventEmitter<Event>();

  onPin(id: any) {
    this.onPinTask.emit(id);
  }

  onArchive(id: any) {
    this.onArchiveTask.emit(id);
  }
}
