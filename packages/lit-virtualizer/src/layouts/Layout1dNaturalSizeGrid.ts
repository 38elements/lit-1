/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {Layout1dGrid} from './Layout1dGrid.js';
import {BaseLayoutConfig} from './BaseLayout.js';
import {ItemBox} from './Layout';

export class Layout1dNaturalSizeGrid extends Layout1dGrid<BaseLayoutConfig> {
    updateItemSizes(sizes: {[key: number]: ItemBox}) {
        // Assume all items have the same size.
        const size = Object.values(sizes)[0];
        if (size) {
          this.itemSize = size;
        }
      }

      _updateLayout() {
        this._rolumns = Math.max(1, Math.floor(this._viewDim2 / this._itemDim2));
        if (this._rolumns > 1) {
          this._spacing = (this._viewDim2 % (this._rolumns * this._itemDim2)) /
              (this._rolumns + 1);
        }
        else {
          this._spacing = 0;
        }
      }
}
