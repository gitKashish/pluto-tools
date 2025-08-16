import { Injectable, Signal, signal } from '@angular/core';
import { CommandItem, CommandPalette } from './command-palette';

@Injectable({
  providedIn: 'root'
})
export class CommandPaletteService {
  private cmdPalette!: Signal<CommandPalette>;
  private mainCommands: CommandItem[] = [];

  registerCommandPalette(cmdPalette: Signal<CommandPalette>, commands: CommandItem[]) {
    this.cmdPalette  = cmdPalette;
    this.mainCommands = commands;
  }

  open(commands?: CommandItem[]) {
    this.cmdPalette().open(commands ?? this.mainCommands);
  }

  close() {
    this.cmdPalette().close();
  }

  toggle(commands?: CommandItem[]) {
    if (this.cmdPalette().isVisibile) {
      this.cmdPalette().close();
    } else {
      this.cmdPalette().open(commands ?? this.mainCommands);
    }
  }
}
