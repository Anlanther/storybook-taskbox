import { Actions } from '../models/actions.model';

export class ArchiveTask {
  static readonly type = Actions.ARCHIVE_TASK;

  constructor(public payload: string) {}
}

export class PinTask {
  static readonly type = Actions.PIN_TASK;

  constructor(public payload: string) {}
}

export class AppError {
  static readonly type = Actions.ERROR;
  constructor(public payload: boolean) {}
}
