import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/angular';
import { argsToTemplate } from '@storybook/angular';
import TaskComponent from './task.component';

// Component outputs. They will be logged under the actions tab in storybook
export const actionsData = {
  onPinTask: action('onPinTask'),
  onArchiveTask: action('onArchiveTask'),
};

const meta: Meta<TaskComponent> = {
  title: 'Task',
  component: TaskComponent,
  // Exclude output actions above
  excludeStories: /.*Data$/,
  tags: ['autodocs'],
  render: (args: TaskComponent) => ({
    props: {
      ...args,
      onPinTask: actionsData.onPinTask,
      onArchiveTask: actionsData.onArchiveTask,
    },
    template: `<app-task ${argsToTemplate(args)}></app-task>`,
  }),
};

export default meta;
type Story = StoryObj<TaskComponent>;

// args are the inputs for the component
export const Default: Story = {
  args: {
    task: {
      id: '1',
      title: 'Test Task',
      state: 'TASK_INBOX',
    },
  },
};

export const Pinned: Story = {
  args: {
    task: {
      ...Default.args?.task,
      state: 'TASK_PINNED',
    },
  },
};

export const Archived: Story = {
  args: {
    task: {
      ...Default.args?.task,
      state: 'TASK_ARCHIVED',
    },
  },
};
