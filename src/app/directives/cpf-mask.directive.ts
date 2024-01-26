import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appCpfMask]'
})
export class CpfMaskDirective {
  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event']) onInput(event: any) {
    const value = event.target.value.replace(/\D/g, '');
    if (value.length <= 11) {
      event.target.value = this.formatCpf(value);
    } else {
      event.target.value = value.slice(0, 11);
    }
  }

  private formatCpf(value: string): string {
    if (value.length <= 3) {
      return value;
    } else if (value.length <= 6) {
      return `${value.slice(0, 3)}.${value.slice(3)}`;
    } else if (value.length <= 9) {
      return `${value.slice(0, 3)}.${value.slice(3, 6)}.${value.slice(6)}`;
    } else {
      return `${value.slice(0, 3)}.${value.slice(3, 6)}.${value.slice(6, 9)}-${value.slice(9)}`;
    }
  }
}
