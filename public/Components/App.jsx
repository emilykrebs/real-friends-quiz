import React, { Component } from 'react';
import Menu from './Menu.js';
import QuestionContainer from './QuestionContainer.js';
import Login from './Login.js';
import Enter from './Enter.js';

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
    // call backend and validate the room code
    event.preventDefault();
    if (room === '123') {
      // reroute to the room page
      console.log('success!!!!');
    }
  }

  exitRoomPrompt(){
    this.setState({...this.state, enterRoom: false});
  }

  render() {

    const questions = this.state.create ? <QuestionContainer ref={this.question} clickEvent={this.addQuestion} submit={this.sendSurvey} exit={this.exitSurvey} number={this.state.questions.length} questions={this.state.questions} /> : <div></div>;
    const enter = this.state.enterRoom ? <Enter submit={this.enterRoomCode} exit={this.exitRoomPrompt} /> : <div></div>;

    return (
      <div className='container'>
        <Login />
        <div id='topbar' /><div id='bottombar' />
        <div id='splash' style={this.state.create || this.state.enterRoom ? {filter: `brightness(${'75%'})`} : {}}>
          <h1 id='title'>FAKE FRIENDS</h1>
          <h1 id='tagline'>"INSERT WITTY TAG HERE"</h1>
          <h3>Choose your game-mode:</h3>
          <div><Menu newSurvey={this.createNewSurvey} enterRoom={this.openRoomPrompt} blurred={this.state.create} /></div>
        </div>
        {questions}
        {enter}
      </div>
    );
  }
}

export default App;
