import { Component, inject, OnInit, viewChild } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { CommandPalette, CommandPaletteService, CommandItem } from './core/command-palette';

const getCommands = (router: Router): CommandItem[] => {
  return [
    {
      id: 'home',
      title: 'home',
      keywords: ['home', 'root'],
      action: (): void => {
        router.navigate(['/']);
      }
    },
    {
      id: 'json-formatter',
      title: 'json formatter',
      keywords: ['json', 'formatter', 'beautify', 'format'],
      action: (): void => {
        router.navigate(['/json/formatter']);
      }
    },
    {
      id: 'json-diff',
      title: 'json diff',
      keywords: ['json', 'diff', 'compare', 'difference'],
      action: (): void => {
        router.navigate(['/json/diff']);
      }
    },
    {
      id: 'app-theme',
      title: 'toggle dark mode',
      keywords: ['dark', 'light', 'theme', 'mode', 'color'],
      action: (): void => {
        const element = document.querySelector('html');
        element?.classList.toggle('app-dark');
      }
    }
  ];
}

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommandPalette],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  // dependencies
  router = inject(Router);
  cmdPaletteService = inject(CommandPaletteService)

  // component refs
  cmdPalette = viewChild.required(CommandPalette);
  commands = getCommands(this.router);
  
  ngOnInit(): void {
    this.cmdPaletteService.registerCommandPalette(this.cmdPalette, this.commands);
  }
}