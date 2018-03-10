import React, {Component} from 'react';
import {connect} from 'react-redux'
// import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import './App.css';
import {fetch_userdata, changePrice} from './actions'
import Pusher from 'pusher-js'
import Datatable from './containers/Datatable'
import ExtremeDatatable from './containers/ExtremeDatatable'
import StocksTable from './containers/StocksTable'
import {Tabs, Tab} from 'react-bootstrap'

class App extends Component {
    constructor(props) {
        super(props)
    }

    componentWillMount() {
        this.props.fetch_userdata();

    }


    componentDidMount() {
        Pusher.logToConsole = false;
        const pusher = new Pusher('359ea2e76de5f872c9bb', {
            cluster: 'eu',
            encrypted: true
        });

        const channel = pusher.subscribe('prices');
        channel.bind('priceChange', data => {
            // console.log('priceChange: ', data)
            this.props.changePrice(data);
        });
    }

    render() {
        let {table_data, stocks} = this.props;
        let table = (<Datatable table_data={table_data} stocks={stocks}/>);
        let table2 = (<ExtremeDatatable table_data={table_data} stocks={stocks}/>);
        let table3 = (<StocksTable table_data={stocks} stocks={stocks}/>);
        return (
            <div className="App">
                <header className="header">
                    <h1 className="App-title">User data demo</h1>
                </header>

                <div className="content">

                    <Tabs defaultActiveKey={2} id="uncontrolled-tab-example" unmountOnExit={true}>
                        <Tab eventKey={1} title="BS Table">
                            {table}
                        </Tab>
                        <Tab eventKey={2} title="Ex Table">
                            {table2}
                        </Tab>
                        <Tab eventKey={3} title="Stock prices">
                            {table3}
                        </Tab>
                    </Tabs>
                </div>

            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        table_data: state.financeReducer.table_data,
        stocks: state.financeReducer.stocks
    }
};


export default connect(
    mapStateToProps,
    {fetch_userdata, changePrice}
)(App);
