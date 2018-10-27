import React, { Component } from 'react';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import { Pie, Line } from 'react-chartjs-2';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';
// this could also be written with destructuring parameters as:
// const UserPage = ({ user }) => (
// and then instead of `props.user.username` you could use `user.username`
const mapStateToProps = state => ({
  user: state.user,
});

class DashView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      plantName: null,
      plantPhoto: 'https://media.architecturaldigest.com/photos/562ab328413dc33926736164/master/w_768/how-to-buy-a-house-plant-02.jpg',
      totalSunNeeds: 6,
      completedSun: 4,
      lightRightNow: 10,


    }
  }
  //GET request for the plant that belongs to the user
  getPlantFacts = () => {
    axios({
      method: 'GET',
      url: '/api/dash/plantFacts',
    }).then((response)=>{
      console.log(response.data);
      this.setState({
        plantName: response.data[0].plant_name,
        plantPhoto: response.data[0].plant_photo,
        totalSunNeeds: response.data[0].light_exposure,
      })
    }).catch((error)=>{
      console.log('Error getting plant facts', error);
    })
  }

  //GET request for most recent light data
  getCurrentLight= () => {
    axios({
      method: 'GET',
      url: '/api/dash',
    }).then((response)=>{
      console.log(response.data);
      this.setState({
        lightRightNow: response.data[0].light_amount,
      })
    }).catch((error)=> {
      console.log('Error getting current light amout');
    })
  }

  //GET request for the last week of light data from the database

  componentDidMount() {
    this.getPlantFacts();
  }

  // componentDidUpdate runs after props and state have changed.
  //If we arent loading the user call AND we dont have a user, kick us out to home
  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.history.push('/login');
    }
  }
  render() {
    let content = null;
    const userPlant = this.plantName;
    const dataHere = this.state.completedSun;
    const light = this.state.lightRightNow;
    const data = {
      labels: [
        'Unmet Sun Hours',
        'Fulfilled Sun Hours'
      ],
      datasets: [{
        data: [(this.state.totalSunNeeds - this.state.completedSun), this.state.completedSun],
        backgroundColor: [
          '#e0e0eb',
          '#FFE77B',
        ],
        hoverBackgroundColor: [
          '#e0e0eb',
          '#FFE77B',
        ]
      }]
    };
    if (this.props.user.username) {
      content = (
        <div style={{textAlign: 'center'}}>
          <h1 id="welcome">
            Welcome, {this.props.user.username}!
          </h1>
          <h4>Here's how {this.state.plantName ? `${this.state.plantName} is doing:` : 'your plant is doing'}</h4>
          <Paper style={{display:'inline-block', padding: '10px', paddingTop:'7vh', paddingBottom: '5vh', margin:'2vw', width: '23vw'}}><img style={{ height: 335}} src={this.state.plantPhoto}/></Paper>
          <Paper style={{display: 'inline-block', textAlign: 'center', margin:'2vw', width: '22vw'}}>
            <h3 style={{textAlign: 'center'}}>Light Right Now</h3>
            {light>=10 ? <img className="weatherIcon" style={{width: '300px', height: '300px'}} src={require("./day.svg")}/>:<img className="weatherIcon" style={{width: '300px', height: '300px'}} src={require("./cloudy.svg")}/>}
            <h4>{this.state.lightRightNow} lumens</h4>
          </Paper>
          <br/>
          <Paper style={{width: '50vw',  margin:'8px', textAlign: 'center', display: 'inline-block'}}>{dataHere && < Pie
            options={{
              title: {
                display: true,
                text: 'Daily Sun Intake',
                fontSize: 18
              }
            }}
            data={data}
            />}
            <h5>{this.state.plantName ? this.state.plantName : 'Your plant'} has received {this.state.completedSun} hours of sun today</h5>
          </Paper>
          <br/>
          <LogOutButton className="log-in" />
        </div>
      )
      return (
        <div>
          {content}
        </div>
      )
    }
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(DashView);
