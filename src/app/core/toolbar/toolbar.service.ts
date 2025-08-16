import { inject, Injectable, Signal, signal } from '@angular/core';
import { Toolbar } from './toolbar';
import { CommandItem, CommandPaletteService } from '../command-palette';

export interface ToolbarState {
  toolName: string;
  commands: CommandItem[];
}

@Injectable({
  providedIn: 'root'
})
export class ToolbarService {
  // dependencies
  private cmdPalette = inject(CommandPaletteService);
  private toolbar!: Signal<Toolbar>;

  get defaultState(): ToolbarState {
    return { toolName: '', commands: [] };
  }

  registerToolbar(toolbar: Signal<Toolbar>) {
    this.toolbar = toolbar;
  }

  // toolbar state management
  set state(state: ToolbarState) {
    this.toolbar().state = state;
  }

  get state(): ToolbarState {
    return this.toolbar().state();
  }

  reset() {
    this.state = this.defaultState;
  }

  // toolbar actions
  openCmdPalette() {
    this.cmdPalette.open(this.state.commands);
  }

  closeCmdPalette() {
    this.cmdPalette.close();
  }

  toggleCmdPalette() {
    this.cmdPalette.toggle(this.state.commands);
  }

}