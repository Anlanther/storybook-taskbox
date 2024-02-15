import { CommonModule } from '@angular/common';
import type { Meta, StoryObj } from '@storybook/angular';
import {
  argsToTemplate,
  componentWrapperDecorator,
  moduleMetadata,
} from '@storybook/angular';
import TaskComponent from '../task/task.component';
import TaskListComponent from './task-list.component';

// Gets the args from the Default story of task story
import * as TaskStories from '../task/task.stories';

const meta: Meta<TaskListComponent> = {
  title: 'TaskList',
  // Automatically generates documentation for the component
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      declarations: [TaskListComponent, TaskComponent],
      imports: [CommonModule],
    }),
    componentWrapperDecorator(
      (story) => `<div style="margin: 3em">${story}</div>`
    ),
  ],
  render: (args: TaskListComponent) => ({
    props: {
      ...args,
      onPinTask: TaskStories.actionsData.onPinTask,
      onArchiveTask: TaskStories.actionsData.onArchiveTask,
    },
    template: `<app-task-list ${argsToTemplate(args)}></app-task-list>`,
  }),
};

export default meta;
type Story = StoryObj<TaskListComponent>;

// args are the inputs for the component
export const Default: Story = {
  args: {
    tasks: [
      { ...TaskStories.Default.args?.task, id: '1', title: 'Task 1' },
      { ...TaskStories.Default.args?.task, id: '2', title: 'Task 2' },
      { ...TaskStories.Default.args?.task, id: '3', title: 'Task 3' },
      { ...TaskStories.Default.args?.task, id: '4', title: 'Task 4' },
      { ...TaskStories.Default.args?.task, id: '5', title: 'Task 5' },
      { ...TaskStories.Default.args?.task, id: '6', title: 'Task 6' },
    ],
  },
};

export const WithPinnedTasks: Story = {
  args: {
    tasks: [
      ...(Default.args?.tasks?.slice(0, 5) || []),
      { id: '6', title: 'Task 6 (pinned)', state: 'TASK_PINNED' },
    ],
  },
};

export const Loading: Story = {
  args: {
    tasks: [],
    loading: true,
  },
};

export const Empty: Story = {
  args: {
    ...Loading.args,
    loading: false,
  },
};
