import React, {Component} from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    Input
} from 'reactstrap';

class PostAnswer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            input: "",
            modal: false
        }
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    };

    onChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    onSubmit() {
        this.props.postAnswer(this.props.id, this.state.input);
        this.toggle();
    }

    render() {
        return (
            <>
                <div>
                    <Button
                        color="dark"
                        style={{marginBottom: '2rem', marginTop: '1rem'}}
                        onClick={this.toggle}
                    >Answer The Question</Button>

                    <Modal
                        isOpen={this.state.modal}
                        toggle={this.toggle}
                    >
                        <ModalHeader toggle={this.toggle}>
                            Type Your Answer Here
                        </ModalHeader>
                        <ModalBody>
                            <Form>
                                <Input
                                    name="input"
                                    type="text"
                                    placeholder="Your Answer"
                                    onChange={event => this.onChange(event)}
                                />
                                <Button
                                    color="dark"
                                    style={{marginTop: '1rem'}}
                                    onClick={_ => this.onSubmit()}>Post Answer
                                </Button>
                            </Form>
                        </ModalBody>
                    </Modal>
                </div>
            </>
        )
    }
}

export default PostAnswer;

