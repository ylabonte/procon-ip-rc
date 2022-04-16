import { Component, Input, OnInit } from '@angular/core';
import { Electrode } from '../electrode';

@Component({
  selector: 'app-chlorine',
  templateUrl: './chlorine.component.html',
  styleUrls: ['./chlorine.component.scss']
})
export class ChlorineComponent implements OnInit {
  @Input() data: Electrode;
  @Input() optimumValue: number;
  @Input() scaleMin: number;
  @Input() scaleMax: number;
  @Input() scaleHeight: number;
  @Input() scaleRangeHeight: number;

  ngOnInit(): void {
    this.optimumValue = this.optimumValue ?? 780;
    this.scaleMin = this.scaleMin ?? 700;
    this.scaleMax = this.scaleMax ?? 900;
    this.scaleHeight = this.scaleHeight ?? 96;
    this.scaleRangeHeight = this.scaleRangeHeight ?? 192;
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
    return this.scaleRangeHeight / 2;
  }

  get scaleElementHeight(): string {
    return `${this.getScaleElementHeight()}px`;
  }

  get scaleShiftTopElementHeight(): string {
    return "0";
  }

  get scaleShiftBottomElementHeight(): string {
    return "0";
  }
}
