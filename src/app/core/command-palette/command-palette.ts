import { Component, HostListener, signal, input, computed } from '@angular/core';

import { Dialog } from 'primeng/dialog';
import { AutoComplete, AutoCompleteCompleteEvent } from 'primeng/autocomplete';
import { FormsModule } from '@angular/forms';

export interface CommandItem {
  id: string,
  title: string,
  keywords: string[],
  action: () => void,
}

@Component({
  selector: 'app-command-palette',
  imports: [Dialog, AutoComplete, FormsModule],
  templateUrl: './command-palette.html',
  styleUrl: './command-palette.scss'
})
export class CommandPalette {
  // inputs
  private commands = signal<CommandItem[]>([]);

  // states
  filteredCommands: CommandItem[] = [];
  query = signal('');
  visible = signal(false);

  // command palette actions
  registerCommands(commands: CommandItem[]) {
    this.commands.set(commands);
  }

  close() {
    this.visible.set(false);
  }

  open() {
    this.visible.set(true);
  }

  toggle() {
    this.visible.update( visible => !visible );
  }

  search(event: AutoCompleteCompleteEvent) {
    const query = event.query.toLowerCase();
    
    this.filteredCommands = this.commands().filter( (cmd) => {
      const titleInQuery = cmd.title.toLowerCase().includes(query);
      const keywordInQuery = cmd.keywords.some(k => k.toLowerCase().includes(query));
      return titleInQuery || keywordInQuery;
    })
  }

  executeCommand(cmd: CommandItem) {
    cmd.action();
    this.query.set('');
    this.close();
  }

  // event listeners
  @HostListener('document:keydown', ['$event'])
  handleShortcut(event: KeyboardEvent) {
    if (event.ctrlKey && event.key.toLowerCase() == 'k') {
      event.preventDefault();
      this.toggle();
    }
  }
}
