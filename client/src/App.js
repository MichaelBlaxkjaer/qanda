import React, {Component} from 'react';
import Questions from './Questions';
import Question from './Question';
import { Router } from "@reach/router";
import AppNavbar from './AppNavbar';
import NotFound from './NotFound';

// Styling
import { Container } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends Component {
    // API url from the file '.env' OR the file '.env.development'.
    API_URL = process.env.REACT_APP_API_URL;

    constructor(props) {
        super(props);
        this.state = {
            questions: []
        }
    }

    componentDidMount() {
        // Get everything from the API
        this.getData().then(() => console.log("Questions received"));
    }

    async getData() {
        let url = `${this.API_URL}/questions`; // URL of the API.
        let result = await fetch(url); // Get the data
        let json = await result.json(); // Turn it into json
        return this.setState({ // Set it in the state
            questions: json
        })
    }

    getQuestion(id) {
        // Find the question by id
        const question = this.state.questions.find(
            q => q._id === id
        );
        return question;
    }

    async postAnswer(id, theAnswer) {
        console.log("postAnswer", id, theAnswer);
        const url = `${this.API_URL}/questions/${id}/answers`;
        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                theAnswer: theAnswer
            })
        });
        const data = await response.json();
        console.log("Printing the response:", data);
        this.getData()
    }

    async putLike(id, answerId) {
        console.log("putLike", id, answerId);
        const url = `${this.API_URL}/questions/${id}/answers/${answerId}`;
        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'PUT'
        });
        const data = await response.json();
        console.log("Printing the response:", data);
        this.getData()
    }

    render() {
        return (
            <>
                <AppNavbar />
                    <Container>
                        <Router>
                            <Questions path="/" data={this.state.questions}/>
                            <Question path="/question/:id"
                                      getQuestion={id => this.getQuestion(id)}
                                      postAnswer={(id, theAnswer) => this.postAnswer(id, theAnswer)}
                                      putLike={(id, answerId) => this.putLike(id, answerId)}
                            />
                            <NotFound default></NotFound>
                        </Router>
                    </Container>
            </>
        );
    }
}

export default App;