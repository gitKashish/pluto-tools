import { Injectable, Signal } from '@angular/core';
import { CommandItem, CommandPalette } from './command-palette';

@Injectable({
  providedIn: 'root'
})
export class CommandPaletteService {
  private cmdPalette!: Signal<CommandPalette>;

  registerCommandPalette(cmdPalette: Signal<CommandPalette>, commands: CommandItem[]) {
    this.cmdPalette  = cmdPalette;
    this.cmdPalette().registerCommands(commands);
  }

  open() {
    console.info('opening cmd palette');
    this.cmdPalette().open();
    console.info(`cmd palette visibility ${this.cmdPalette().visible()} from ${!this.cmdPalette().visible()}`);
  }

  close() {
    console.info('closing cmd palette');
    this.cmdPalette().close();
    console.info(`cmd palette visibility ${this.cmdPalette().visible()} from ${!this.cmdPalette().visible()}`);
  }

  toggle() {
    console.info('toggling cmd palette')
    this.cmdPalette().toggle();
    console.info(`cmd palette visibility ${this.cmdPalette().visible()} from ${!this.cmdPalette().visible()}`);
  }

}
