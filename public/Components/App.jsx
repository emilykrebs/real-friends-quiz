import React, { Component } from 'react';
import Menu from './Menu.js';
import QuestionContainer from './QuestionContainer.js';
import Login from './Login.js';

const init = {create: false, questions: []};

class App extends Component {

  constructor(props){
    super(props);

    this.createNewSurvey = this.createNewSurvey.bind(this);
    this.addQuestion = this.addQuestion.bind(this);
    this.sendSurvey = this.sendSurvey.bind(this);
    this.exitSurvey = this.exitSurvey.bind(this);

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

  render() {

    const questions = this.state.create ? <QuestionContainer ref={this.question} clickEvent={this.addQuestion} submit={this.sendSurvey} exit={this.exitSurvey} number={this.state.questions.length} questions={this.state.questions} /> : <div></div>;

    return (
      <div className='container'>
        <Login />
        <div id='topbar' /><div id='bottombar' />
        <div id='splash' style={this.state.create ? {filter: `blur(${2}px) brightness(${'75%'})`} : {}}>
          <h1 id='title'>FAKE FRIENDS</h1>
          <div><Menu clickEvent={this.createNewSurvey} blurred={this.state.create} /></div>
        </div>
        {questions}
      </div>
    );
  }
}

export default App;
