import React, { Component } from 'react';
import Menu from './Menu.js';
import Question from './Question.js';

class App extends Component {

  constructor(props){
    super(props);

    this.createNewSurvey = this.createNewSurvey.bind(this);
    this.addQuestion = this.addQuestion.bind(this);
    this.sendSurvey = this.sendSurvey.bind(this);

    this.question = React.createRef();

    this.state = {
      create: false,
      questions: []
    };
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

  sendSurvey(){

    const body = this.state;

    fetch(``, {method: 'POST', headers: {'Content-Type': 'Application/JSON'}, body: JSON.stringify(body)})
      .catch(err => console.log(`Error sending survey to db: ${err}`));
    this.setState({...state, create: false});
  }

  render() {

    const blurAmount = this.state.create ? 5 : 0;
    const questions = this.state.create ? <Question ref={this.question} clickEvent={this.addQuestion} submit={this.sendSurvey} number={this.state.questions.length} /> : <div></div>;

    return (
      <div className='container'>
        <div style={{filter: `blur(${blurAmount}px)`}}>
          <h1 style={{fontSize:'72px', textAlign: 'center'}}>FAKE FRIENDS</h1>
          <div className='buttons'><Menu clickEvent={this.createNewSurvey} blurred={this.state.create} /></div>
        </div>
        {questions}
      </div>
    );
  }
}

export default App;
