import {
  Input,
  Component,
  Directive,
  OnChanges,
  ViewChild,
  ElementRef,
  AfterViewInit,
  ChangeDetectorRef
} from '@angular/core'

@Directive( {
  selector: '[text] [clamp] [buttonName] [buttonColor]'
} )
export class TextLineClampDirective {

  public onChange: any = () => {}
  public onTouched: any = () => {}

  @Input () public text ? : string
  @Input () public clamp: number = 2

  @Input () public buttonName: string = '...More'
  @Input () public buttonColor: string = '#999999'
}

@Component( {
  selector: 'text-line-clamp',
  templateUrl: './text-line-clamp.component.html',
  styleUrls: [ './text-line-clamp.component.scss' ]
} )
export class TextLineClampComponent extends TextLineClampDirective implements OnChanges, AfterViewInit {

  @ViewChild( 'section' ) el!: ElementRef;

  public truncate: string = ''

  private char: Array < string > = []
  private line: number = 0
  private expand: boolean = false
  private context: any

  constructor( private cdr: ChangeDetectorRef ) {

    super()

    this.context = document.createElement( 'canvas' ).getContext( '2d' ) !
  }

  ngOnLoad(): void {

    this.char = []

    this.line = 0

    this.expand = false

    this.truncate = ''

    /* Separate line break characters. */
    var char = this.text?.split( /\n/g ) || []

    let rect: any = this.el.nativeElement.getBoundingClientRect()

    let button = this.context.measureText( this.buttonName )

    while ( char.length ) {

      /* Tree-shaped string slicing */
      this.setSlice( [ char.shift() ! ], rect.width, rect, button )

      if ( ++this.line < this.clamp ) {

        /* Merge line break characters. */
        if ( char.length ) this.char.push( '\n' )

      } else break
    }

    this.truncate = this.char.join( '' )

    this.cdr.detectChanges()
  }

  ngOnChanges(): void {

    if ( this.el ) this.ngOnLoad()
  }

  ngAfterViewInit(): void {

    let style = window.getComputedStyle( this.el.nativeElement.parentElement )

    this.context.letterSpacing = style.letterSpacing

    this.context.font = `${ style.fontWeight } ${ style.fontSize } ${ style.fontFamily }`

    this.cdr.detectChanges()

    setTimeout( () => this.ngOnLoad() )
  }

  /* Set */
  setSlice( split: Array < string > , actual: number, rect: any, button: any ): number {

    while ( split.length ) {

      let text = split.shift()

      if ( !text ) continue

      let half = Math.floor( text.length / 2 )

      let measure = this.context.measureText( text )

      /* If it is the last line, add more text and calculate */
      if ( actual < measure.width + ( this.line < this.clamp - 1 ? 0 : button.width ) ) {

        if ( text.length > 1 ) actual = this.setSlice( [ text.substring( 0, half ), text.substring( half, text.length ) ], actual, rect, button )

        else {

          if ( ++this.line < this.clamp ) {

            actual = rect.width - measure.width

            this.char.push( text )

            continue
          }

          break
        }

        continue
      }

      actual = actual - measure.width

      this.char.push( text )
    }

    return actual
  }

  /* Get */
  get button(): boolean {

    return !this.expand && this.line > this.clamp - 1
  }

  get content(): string {

    return ( this.expand ? this.text : this.truncate ) || ''
  }

  /* Action */
  onMore(): void {

    this.expand = !this.expand
  }
}