import React, {Component} from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import _ from 'lodash'

export default class Datatable extends React.PureComponent {
    constructor(props) {
        super(props)
    }

    createColumns = (tableData) => {
        let tableFields = tableData && tableData.length > 0 ? _.keys(tableData[0]) : 'not good'
        return (
            _.map(tableFields, (field) => {
                    return (
                        <TableHeaderColumn isKey={field === 'id'}
                                           dataField={field}

                                           key={field}
                                           dataSort>
                            {field}
                        </TableHeaderColumn>)
                }
            ))
    };

    calculateProfit = (tableData) => {
        _.map(tableData, (tableItem) => {
            return tableItem.profit = Math.floor((tableItem.currentprice - tableItem.pricebought) * tableItem.volume);
        });
        return tableData;
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
        let {table_data} = this.props;
        let col, table;
        this.updatePrice();
        this.calculateProfit(table_data);

        // console.log('render', table_data)
        if (table_data !== undefined && table_data.length > 0) {
            // let tableFields = this.generateCols(table_data);

            col = this.createColumns(table_data);

            table = (
                <BootstrapTable data={table_data} search pagination>
                    {col}
                </BootstrapTable>            )
        }

        return (
            <div className="content">
                {table}
            </div>
        );
    }
}