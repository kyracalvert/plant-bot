import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Pie, Line } from 'react-chartjs-2';
import Paper from '@material-ui/core/Paper';
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

  //GET request for the last week of light data from the database

  componentDidMount() {
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
    let userPlant = this.plantName;
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
          '#ffab91',
          '#b2dfdb'
        ],
        hoverBackgroundColor: [
          '#ffab91',
          '#b2dfdb'
        ]
      }]
    };
    if (this.props.user.username) {
      content = (
        <div>
          <h1 id="welcome">
            Welcome, {this.props.user.username}!
          </h1>
          <Paper style={{display:'inline-flex',}}><img style={{ height: 200}} src={this.state.plantPhoto}/></Paper>
          <h4>Here's how {userPlant ? `${this.plantName} is doing:` : 'your plant is doing'}</h4>
          <br />
          <Paper style={{width: '500px', height: '300px'}}>{dataHere && < Pie
            options={{
              title: {
                display: true,
                text: 'Daily Sun Intake',
                fontSize: 18
              }
            }}
            data={data}
            />}
            <h5>{userPlant ? userPlant : 'Your plant'} has received {this.state.completedSun} hours of sun today</h5>
          </Paper>
          <br/>
          <Paper>
            <h3>Light Right Now</h3>
            {light>=10 ? <img className="weatherIcon" src={require("./day.svg")}/>:<img className="weatherIcon" src={require("./cloudy.svg")}/>}
          </Paper>
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
