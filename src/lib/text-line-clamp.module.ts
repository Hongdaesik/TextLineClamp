import {
  NgModule
} from '@angular/core'
import {
  FormsModule
} from '@angular/forms'
import {
  CommonModule
} from '@angular/common'

import {
  TextLineClampComponent
} from './text-line-clamp.component'

@NgModule( {
  declarations: [

    TextLineClampComponent
  ],
  imports: [

    FormsModule,
    CommonModule,
  ],
  exports: [

    TextLineClampComponent
  ]
} )
export class TextLineClampModule {}