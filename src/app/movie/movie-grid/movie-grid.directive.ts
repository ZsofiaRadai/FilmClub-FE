import { Directive, HostListener, HostBinding, Input, OnInit } from '@angular/core';

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
    $('[data-toggle="tooltip"]').tooltip({
      animated: 'fade',
      placement: 'top',
      html: true
    });
  }

  @HostListener('mouseleave') mouseleave() {
    this.backgroundColor = this.defaultBackground;
  }

}
