import { Component, HostListener, signal, Signal } from '@angular/core';

import { Dialog } from 'primeng/dialog';
import { AutoComplete, AutoCompleteCompleteEvent } from 'primeng/autocomplete';
import { FormsModule } from '@angular/forms';

export interface CommandItem{
  id: string,
  title: string,
  keywords: string[],
  handler: () => void,
}

@Component({
  selector: 'app-command-palette',
  imports: [Dialog, AutoComplete, FormsModule],
  templateUrl: './command-palette.html',
  styleUrl: './command-palette.scss'
})
export class CommandPalette {
  // inputs
  private commands: CommandItem[] = [];

  // states
  protected filteredCommands: CommandItem[] = [];
  protected query = signal('');
  protected visible = signal(false);

  // setters and getters
  get isVisibile() {
    return this.visible();
  }

  close() {
    this.visible.set(false);
  }

  open(commands: CommandItem[]) {
    this.visible.set(true);
    this.commands = commands;
  }

  protected search(event: AutoCompleteCompleteEvent) {
    const query = event.query.toLowerCase();
    
    this.filteredCommands = this.commands.filter( (cmd) => {
      const titleInQuery = cmd.title.toLowerCase().includes(query);
      const keywordInQuery = cmd.keywords.some(k => k.toLowerCase().includes(query));
      return titleInQuery || keywordInQuery;
    })
  }

  protected executeCommand(cmd: CommandItem) {
    cmd.handler();
    this.close();
  }

  protected onDialogClose() {
    this.query.set('');
    this.filteredCommands = [];
  }
}
