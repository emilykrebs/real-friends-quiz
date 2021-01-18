import React, { Component } from 'react';

class Login extends Component {
    constructor(props){
        super(props);

        this.submitSignup = this.submitSignup.bind(this);
        this.submitLogin = this.submitLogin.bind(this);
        this.toggleSignup = this.toggleSignup.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.getUserID = this.getUserID.bind(this);
        
        this.state={
            username: '',
            password: '',
            loggedIn: false,
            signup: false
        }
    }

    handleUsernameChange(event){
        this.setState({...this.state, username: event.target.value});
    }

    handlePasswordChange(event){
        this.setState({...this.state, password: event.target.value});
    }

    toggleSignup(event){
        event.preventDefault();
        this.setState({ ...this.state, signup: !this.state.signup})
    }

    submitSignup(event){
        event.preventDefault();
        
        const body = {username: this.state.username, password: this.state.password};
        fetch(`/user/register`, { method: 'POST', headers: { 'Content-Type': 'Application/JSON' }, body: JSON.stringify(body) })
            .then(res => {
                if (res.status === 200)
                    this.setState({...this.state, loggedIn: true})
                return res.json();
            })
            .then(data => {
                this.setState({...this.state, userID: data});
                this.props.updateUsername();
            })
            .catch(err => console.log(`Error signing up: ${err}`));

        document.getElementById('splash').style.filter = `brightness(${'100%'}) blur(0px)`
    }

    submitLogin(event){
        event.preventDefault();

        const body = {username: this.state.username, password: this.state.password};
        fetch('/user/login', { method: 'POST', headers: { 'Content-Type': 'Application/JSON' }, body: JSON.stringify(body) })
            .then(res => {
                if (res.status === 200)
                    this.setState({...this.state, loggedIn: true})
                    return res.json();
                })
            .then(data=>{
                this.setState({...this.state, userID: data});
                this.props.updateUsername();
            })
            .catch(err => console.log(`Error logging in: ${err}`));   

        document.getElementById('splash').style.filter = `brightness(${'100%'}) blur(0px)`
    }

    getUserID(){
        return this.state.userID;
    }

    componentDidMount(){
        fetch('/user/verify')
            .then(response=>response.json())
            .then(data=>{
                if (!data){
                    document.getElementById('splash').style.filter = `brightness(${'75%'}) blur(2px)`;
                    console.log(data);
                    this.setState({...this.state, loggedIn: data})
                }
                else{
                    document.getElementById('splash').style.filter = `brightness(${'100%'}) blur(0px)`
                    console.log(data);
                    this.setState({...this.state, userID: data, loggedIn: true})
                    this.props.updateUsername();
                }
            });
    }

    render(){

        const login = (
            <div>
                <div className='header'>Welcome to FAKE FRIENDS!</div>
                <form>
                    <h4>Username</h4>
                    <input id='loginformText' type='text' placeholder='Bob Roberts' value={this.state.username} onChange={this.handleUsernameChange} required />
                    <br/>
                    <h4>Password</h4>
                    <input id='loginformText' type='password' placeholder='*****' value={this.state.password} onChange={this.handlePasswordChange} required />
                    <br/>
                    <button disabled={this.state.username.length < 1 || this.state.password.length < 1} onClick={this.state.signup ? this.submitSignup : this.submitLogin}>{this.state.signup ? 'Sign Up' : 'Log In'}</button>
                    <button className='text' onClick={this.toggleSignup}>{this.state.signup ? 'Click Here to Log In!' : 'Click Here to Sign Up!'}</button>
                </form>
            </div>
            );
        
        const defaultModal = <div></div>;
        const modal = this.state.loggedIn ? defaultModal : login;

        return (
            <div className='modal'>
                {modal}
            </div>
        );
    }
}

export default Login;