import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Textarea } from 'primeng/textarea';
import { IftaLabel } from 'primeng/iftalabel'
import { Button } from "primeng/button";
import { ToolbarService, ToolbarState } from '@app/core/toolbar';

@Component({
  selector: 'app-json-formatter',
  imports: [Textarea, FormsModule, IftaLabel],
  templateUrl: './json-formatter.html',
  styleUrl: './json-formatter.scss'
})
export class JsonFormatter implements OnInit, OnDestroy {
  toolbar = inject(ToolbarService);

  // actions
  toolbarState: ToolbarState = {
    toolName: 'JSON Formatter',
    commands: [
      {
        id: 'json-formatter-format',
        title: 'Format Raw JSON',
        keywords: ['format', 'run', 'pretty'],
        handler() {
          console.log('Formatting JSON');
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
