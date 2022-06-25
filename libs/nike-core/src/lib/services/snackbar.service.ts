import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { MessageType } from '@nike-core';

@Injectable()
export class SnackbarService {
  constructor(
    private snackbar: MatSnackBar
  ) {
  }
  open(message: string, messageType: MessageType): void {
    this.snackbar.open(message, 'x', {
      duration: 3000,
      panelClass: messageType === MessageType.SUCCESS ?
        'snackbar-panel-class__success' : 'snackbar-panel-class__error',
      verticalPosition: 'bottom'
    });
  }
}
