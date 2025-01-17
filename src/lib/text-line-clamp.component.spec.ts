import {
  TestBed,
  ComponentFixture
} from '@angular/core/testing'

import {
  TextLineClampComponent
} from './text-line-clamp.component'

describe( 'TextLineClampComponent', () => {
  let component: TextLineClampComponent
  let fixture: ComponentFixture < TextLineClampComponent >

    beforeEach( async () => {
      await TestBed.configureTestingModule( {
          declarations: [ TextLineClampComponent ]
        } )
        .compileComponents()
    } )

  beforeEach( () => {
    fixture = TestBed.createComponent( TextLineClampComponent )
    component = fixture.componentInstance
    fixture.detectChanges()
  } )

  it( 'should create', () => {
    expect( component ).toBeTruthy()
  } )
} )
