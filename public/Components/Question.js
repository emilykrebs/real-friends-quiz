import React, { Component } from 'react';

class Question extends Component{
    constructor(props){
        super(props);

        this.handleQuestionChange = this.handleQuestionChange.bind(this);
        this.handleAnswerChange = this.handleAnswerChange.bind(this);
        this.submitQuestion = this.submitQuestion.bind(this);

        this.state = {
            question: '',
            answer: null,
        };
    }

    handleQuestionChange(event){
        this.setState({...this.state, question: event.target.value})
    }

    handleAnswerChange(event){
        this.setState({...this.state, answer: event.target.value})
    }

    submitQuestion(){
        this.setState({question: ''});
        [...document.getElementsByClassName('qformToggle')].forEach(toggle => toggle.checked = false);;
        return this.state;
    }

    render(){

        const button = this.state.question.length > 9 && this.state.answer ? <button onClick={this.props.clickEvent} >Save Question</button> : <button onClick={this.props.clickEvent} disabled>Save Question</button>;

        const questionForm = (
            <form>
                <div className='header'>{`Question #${this.props.number + 1}`}</div>
                <br/>
                Enter a question Here:
                <input type='text' placeholder="Am I a Gemini?" value={this.state.question} onChange={this.handleQuestionChange} required />
                <br/>
                <div onChange={this.handleAnswerChange}>
                    Yes<input className='qformToggle' type='radio' name='answer' value={true} />
                    <br/>
                    No<input className='qformToggle' type='radio' name='answer' value={false} />
                </div>
                <br/>
                {button}
            </form>
            );

        const submitForm = (
            <div>
                SUBMIT TO ME MORTAL
                <button onClick={this.props.submit}>Send Survey to MongoDB</button>
            </div>
            );

        const prompt = this.props.number == 5 ? submitForm : questionForm;

        return (
            <div className='questionForm'>
                {prompt}
            </div>
        );
    }

}

export default Question;