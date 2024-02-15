import { CommonModule } from '@angular/common';
import { importProvidersFrom } from '@angular/core';
import { NgxsModule, Store } from '@ngxs/store';
import type { Meta, StoryObj } from '@storybook/angular';
import { applicationConfig, moduleMetadata } from '@storybook/angular';
import { fireEvent, within } from '@storybook/testing-library';
import { TasksState } from 'src/app/state/task.state';
import { TaskModule } from '../task.module';
import PureInboxScreenComponent from './pure-inbox-screen.component';

const meta: Meta<PureInboxScreenComponent> = {
  component: PureInboxScreenComponent,
  title: 'PureInboxScreen',
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [CommonModule, TaskModule],
    }),
    // Allows to component to pull from store, as its child component has an async call
    applicationConfig({
      providers: [Store, importProvidersFrom(NgxsModule.forRoot([TasksState]))],
    }),
  ],
};

export default meta;
type Story = StoryObj<PureInboxScreenComponent>;

export const Default: Story = {};

export const Error: Story = {
  args: {
    error: true,
  },
};

export const WithInteractions: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    fireEvent.click(canvas.getByLabelText('pinTask-1'));
    fireEvent.click(canvas.getByLabelText('pinTask-3'));
  },
};
