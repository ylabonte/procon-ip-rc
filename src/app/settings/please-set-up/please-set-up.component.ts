import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
  selector: 'app-please-set-up',
  templateUrl: './please-set-up.component.html',
  styleUrls: ['./please-set-up.component.scss']
})
export class PleaseSetUpComponent {
  constructor(
    public snackBarRef: MatSnackBarRef<PleaseSetUpComponent>,
    @Inject(MAT_SNACK_BAR_DATA) public data: any
  ) { }
}
