import { Directive, ElementRef, HostListener, inject, input } from '@angular/core';

/**
 * Highlight on mouseenter
 */
@Directive({
  selector: '[appHighlight]',
  standalone: true,
})
export class HighlightDirective {
  @HostListener('mouseenter') onMouseEnter() {
    this.highlight();
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.clearHighlight();
  }
  private element = inject(ElementRef);
  color = input();
  defaultColor = input('#4c4e32');

  private highlight() {
    console.log(this.color());
    this.element.nativeElement.style.backgroundColor = this.color() ?? this.defaultColor();
  }

  private clearHighlight() {
    this.element.nativeElement.style.backgroundColor = '';
  }
}
