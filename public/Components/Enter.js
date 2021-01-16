import React, { Component } from 'react';

class Enter extends Component {

    constructor(props){
        super(props);
        this.handleCodeChange = this.handleCodeChange.bind(this);        
        this.state={room: ''};
    }

    handleCodeChange(event){
        this.setState({...this.state, room: event.target.value});
    }

    render() {
        return(
            <div className='modal'>
                <button id='exitBtn' onClick={this.props.exit}>x</button>
                <div className='header'>Enter Room Code</div>
                <form>
                    <input type='text' placeholder="Enter Room Code" value={this.state.room} onChange={this.handleCodeChange} ></input>
                    <button onClick={(event) => this.props.submit(event, this.state.room)} style={{margin: '16px'}} >Let's Play!</button>
                </form>
            </div>
        );
    }
}

export default Enter;