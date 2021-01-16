import React, { Component } from 'react';
import Question from './Question.js';

class QuestionContainer extends Component{
    constructor(props){
        super(props);

        this.handleQuestionChange = this.handleQuestionChange.bind(this);
        this.handleAnswerChange = this.handleAnswerChange.bind(this);
        this.submitQuestion = this.submitQuestion.bind(this);
        this.showResults = this.showResults.bind(this);

        this.state = {
            question: '',
            answer: null,
        };
    }

    handleQuestionChange(event){
        this.setState({...this.state, question: event.target.value})
    }

    handleAnswerChange(answer){
        this.setState({...this.state, answer});
    }

    submitQuestion(){
        this.setState({question: '', answer: null});
        return this.state;
    }

    showResults(key){
        this.setState({...this.state, submit: true, room: key});
    }

    render(){

        const placeholder = ['Am I a Gemini?', 'Are my jokes funny?', 'Would you call me outgoing?', 'Am I a good friend?', 'Does my breath stink?', 'Am I fun to be around?', 'Do I like Taylor Swift?', 'Can I juggle?', 'I\'m the cool friend.', 'I hate quizzes!'];

        const questionForm = (
            <div>
                <div className='header'>{`Question #${this.props.number + 1}`}</div>
                <form>
                    <h4>Write your question:</h4>
                    <input id='qformText' type='text' placeholder={placeholder[Math.floor(Math.random() * placeholder.length)]} value={this.state.question} onChange={this.handleQuestionChange} required />
                    <br/>
                    <div onChange={this.handleAnswerChange}>
                        <button className='qformButton' type="button" onClick={()=>this.handleAnswerChange(true)} style={this.state.answer ? {transform: 'scale(.95)', backgroundColor: '#3a86ffff'} : {}} disabled={this.state.question.length < 5} >Yes</button>
                        <button className='qformButton' type="button" onClick={()=>this.handleAnswerChange(false)} style={this.state.answer === false ? {transform: 'scale(.95)', backgroundColor: '#3a86ffff'} : {}} disabled={this.state.question.length < 5} >No</button>
                    </div>
                    <br/>
                    <button onClick={this.props.clickEvent} disabled={this.state.question.length < 5 || this.state.answer === null}>Next Question</button>
                </form>
            </div>
            );

        const questions = [];

        for(let i = 0; i < this.props.number; i++){
            questions.push(<Question key={`question#${i}`} number={i + 1} question={this.props.questions[i].question} answer={this.props.questions[i].answer.toString()} />);
        }

        const submitForm = (
            <div>
                <div className='header'>Review</div>
                <form>
                    <div id='qformReview'>{questions}</div>
                    <br/>
                    <button onClick={this.props.submit}>Click to submit!</button>
                </form>
            </div>
        );

        const resultForm = (
            <div>
                <div className='header'>Congratulations!</div>
                <form>
                    <input type='text' placeholder='roomkeyhere###' value={this.state.room} />
                </form>
            </div>
        );

        const prompt = this.props.number == 5 ? submitForm : questionForm;
        const modal = this.state.submit ? resultForm : prompt;

        return (
            <div className='questionForm'>
                <button id='exitBtn' onClick={this.props.exit}>x</button>
                {modal}
            </div>
        );
    }

}

export default QuestionContainer;