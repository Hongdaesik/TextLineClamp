## TextLineClamp Angular Library.

A library that displays the last text with a Show More button attached when the number of lines to be printed is exceeded.

You can check out the demo <a href="https://bettep.org/text-line-clamp">here</a>.

![Excute](https://raw.githubusercontent.com/Hongdaesik/TextLineClamp/master/DEMO.gif)

<br><br>

## Installation

```bash
npm install --save text-line-clamp
```

<br><br>

## Usage

Import into your @NgModule.
```typescript
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { TextLineClampModule } from 'text-line-clamp'

@NgModule({

  imports: [

    FormsModule,
    TextLineClampModule
  ],
  declarations: []
})
export class MyModule {}
```

<br><br>

Then, using your component.
```typescript
@Component( {

  selector: 'app',
  template: '<text-line-clamp [text]="text" [clamp]="2" [buttonName]="\'...More\'" [buttonColor]="\'#999\'"></text-line-clamp>'
} )
export class AppComponent {

  public text: string = 'Please enter the text content.'
}
```

<br><br>

## Parameter
|Name|Type|Description|Default|
|---|---|---|---|
|[clamp]|number|Number of line breaks to show the Show More button|2|
|[buttonName]|string|Show more button title|...More|
|[buttonColor]|string|Show more button color|#999|

<br><br>

## Change Log

`1.0.0` : Initial release.

<br><br>

## License

MIT

<br><br>

## Other programs

<https://bettep.org>