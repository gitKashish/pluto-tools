import { Injectable, Signal, signal } from '@angular/core';
import { Toolbar } from './toolbar';
import { CommandItem } from '../command-palette';

export interface ToolbarAction extends CommandItem {
  id: string;
  title: string;
  icon?: string;
  keywords: string[];
  handler: () => void;
}

export interface ToolbarState {
  toolName: string;
  actions: ToolbarAction[];
}

@Injectable({
  providedIn: 'root'
})
export class ToolbarService {
  private _toolbar!: Signal<Toolbar>;

  get defaultState(): ToolbarState {
    return {
      toolName: '',
      actions: [],
    };
  }

  registerToolbar(toolbar: Signal<Toolbar>) {
    this._toolbar = toolbar;
  }

  reset() {
    this.state = this.defaultState;
  }

  set state(state: ToolbarState) {
    this._toolbar().state = state;
  }

  get state() {
    return this._toolbar().state();
  }

  openCmdPalette(actions: ToolbarAction[]) {
    
  }
}