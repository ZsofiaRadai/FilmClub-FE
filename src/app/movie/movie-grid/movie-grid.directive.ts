import { Directive, ElementRef, Renderer2, HostListener, HostBinding, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appMovieGrid]'
})
export class MovieGridDirective implements OnInit {

  @Input() defaultBackground: string = "rgba(255, 12, 12, 0.25)";

  @HostBinding('style.background') backgroundColor: string;

  ngOnInit() {
    this.backgroundColor = this.defaultBackground;
  }

  @HostListener('mouseenter') mouseover() {
    this.backgroundColor = 'black';
  }

  @HostListener('mouseleave') mouseleave() {
    this.backgroundColor = this.defaultBackground;
  }

}
