export function virtualTableBodyRender(this: any, h: Function) {
  const columnsHidden = this.columns.map((column: any, index: number) => this.isColumnHidden(index))
  const rows = this.data
  // const data = this.data || []
  return (
    <div
      class={['el-table__virtual-wrapper', { 'el-table--fixed__virtual-wrapper': this.fixed }]}
      style={{ height: this.table.virtualBodyHeight + 'px' }}>
      <div style={[{ transform: `translateY(${this.table.innerTop}px)` }]}>
        <table class="el-table__body" cellspacing="0" cellpadding="0" border="0">
          <colgroup>
            {this._l(this.columns, (column: any, cellIndex: number) =>
              columnsHidden[cellIndex] && this.fixed ? '' : <col name={column.id} />
            )}
          </colgroup>
          <tbody>
            {this._l(rows, (row: any, index: number) => {
              const $index = this.getIndex(index)
              const rowKey = this.table.rowKey ? this.getKeyOfRow(row, $index) : $index
              const treeNode = this.treeData && this.treeData[rowKey]
              const rowClasses = this.getRowClass(row, $index)
              if (treeNode) {
                rowClasses.push('el-table__row--level-' + treeNode.level)
              }
              const tr = (
                <tr
                  v-show={treeNode ? treeNode.display : true}
                  style={this.rowStyle ? this.getRowStyle(row, $index) : null}
                  key={rowKey}
                  on-dblclick={($event: Event) => this.handleDoubleClick($event, row)}
                  on-click={($event: Event) => this.handleClick($event, row)}
                  on-contextmenu={($event: Event) => this.handleContextMenu($event, row)}
                  on-mouseenter={() => this.handleMouseEnter(index)}
                  on-mouseleave={() => this.handleMouseLeave()}
                  class={rowClasses}>
                  {this._l(this.columns, (column: any, cellIndex: number) => {
                    const { rowspan, colspan } = this.getSpan(row, column, $index, cellIndex)
                    if (!rowspan || !colspan || (columnsHidden[cellIndex] && this.fixed)) {
                      return ''
                    }
                    const columnData = Object.assign({}, column)
                    if (colspan !== 1) {
                      columnData.realWidth = columnData.realWidth * colspan
                    }
                    const data = {
                      store: this.store,
                      _self: this.context || this.table.$vnode.context,
                      column: columnData,
                      treeNode: {},
                      row,
                      $index
                    }
                    if (cellIndex === this.firstDefaultColumnIndex && treeNode) {
                      data.treeNode = {
                        hasChildren: treeNode.hasChildren || (treeNode.children && treeNode.children.length),
                        expanded: treeNode.expanded,
                        indent: treeNode.level * this.treeIndent,
                        level: treeNode.level,
                        loaded: treeNode.loaded,
                        rowKey
                      }
                    }
                    return (
                      <td
                        style={[
                          { height: this.table.rowHeight + 'px' },
                          this.getCellStyle($index, cellIndex, row, column)
                        ]}
                        class={this.getCellClass($index, cellIndex, row, column)}
                        rowspan={rowspan}
                        colspan={colspan}
                        on-mouseenter={($event: Event) => this.handleCellMouseEnter($event, row)}
                        on-mouseleave={this.handleCellMouseLeave}>
                        {column.renderCell.call(this._renderProxy, h, data, columnsHidden[cellIndex])}
                      </td>
                    )
                  })}
                </tr>
              )
              if (this.hasExpandColumn && this.store.isRowExpanded(row)) {
                return [
                  tr,
                  <tr>
                    <td colspan={this.columns.length} class="el-table__expanded-cell">
                      {this.table.renderExpanded
                        ? this.table.renderExpanded(h, { row, $index, store: this.store })
                        : ''}
                    </td>
                  </tr>
                ]
              }
              return tr
            }).concat(
              <el-tooltip
                effect={this.table.tooltipEffect}
                popperClass="plTableTooltip"
                placement={this.table.tooltipPlacement}
                ref="tooltip"
                content={this.tooltipContent}></el-tooltip>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
