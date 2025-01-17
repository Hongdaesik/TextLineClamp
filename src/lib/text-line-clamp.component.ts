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

    /* See more Logic for removing text by word based on number of lines. */
    var char = this.text?.split( /(\s|\n)/g ) || []

    let rect: any = this.el.nativeElement.getBoundingClientRect()

    let button = this.context.measureText( this.buttonName )

    let actual = rect.width

    var width: number = actual

    while ( this.line < this.clamp && char.length ) {

      let word = char.shift()

      if ( !word ) continue

      if ( word.indexOf( '\n' ) > -1 ) {

        this.line++

        width = actual

      } else {

        let metrics = this.context.measureText( word )

        let box: number = metrics.width

        let line = box / actual

        if ( line > 1 ) {

          this.line = this.line + Math.floor( line )

          width = actual - ( box % actual )

        } else {

          let remain = width - box

          /* If it is the last line, add more text and calculate */
          if ( remain - ( this.line < this.clamp - 1 ? 0 : button.width ) < 0 ) {

            this.line++

            width = actual - box

          } else {

            width = remain
          }
        }
      }

      if ( this.line > this.clamp - 1 ) break

      this.char.push( word! )
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