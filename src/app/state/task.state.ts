import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { patch, updateItem } from '@ngxs/store/operators';
import { TaskStateModel } from '../models/task-state.model';
import { Task } from '../models/task.model';
import { AppError, ArchiveTask, PinTask } from './task.actions';

const defaultTasks: Task[] = [
  { id: '1', title: 'Something', state: 'TASK_INBOX' },
  { id: '2', title: 'Something more', state: 'TASK_INBOX' },
  { id: '3', title: 'Something else', state: 'TASK_INBOX' },
  { id: '4', title: 'Something again', state: 'TASK_INBOX' },
];

@State<TaskStateModel>({
  name: 'taskbox',
  defaults: {
    tasks: defaultTasks,
    status: 'idle',
    error: false,
  },
})
@Injectable()
export class TasksState {
  @Selector()
  static getError(state: TaskStateModel): boolean {
    return state.error;
  }

  @Selector()
  static getAllTasks(state: TaskStateModel): Task[] {
    return state.tasks;
  }

  @Action(PinTask)
  pinTask(
    { getState, setState }: StateContext<TaskStateModel>,
    { payload }: PinTask
  ) {
    const task = getState().tasks.find((task) => task.id === payload);

    if (task) {
      const updatedTask: Task = {
        ...task,
        state: 'TASK_PINNED',
      };
      setState(
        patch({
          tasks: updateItem<Task>(
            (pinnedTask) => pinnedTask?.id === payload,
            updatedTask
          ),
        })
      );
    }
  }
  @Action(ArchiveTask)
  archiveTask(
    { getState, setState }: StateContext<TaskStateModel>,
    { payload }: ArchiveTask
  ) {
    const task = getState().tasks.find((task) => task.id === payload);
    if (task) {
      const updatedTask: Task = {
        ...task,
        state: 'TASK_ARCHIVED',
      };
      setState(
        patch({
          tasks: updateItem<Task>(
            (archivedTask) => archivedTask?.id === payload,
            updatedTask
          ),
        })
      );
    }
  }

  @Action(AppError)
  setAppError(
    { patchState, getState }: StateContext<TaskStateModel>,
    { payload }: AppError
  ) {
    const state = getState();
    patchState({
      error: !state.error,
    });
  }
}
