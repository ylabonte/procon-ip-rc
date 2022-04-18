import { Component, Input, OnInit } from '@angular/core';
import { Electrode } from '../electrode';

@Component({
  selector: 'app-ph',
  templateUrl: './ph.component.html',
  styleUrls: ['./ph.component.scss']
})
export class PhComponent implements OnInit {
  @Input() data: Electrode;
  @Input() scaleMin: number;
  @Input() scaleMax: number;
  @Input() scaleHeight: number;
  @Input() scaleWidth: number;
  @Input() scaleRadius: number;
  @Input() scaleRangeHeight: number;

  ngOnInit() {
    this.scaleMin = this.scaleMin ?? 6.4;
    this.scaleMax = this.scaleMax ?? 8.0;
    this.scaleHeight = this.scaleHeight ?? 48;
    this.scaleWidth = this.scaleWidth ?? 48;
    this.scaleRadius = this.scaleRadius ?? 24;
    this.scaleRangeHeight = this.scaleRangeHeight ?? 480;
  }

  getScaleValueOffset(): number {
    const value = this.data.dataObject.value as number;
    return (value / 14) * this.scaleRangeHeight - this.scaleHeight / 2;
  }

  get scaleOffsetTop(): string {
    return `-${this.getScaleValueOffset()}px`;
  }

  getScaleElementHeight(): number {
    return (this.scaleRangeHeight - this.getTopShiftElementHeight() - this.getBottomShiftElementHeight()) / 14;
  }

  get scaleElementHeight(): string {
    return `${this.getScaleElementHeight()}px`;
  }

  getTopShiftElementHeight(): number {
    return (this.scaleRangeHeight / 14) * this.scaleMin;
  }

  get topShiftElementHeight(): string {
    return `${this.getTopShiftElementHeight()}px`;
  }

  getBottomShiftElementHeight(): number {
    return (this.scaleRangeHeight / 14) * (14 - this.scaleMax);
  }

  get bottomShiftElementHeight(): string {
    return `${this.getBottomShiftElementHeight()}px`;
  }
}
