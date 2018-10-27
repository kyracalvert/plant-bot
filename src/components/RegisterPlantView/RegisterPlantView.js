import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactFilestack from 'filestack-react';
import axios from 'axios';
// action imports
import { USER_ACTIONS } from '../../redux/actions/userActions';

const mapStateToProps = state => ({
    user: state.user,
});

class RegisterPlantView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            plantName: null,
            photo: 'https://d1nhio0ox7pgb.cloudfront.net/_img/g_collection_png/standard/256x256/plant.png', //default plant prof pic
            plantType: null,
            lightHours: null,
            careNotes: null,

        }
    }
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        })
    }
    sendPlantToDatabase = () => {
        console.log('In sendPlantToDatabase');
        axios({
            method: 'POST',
            url: '/api/plantRegi',
            data: this.state
        }).then((response) => {
            console.log('Plant was successfully sent to the databse', response);

        }).catch((error) => {
            console.log('an error has occurred when sending plant to the database', error);
            alert('Error submitting plant to database')
        })
    }

    onSuccess = (result) => {
        // handle result of uppy here
        console.log('filestack submitted', result.filesUploaded);
        alert('Image added');
        this.setState({
            ...this.state,
            photo: result.filesUploaded[0].url
        })
        console.log(this.state.url);

    }
    componentDidMount() {
        this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
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
        //for filestack
        const options = {
            accept: 'image/*',
            maxFiles: 1,
            storeTo: {
                location: 's3',
            },
        };

        if (this.props.user.username) {
            content = (
                <div>
                    <h2>Tell Us About Your Plant!</h2>
                    <h4>What's your plant's name, type, and how much sun does it need?</h4>
                    <br />
                    <form onSubmit={this.sendPlantToDatabase} >
                        <label htmlFor="profPhoto">Add a picture of your plant</label>
                        <br />
                        <ReactFilestack
                            apikey='A0VAEk6QTS7aCi4uByiZ6z'
                            buttonText="Upload picture"
                            buttonClass="classname"
                            options={options}
                            name="url"
                            onSuccess={this.onSuccess}
                        />
                        <br />
                        <label htmlFor="plantName">Plant name</label>
                        <br />
                        <input name="plantName" onChange={this.handleChange}></input>
                        <br />
                        <label htmlFor="plantType">Plant type</label>
                        <br />
                        <input name="plantType" onChange={this.handleChange}></input>
                        <br />
                        <label htmlFor="lightHours">How many hours of light needed daily?</label>
                        <br />
                        <input name="lightHours" onChange={this.handleChange}></input>
                        <br />
                        <label htmlFor="careNotes">Any additional care notes?</label>
                        <br />
                        <textarea name="careNotes" onChange={this.handleChange}></textarea>
                        <br />
                        <button type="submit"> Add plant </button>
                    </form>

                </div>
            )
        }
        return (
            <div>
                {content}
            </div>
        )
    }
}

export default connect(mapStateToProps)(RegisterPlantView);