import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommandPaletteService } from '@app/core/command-palette';
import { ToolbarService, ToolbarState } from '@app/core/toolbar';

import { Button } from 'primeng/button';

@Component({
  selector: 'app-home',
  imports: [Button],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home implements OnInit, OnDestroy {
  // dependencies
  cmdPalette = inject(CommandPaletteService);
  toolbar = inject(ToolbarService);

  toolbarState: ToolbarState = {
      toolName: 'Home',
      actions: [
        {
          id: 'home-help',
          icon: 'pi pi-lightbulb',
          title: 'Help',
          keywords: ['shortcut', 'help', 'commands'],
          handler() {
            console.log('Showing shortcut');
          },
        }
      ]
    }

    ngOnInit(): void {
      this.toolbar.state = this.toolbarState; 
    }

    ngOnDestroy(): void {
      this.toolbar.reset();
    }
}
