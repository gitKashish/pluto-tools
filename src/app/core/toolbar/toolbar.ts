import { Component, computed, HostListener, inject, signal, Signal } from '@angular/core';
import { ToolbarService, ToolbarState } from './toolbar.service';
import { Button } from "primeng/button";
import { CommandPaletteService } from '../command-palette';
import { Toolbar as PrimeToolbar } from 'primeng/toolbar';

@Component({
  selector: 'app-toolbar',
  imports: [Button, PrimeToolbar],
  templateUrl: './toolbar.html',
  styleUrl: './toolbar.scss'
})
export class Toolbar {
  // dependencies
  private toolbarService = inject(ToolbarService);
  protected cmdPalette = inject(CommandPaletteService);

  // states
  private _state = signal(this.toolbarService.defaultState);
  protected toolName = computed( () => this._state().toolName );
  protected commands = computed( () => this._state().commands );

  get state(): Signal<ToolbarState> {
    return this._state.asReadonly();
  }

  set state(state: ToolbarState) {
    this._state.set(state);
  }

  @HostListener('document:keydown',['$event'])
  handleKeyDown(event: KeyboardEvent) {
    if (event.altKey && event.key.toLowerCase() == 'k') {
      this.toolbarService.toggleCmdPalette();
    }
  }
}
