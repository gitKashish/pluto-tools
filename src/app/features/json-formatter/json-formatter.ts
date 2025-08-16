import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

// UI components
import { Splitter } from 'primeng/splitter';
import { Toast } from 'primeng/toast';


import { MessageService } from 'primeng/api';
import { ToolbarService, ToolbarState } from '@app/core/toolbar';

@Component({
  selector: 'app-json-formatter',
  imports: [Splitter, FormsModule, Toast],
  templateUrl: './json-formatter.html',
  styleUrl: './json-formatter.scss',
})
export class JsonFormatter implements OnInit, OnDestroy {
  // dependencies
  toolbar = inject(ToolbarService);
  messageService = inject(MessageService);

  // actions
  toolbarState: ToolbarState = {
    toolName: 'JSON Formatter',
    commands: [
      {
        id: 'json-formatter-format',
        title: 'Format Raw JSON',
        keywords: ['format', 'run', 'pretty'],
        handler: () => {
          this.formatRawJson();
        }
      }
    ]
  }

  // states
  rawJsonString = signal('');
  jsonObject = signal<Object>({});
  formattedJson: string = '';

  formatRawJson() {
    try {
      this.messageService.clear('json-format-error');
      this.jsonObject = JSON.parse(this.rawJsonString());
      this.formattedJson = JSON.stringify(this.jsonObject, null, '  ');
    } catch (error: any) {
      console.error(error.message);
      this.messageService.add(
        {
          severity: 'error',
          summary: 'JSON Format Error',
          detail: error.message,
          sticky: true,
          key: 'json-format-error'
        }
      )
    }
  }

  ngOnInit(): void {
    this.toolbar.state = this.toolbarState;
  }

  ngOnDestroy(): void {
    this.toolbar.reset();
  }
}
