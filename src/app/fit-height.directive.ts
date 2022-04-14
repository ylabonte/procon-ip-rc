import { AfterViewInit, Directive, ElementRef, EventEmitter, Input, Output } from '@angular/core';
import { fromEvent } from 'rxjs';

@Directive({
  selector: '[appFitHeight]'
})
export class FitHeightDirective implements AfterViewInit {
  @Output('appFitHeight') heightChange: EventEmitter<DOMRect>;
  @Input() minHeight: number;
  @Input() topOffset: number;

  private _domElement: HTMLElement;

  constructor(
    private _elementRef: ElementRef,
  ) {
    this._domElement = _elementRef.nativeElement;
    this.heightChange = new EventEmitter<DOMRect>(true);
    fromEvent(window, 'resize').subscribe(() => this.setHeight());
    fromEvent(document, 'orientationchange').subscribe(() => this.setHeight());
  }

  ngAfterViewInit() {
    this.setHeight();
  }

  private getTopOffset(): number {
    if (this.topOffset)
      return this.topOffset;

    try {
      const rect = this._domElement.getBoundingClientRect();
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;

      return rect.top + scrollTop;
    } catch (e) {
      return 0;
    }
  }

  private setHeight() {
    let height = window.innerHeight - this.getTopOffset();
    if (this.minHeight && this.minHeight > height)
      height = this.minHeight;
    this._domElement.style.height = `${height}px`;
    this.heightChange.emit(this._domElement.getBoundingClientRect());
  }
}
