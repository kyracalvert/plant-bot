import React, { Component } from 'react';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import axios from 'axios';

// this could also be written with destructuring parameters as:
// const UserPage = ({ user }) => (
// and then instead of `props.user.username` you could use `user.username`
// Material UI imports
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';



const mapStateToProps = state => ({
    user: state.user,
    lightData: state.lightData,
});//end mapStateToProps

class PlantDataView extends Component {
    componentDidMount = () => {
        this.getPlantData();
    };//end componentDidMount

    getPlantData = () => {
        axios({
            method: 'GET',
            url: '/api/plant-data',
        }).then((response) => {
            this.props.dispatch({
                payload: response.data,
                type: 'DISPLAY_LIGHT_DATA',
            });
        }).catch((error) => {
            console.log('Error GETTING plant data from the database: ', error)
        });// end error handling
    };//end getPlantData

    render() {
        return (
            <Paper>
                <Table>
                    <TableHead style={{ backgroundColor: '#F5F5F5' }}>
                        <TableRow>
                            <TableCell style={{ color: 'black', size: '20px' }}>Date</TableCell>
                            <TableCell style={{ color: 'black', size: '20px' }}>Time</TableCell>
                            <TableCell style={{ color: 'black', size: '20px' }}>Light Amount</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.props.lightData.map((item, i) => {
                            return (
                            <TableRow>
                                <TableCell>{item.date}</TableCell>
                                <TableCell>{item.time}</TableCell>
                                <TableCell>{item.light_amount}</TableCell>
                            </TableRow>
                            )
                        })}


                    </TableBody>
                </Table>
            </Paper>
        )
    };//end render
};//end ActiveSessionsTable
// Instead of taking everything from state, we just want the user info.
// if you wanted you could write this code like this:
// const mapStateToProps = ({user}) => ({ user });


// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(PlantDataView);