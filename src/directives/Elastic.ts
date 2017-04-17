import { ElementRef, Directive, Renderer } from '@angular/core';

@Directive({
    selector: '[elastic]'
})
export class Elastic {

    private source:any;

    constructor(public element:ElementRef, public renderer:Renderer){}

    /**
     * Apos iniciar a directiva, processa os dados
     */
    ngOnInit(){
        this.source = this.element.nativeElement;
        this.renderer.setElementAttribute(this.source, 'rows', '7');
    }
}