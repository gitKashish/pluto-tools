import { AfterViewInit, Component, inject, OnInit, viewChild, HostListener } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { CommandPalette, CommandPaletteService, CommandItem } from '@app/core/command-palette';
import { Toolbar, ToolbarService } from "@app/core/toolbar";
// import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommandPalette, Toolbar, Toast],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements AfterViewInit {
  // dependencies
  router = inject(Router);
  cmdPaletteService = inject(CommandPaletteService);
  toolbarService = inject(ToolbarService);

  // component refs
  cmdPalette = viewChild.required(CommandPalette);
  toolbar = viewChild.required(Toolbar);

  commands = getCommands(this.router);
  
  ngAfterViewInit(): void {
    this.cmdPaletteService.registerCommandPalette(this.cmdPalette, this.commands);
    this.toolbarService.registerToolbar(this.toolbar);
  }

  // event listeners
  @HostListener('document:keydown', ['$event'])
  handleShortcut(event: KeyboardEvent) {
    if (event.ctrlKey && event.key.toLowerCase() == 'k') {
      event.preventDefault();
      this.cmdPaletteService.toggle();
    }
  }
}

const getCommands = (router: Router): CommandItem[] => {
  return [
    {
      id: 'home',
      title: 'Home',
      keywords: ['home', 'root'],
      handler: (): void => {
        router.navigate(['/']);
      }
    },
    {
      id: 'json-formatter',
      title: 'JSON Formatter',
      keywords: ['json', 'formatter', 'beautify', 'format'],
      handler: (): void => {
        router.navigate(['/json/formatter']);
      }
    },
    {
      id: 'json-diff',
      title: 'JSON Diff',
      keywords: ['json', 'diff', 'compare', 'difference'],
      handler: (): void => {
        router.navigate(['/json/diff']);
      }
    },
    {
      id: 'app-theme',
      title: 'Toggle Dark Mode',
      keywords: ['dark', 'light', 'theme', 'mode', 'color'],
      handler: (): void => {
        const element = document.querySelector('html');
        element?.classList.toggle('app-dark');
      }
    }
  ];
}