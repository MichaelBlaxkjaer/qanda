import React, {Component} from 'react';
import {Link} from "@reach/router";
import AskQuestion from "./AskQuestion";

import {
    Container,
    ListGroup,
    ListGroupItem
} from 'reactstrap';

class Questions extends Component {
    API_URL = process.env.REACT_APP_API_URL;

    async getData() {
        let url = `${this.API_URL}/questions`; // URL of the API.
        let result = await fetch(url); // Get the data
        let json = await result.json(); // Turn it into json
        return this.setState({ // Set it in the state
            questions: json
        })
    }

    async askQuestion(question) {
        console.log("askQuestion", question);
        const url = `${this.API_URL}/questions`;
        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                question: question
            })
        });
        const data = await response.json();
        console.log("Printing the response:", data);
        this.getData()
    }

    render() {
        const mapFunction = q =>
            <li key={q._id}>
                <Link to={"/question/" + q._id}>{q.question}</Link>
            </li>;

        let questions = this.props.data;
        let list = questions.map(mapFunction);

        return (
            <>
                <Container>
                    <h1>Questions:</h1>
                        <AskQuestion askQuestion={(text) => this.askQuestion(text)}/>
                            <ListGroup>
                                <ListGroupItem>
                                    {list}
                                </ListGroupItem>
                            </ListGroup>
                </Container>
            </>
        );
    }
}

export default Questions;