import { html, LitElement, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';
import { scroll } from './scroll.js';
import { scrollerRef, ContainerElement } from './uni-virtualizer/lib/VirtualScroller.js';
import { LayoutSpecifier, Layout, LayoutConstructor } from './uni-virtualizer/lib/layouts/Layout.js';

export { scrollerRef } from './uni-virtualizer/lib/VirtualScroller.js';

/**
 * A LitElement wrapper of the scroll directive.
 *
 * Import this module to declare the lit-virtualizer custom element.
 * Pass an items array, renderItem method, and scroll target as properties
 * to the <lit-virtualizer> element.
 */
@customElement('lit-virtualizer')
export class LitVirtualizer extends LitElement {
    @property()
    renderItem?: ((item: any, index?: number) => TemplateResult);

    @property({attribute: false})
    items: Array<unknown> = [];

    @property({attribute: false})
    scrollTarget: Element | Window = this;

    @property()
    keyFunction: ((item:unknown) => unknown) | undefined = undefined;

    private _layout: Layout | LayoutConstructor | LayoutSpecifier | null = null;

    private _scrollToIndex: {index: number, position: string} | null = null;
  
    createRenderRoot() {
        return this;
    }

    // get items() {
    //     return this._items;
    // }

    // set items(items) {
    //     this._items = items;
    //     this._scroller.totalItems = items.length;
    // }

    /**
     * The method used for rendering each item.
     */
    // get renderItem() {
    //     return this._renderItem;
    // }
    // set renderItem(renderItem) {
    //     if (renderItem !== this.renderItem) {
    //         this._renderItem = renderItem;
    //         this.requestUpdate();
    //     }
    // }

    @property({attribute:false})
    set layout(layout: Layout | LayoutConstructor | LayoutSpecifier | null) {
        // TODO (graynorton): Shouldn't have to set this here
        this._layout = layout;
        this.requestUpdate();
    }

    get layout(): Layout | LayoutConstructor | LayoutSpecifier | null {
        return (this as ContainerElement)[scrollerRef]!.layout;
    }
    
    
    /**
     * Scroll to the specified index, placing that item at the given position
     * in the scroll view.
     */
    async scrollToIndex(index: number, position: string = 'start') {
        this._scrollToIndex = {index, position};
        this.requestUpdate();
        await this.updateComplete;
        this._scrollToIndex = null;
    }

    render(): TemplateResult {
        const { items, renderItem, keyFunction, scrollTarget } = this;
        const layout = this._layout;
        return html`
            ${scroll({ items, renderItem, layout, keyFunction, scrollTarget, scrollToIndex: this._scrollToIndex })}
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'lit-virtualizer': LitVirtualizer;
    }
}