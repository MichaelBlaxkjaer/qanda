import React, {Component} from 'react';
import {Link} from "@reach/router";
import PostAnswer from './PostAnswer';
import {
    Container,
    ListGroup,
    ListGroupItem,
    Button
} from 'reactstrap';

class Question extends Component {

    onSubmit(answerId) {
        this.props.putLike(this.props.id, answerId);
    }

    render() {
        const id = this.props.id;
        const question = this.props.getQuestion(id);
        let content = "Loading";
        let answers = [];
        if (question) {
            content = question.question;
            answers = question.answers.map(a =>
                    <Container>
                        <ListGroup>
                            <ListGroupItem className={'answer-list'}>
                                {a.theAnswer}
                                <Button
                                    color="dark"
                                    className="like-button"
                                    style={{marginLeft: '1rem', float: 'right'}}
                                    onClick={_ => this.onSubmit(a._id)} >
                                    &#x1F44D; Likes: {a.likes}
                                </Button>
                            </ListGroupItem>
                        </ListGroup>
                    </Container>
                );
        }

        return (
            <>
                <h1>Question:</h1>
                    <p>{content}</p>
                        <br />
                            <h3>Answers</h3>
                                <ul>
                                    {answers}
                                </ul>
                                    <PostAnswer id={id} postAnswer={(id, theAnswer) => this.props.postAnswer(id, theAnswer)}/>
                                    <br/><br/>
                <Link to="/">
                    <Button color="dark" className="back-button">
                        Back
                    </Button>
                </Link>
            </>
        );
    }
}

export default Question;

