import React, { Component } from 'react';

class Question extends Component{
    constructor(props){
        super(props);

        this.handleQuestionChange = this.handleQuestionChange.bind(this);
        this.handleAnswerChange = this.handleAnswerChange.bind(this);
        this.submitQuestion = this.submitQuestion.bind(this);

        this.state = {
            question: '',
            answer: false,
        };
    }

    handleQuestionChange(event){
        this.setState({...this.state, question: event.target.value})
    }

    handleAnswerChange(event){
        this.setState({...this.state, answer: event.target.value})
    }

    submitQuestion(){
        return this.state;
    }

    render(){
        return (
            <div>
                Enter a question Here:
                <input type='text' value={this.state.question} onChange={this.handleQuestionChange} />

                Yes or No:
                <input type='radio' value={this.state.answer} onChange={this.handleAnswerChange} />

                <button onClick={this.props.clickEvent}>Save Question</button>
            </div>
        );
    }

}

export default Question;