import { Directive, ElementRef, HostListener, inject } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
})
export class HighlightDirective {
  @HostListener('mouseenter') onMouseEnter() {
    this.highlight('#4c4e32');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.highlight('');
  }

  private element = inject(ElementRef);

  private highlight(color: string) {
    this.element.nativeElement.style.backgroundColor = color;
  }
}
