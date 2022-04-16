import { Component, Input, OnInit } from '@angular/core';
import { Electrode } from '../electrode';

@Component({
  selector: 'app-ph',
  templateUrl: './ph.component.html',
  styleUrls: ['./ph.component.scss']
})
export class PhComponent implements OnInit {
  @Input() data: Electrode;
  @Input() optimumValue: number;
  @Input() scaleMin: number;
  @Input() scaleMax: number;
  @Input() scaleHeight: number;
  @Input() scaleRangeHeight: number;

  ngOnInit() {
    this.optimumValue = this.optimumValue ?? 7.2;
    this.scaleMin = this.scaleMin ?? 6;
    this.scaleMax = this.scaleMax ?? 8.4;
    this.scaleHeight = this.scaleHeight ?? 96;
    this.scaleRangeHeight = this.scaleRangeHeight ?? 192;
  }

  getScaleValueOffset(): number {
    const value = this.data.dataObject.value as number;
    return (value / 14) * this.scaleRangeHeight - this.scaleHeight / 2;
  }

  get scaleOffsetTop(): string {
    return `-${this.getScaleValueOffset()}px`;
  }

  getScaleElementHeight(): number {
    return (this.scaleRangeHeight - this.getScaleShiftElementHeight() * 2) / 14;
  }

  get scaleElementHeight(): string {
    return `${this.getScaleElementHeight()}px`;
  }

  getScaleShiftElementHeight(): number {
    return 48;
  }

  get scaleShiftElementHeight(): string {
    return `${this.getScaleShiftElementHeight()}px`;
  }
}
