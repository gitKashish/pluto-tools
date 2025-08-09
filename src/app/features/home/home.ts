import { Component, inject } from '@angular/core';
import { CommandPaletteService } from '@app/core/command-palette';

import { Button } from 'primeng/button';

@Component({
  selector: 'app-home',
  imports: [Button],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {
  // dependencies
  cmdPalette = inject(CommandPaletteService);
}
