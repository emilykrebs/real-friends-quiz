import React, { Component } from 'react';
import {
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import Menu from './Menu.js';
import QuestionContainer from './QuestionContainer.js';
import Login from './Login.js';
import Enter from './Enter.js';
import Game from './Game.js';
import Navbar from './Navbar.js';

const init = {create: false, enterRoom: false, questions: []};

class App extends Component {

  constructor(props){
    super(props);

    this.createNewSurvey = this.createNewSurvey.bind(this);
    this.addQuestion = this.addQuestion.bind(this);
    this.sendSurvey = this.sendSurvey.bind(this);
    this.exitSurvey = this.exitSurvey.bind(this);
    
    this.openRoomPrompt = this.openRoomPrompt.bind(this);
    this.exitRoomPrompt = this.exitRoomPrompt.bind(this);
    this.enterRoomCode = this.enterRoomCode.bind(this);
    this.exitGame = this.exitGame.bind(this);

    this.question = React.createRef();
    this.state = init;
  }

  createNewSurvey(){
    this.setState({...this.state, create: true});
  }
  
  addQuestion(){
    const newQuestion = this.question.current.submitQuestion();
    const questionArr = [...this.state.questions];
    questionArr.push(newQuestion);
    this.setState({...this.state, questions: questionArr});
  }

  sendSurvey(event){
    event.preventDefault();
    const body = this.state.questions;

    fetch(`/survey/addsurvey`, {method: 'POST', headers: {'Content-Type': 'Application/JSON'}, body: JSON.stringify(body)})
      .then(res=>res.json())
      .then(data=>this.question.current.showResults(data))
      .catch(err => console.log(`Error sending survey to db: ${err}`));
  }

  exitSurvey(){
    this.setState(init);
  }

  openRoomPrompt(){
    this.setState({...this.state, enterRoom: true});
  }

  enterRoomCode(event, room){
    event.preventDefault();
    fetch(`/survey/${room}`)
      .then(response=>response.json())
      .then(data=>{
        if (data){
          this.setState({...this.state, create: false, enterRoom: false, questions: [], room, redirectGame: true, redirectHome: false})
        }
        else return;
      });
  }

  exitRoomPrompt(){
    this.setState({...this.state, enterRoom: false});
  }

  exitGame(){
    this.setState({...this.state, redirectHome: true, redirectGame: false})
  }

  render() {

    const questions = this.state.create ? <QuestionContainer ref={this.question} clickEvent={this.addQuestion} submit={this.sendSurvey} exit={this.exitSurvey} number={this.state.questions.length} questions={this.state.questions} /> : <div></div>;
    const enter = this.state.enterRoom ? <Enter submit={this.enterRoomCode} exit={this.exitRoomPrompt} /> : <div></div>;
    
    const redirectGame = this.state.redirectGame ? <Redirect to={{pathname: '/game'}} push/> : <div></div>;
    const redirectHome = this.state.redirectHome ? <Redirect to={{pathname: '/'}} push/> : <div></div>;

    const home = (
      <div className='container'>
        <Login />
        <div id='splash' style={this.state.create || this.state.enterRoom ? {filter: `brightness(${'75%'}) blur(2px)`} : {filter: `brightness(${'100%'}) blur(0px)`}}>
          <h1 id='title'>FAKE FRIENDS</h1>
          <h1 id='tagline'>"NOBODY LIKES YOU!"</h1>
          <h3>Choose your game-mode:</h3>
          <Menu newSurvey={this.createNewSurvey} enterRoom={this.openRoomPrompt} enabled={!this.state.create && !this.state.enterRoom} />
        </div>
        {questions}
        {enter}
        {redirectGame}
      </div>
    );

    const game = (
      <div>
        <Game room={this.state.room} exitGame={this.exitGame} />
        {redirectHome}
      </div>
    );

    return (
      <div id='app'>
        <Navbar username={'USERNAME'} /><div id='bottombar' />
        <Switch>
          <Route exact path='/'>{home}</Route>
          <Route exact path='/game'>{game}</Route>
        </Switch>
      </div>
    );
  }
}

export default App;
