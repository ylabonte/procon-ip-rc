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
    const actualScaleValueRange = this.scaleMax - this.scaleMin;
    const value = this.data.dataObject.value as number;
    let relativeValue = 0;
    if (value > this.scaleMax)
      relativeValue = actualScaleValueRange;
    else if (value > this.scaleMin)
      relativeValue = value - this.scaleMin;
    return this.scaleHeight + 2 + (this.scaleRangeHeight * (relativeValue / actualScaleValueRange));
  }

  get scaleOffsetTop(): string {
    return `-${this.getScaleValueOffset()}px`;
  }

  getScaleElementHeight(): number {
    return this.scaleRangeHeight / 2;
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
