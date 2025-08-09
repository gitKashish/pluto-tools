import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandPalette } from './command-palette';

describe('CommandPaletteComponent', () => {
  let component: CommandPalette;
  let fixture: ComponentFixture<CommandPalette>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommandPalette]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommandPalette);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
