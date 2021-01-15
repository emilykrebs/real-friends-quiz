import React, { Component } from 'react';
import Survey from './Survey.js';
import Question from './Question.js';

class App extends Component {

  constructor(props){
    super(props);

    this.createNewSurvey = this.createNewSurvey.bind(this);
    this.addQuestion = this.addQuestion.bind(this);

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
    const questionArr = [this.state.questions];
    questionArr.push(newQuestion);
    this.setState({...this.state, questions: questionArr});
  }

  render() {

    const Questions = this.state.create ? <Question ref={this.question} clickEvent={this.addQuestion} /> : <div></div>;

    return (
      <div>
        <Survey clickEvent={this.createNewSurvey}/>
        {Questions}
      </div>
    );
  }
}

export default App;