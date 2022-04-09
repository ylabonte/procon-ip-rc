import { AfterViewInit, Directive, ElementRef, EventEmitter, Input, Output } from '@angular/core';
import { fromEvent } from 'rxjs';

@Directive({
  selector: '[appFitHeight]'
})
export class FitHeightDirective implements AfterViewInit {
  @Input('appFitHeight') topOffset: number;
  @Input() minHeight: number;
  @Output() height: EventEmitter<DOMRect>;

  private _domElement: HTMLElement;

  constructor(private _elementRef: ElementRef) {
    this._domElement = _elementRef.nativeElement;
    this.height = new EventEmitter<DOMRect>(true);
    fromEvent(window, 'resize').subscribe(() => this.setHeight());
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
    this.height.emit(this._domElement.getBoundingClientRect());
  }
}
