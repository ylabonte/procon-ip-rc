import { Component, Input, OnInit } from '@angular/core';
import { Electrode } from '../electrode';

@Component({
  selector: 'app-chlorine',
  templateUrl: './chlorine.component.html',
  styleUrls: ['./chlorine.component.scss']
})
export class ChlorineComponent implements OnInit {
  @Input() data: Electrode;
  @Input() scaleMin: number;
  @Input() scaleMax: number;
  @Input() scaleHeight: number;
  @Input() scaleWidth: number;
  @Input() scaleRadius: number;
  @Input() scaleRangeHeight: number;

  ngOnInit(): void {
    this.scaleMin = this.scaleMin ?? 700;
    this.scaleMax = this.scaleMax ?? 950;
    this.scaleHeight = this.scaleHeight ?? 48;
    this.scaleWidth = this.scaleWidth ?? 48;
    this.scaleRadius = this.scaleRadius ?? 24;
    this.scaleRangeHeight = this.scaleRangeHeight ?? 128;
  }

  getScaleValueOffset(): number {
    const actualScaleRange = this.scaleMax - this.scaleMin;
    const value = this.data.dataObject.value as number;
    let relativeValue = value - this.scaleMin;
    if (relativeValue < 0)
      relativeValue = 0;
    return relativeValue * (this.scaleRangeHeight / actualScaleRange) + (this.scaleHeight / 2);
  }

  get scaleOffsetTop(): string {
    return `-${this.getScaleValueOffset()}px`;
  }

  getScaleElementHeight(): number {
    return (this.scaleRangeHeight - this.getShiftElementHeight() * 2) / 2;
  }

  get scaleElementHeight(): string {
    return `${this.getScaleElementHeight()}px`;
  }

  getShiftElementHeight(): number {
    return this.scaleHeight / 2;
  }

  get shiftElementHeight(): string {
    return `${this.getShiftElementHeight()}px`;
  }
}
