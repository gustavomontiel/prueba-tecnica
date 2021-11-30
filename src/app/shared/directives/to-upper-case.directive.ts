import {
  Directive,
  ElementRef,
  forwardRef,
  HostListener,
  Renderer2,
  Self,
} from '@angular/core';
import { NgControl, NG_VALUE_ACCESSOR } from '@angular/forms';

@Directive({
  selector: '[appToUpperCase]',
})
export class ToUpperCaseDirective {


  constructor(
    private readonly control: NgControl
  ) { }

  @HostListener('input', ['$event.target'])
  public onInput(input: HTMLInputElement): void {
    const caretPos = input.selectionStart;
    this.control.control!.setValue(input.value.toUpperCase());
    input.setSelectionRange(caretPos, caretPos);
  }
 }
