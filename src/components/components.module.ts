import { NgModule } from '@angular/core';
import { Popover3Component } from './popover3/popover3';
import { Popover4Component } from './popover4/popover4';
import { ResetComponent } from './reset/reset';
@NgModule({
	declarations: [
    Popover3Component,
    Popover4Component,
    ResetComponent,
],
	imports: [],
	exports: [
    Popover3Component,
    Popover4Component,
    ResetComponent,
   ]
})
export class ComponentsModule {}
