import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'nike-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonComponent {
  @Input() text: string;
  @Input() icon?: string;
  @Input() disabled =false;
  @Input() fullWidth = true;
  @Output() clicked: EventEmitter<any> = new EventEmitter<any>();
}
