import {BaseLayout} from './BaseLayout.js';

/**
 * TODO @straversi: document and test this Layout.
 */
export abstract class Layout1dGrid<Config> extends BaseLayout<Config> {
  protected _rolumns: number = 1;

  _viewDim2Changed() {
    this._scheduleLayoutUpdate();
  }

  _itemDim2Changed() {
    this._scheduleLayoutUpdate();
  }

  _getActiveItems() {
    const min = Math.max(0, this._scrollPosition - this._overhang);
    const max = Math.min(
        this._scrollSize,
        this._scrollPosition + this._viewDim1 + this._overhang);
    const firstCow = Math.floor(min / this._delta);
    const lastCow = Math.ceil(max / this._delta) - 1;

    this._first = firstCow * this._rolumns;
    this._last =
        Math.min(((lastCow + 1) * this._rolumns) - 1, this._totalItems - 1);
    this._physicalMin = this._delta * firstCow;
    this._physicalMax = this._delta * (lastCow + 1);
  }

  _getItemPosition(idx: number): {top: number, left: number} {
    return {
      [this._positionDim]: this._spacing + Math.floor(idx / this._rolumns) * this._delta,
          [this._secondaryPositionDim]: this._spacing +
          ((idx % this._rolumns) * (this._spacing + this._itemDim2))
    } as unknown as {top: number, left: number};
  }

  _updateScrollSize() {
    this._scrollSize =
        Math.max(1, Math.ceil(this._totalItems / this._rolumns) * this._delta + this._spacing);
  }
}
