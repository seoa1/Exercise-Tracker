import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class EditExercise extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username : "",
            description : "",
            duration: 0,
            date: new Date(),
            users: []
        }

        this.onChangeDate = this.onChangeDate.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDuration = this.onChangeDuration.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        const me = this.props.location.pathname.replace("/edit/", "");

        axios.get('http://localhost:5000/exercises/'+ me)
            .then(res => {

                this.setState({
                    username: res.data.username,
                    description: res.data.description,
                    duration: res.data.duration,
                    date: new Date(res.data.date)
                })
            })

        axios.get('http://localhost:5000/users')
            .then(res => {
                if (res.data.length > 0) {
                    this.setState({
                        users: res.data.map(user => user.username),
                    })
                }
            })
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        })
    }

    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        })
    }

    onChangeDuration(e) {
        this.setState({
            duration: e.target.value
        })
    }

    onChangeDate(d) {
        this.setState({
            date: d
        })
    }

    onSubmit(e) {
        e.preventDefault();

        const exercise = {
            username: this.state.username,
            description: this.state.description,
            duration: this.state.duration,
            date: this.state.date
        }

        console.log(exercise);
        const me = this.props.location.pathname.replace("/edit/", "");

        axios.post("http://localhost:5000/exercises/update/" +me, exercise)
            .then(res => console.log(res.data));

        window.location = '/';
    }

    render() {
        return (
            <div>
                <h1>Edit Exercise Log</h1>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <select 
                            required
                            className="form-control"
                            value={this.state.username}
                            onChange={this.onChangeUsername}>
                            {
                                this.state.users.map(function(user){
                                    return <option
                                        key={user}
                                        value={user}>
                                            {user}
                                        </option>;
                                })
                            }
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Description: </label>
                        <input type="text"
                            className="form-control"
                            value={this.state.description}
                            onChange={this.onChangeDescription}
                            />
                    </div>
                    <div className="form-group">
                        <label>Duration (in minutes): </label>
                        <input type="text"
                            className="form-control"
                            value={this.state.duration}
                            onChange={this.onChangeDuration}
                            />
                    </div>
                    <div className="form-group">
                        <label>Date: </label>
                        <div>
                            <DatePicker
                                selected={this.state.date}
                                onChange={this.onChangeDate}
                                />
                        </div>
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Edit Exercise Log" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        )
    }
}