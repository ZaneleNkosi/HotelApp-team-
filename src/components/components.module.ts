import { NgModule } from '@angular/core';
import { Popover3Component } from './popover3/popover3';
import { Popover4Component } from './popover4/popover4';
@NgModule({
	declarations: [
    Popover3Component,
    Popover4Component,
],
	imports: [],
	exports: [
    Popover3Component,
    Popover4Component,
   ]
})
export class ComponentsModule {}
