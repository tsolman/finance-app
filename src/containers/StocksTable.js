import React, {Component} from 'react';
import _ from 'lodash'

import {
    SortingState, SelectionState, FilteringState, PagingState, GroupingState,
    IntegratedFiltering, IntegratedGrouping, IntegratedPaging, IntegratedSorting, IntegratedSelection,
} from '@devexpress/dx-react-grid';
import {
    Grid,
    Table,
    TableHeaderRow,
    PagingPanel,
    TableFilterRow
} from '@devexpress/dx-react-grid-bootstrap3';


export default class StocksTable extends React.PureComponent {
    constructor(props) {
        super(props)
    }

    updatePrice = () => {

        let {table_data, stocks} = this.props;
        // console.log('tableData, stocks: ', table_data, stocks);
        _.map(table_data, (tableItem) => {
            _.map(stocks, (stockItem) => {
                // console.log('stockItem: ', stockItem);
                return stockItem.stockname === tableItem.stockname ? tableItem.currentprice = stockItem.currentprice : tableItem.currentprice;
            })
        });
    }

    generateCols = (table_data)=>{
        let tableFields = table_data && table_data.length > 0 ? _.keys(table_data[0]) : 'not good'

        let fields = _.map(tableFields, (field) => {
            return {name: field, title: field}
        })
        return fields;
    }
    render() {
        let {table_data, stocks} = this.props;
        let col, table;
        this.updatePrice();

        // console.log('render', table_data)
        if (table_data !== undefined && table_data.length > 0) {
            let tableFields = this.generateCols(table_data);

            table = (
                <Grid
                    rows={table_data}
                    columns={tableFields}>
                    <PagingState
                        defaultCurrentPage={0}
                        defaultPageSize={10}
                    />
                    <PagingPanel
                        pageSizes={[10,50,200]}
                    />
                    <IntegratedPaging />
                    <FilteringState defaultFilters={[]}/>
                    <IntegratedFiltering/>
                    <Table/>
                    <TableHeaderRow/>
                    <TableFilterRow/>
                </Grid>

            )
        }

        return (
            <div className="content">
                {table}
            </div>
        );
    }
}