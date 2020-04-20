const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const port = process.env.PORT || 8080;
const app = express();
app.use(cors());
app.use(bodyParser.json()); // Parsing JSON from the body request
app.use(morgan('combined')); // Log all requests
app.use(express.static('../client/build')); // Needed for production build of React

/**** Database ****/
const questionDB = require('./question_db')(mongoose);

/**** Routes ****/

// GET all Questions
app.get('/api/questions', async (req, res) => {
    const questions = await questionDB.getQuestions();
    res.json(questions);
});

// GET Question by id
app.get('/api/questions/:id', async (req, res) => {
    let id = req.params.id;
    const question = await questionDB.getQuestion(id);
    res.json(question);
});

// POST new Question
app.post('/api/questions', async (req, res) => {
    let question = {
        question: req.body.question,
        answers: []
    };
    const newQuestion = await questionDB.createQuestion(question);
    res.json(newQuestion);
});

// POST new Answer in id of the question
app.post('/api/questions/:id/answers', async (req, res) => {
    const id = req.params.id;
    const theAnswer = req.body.theAnswer;
    const updatedQuestion = await questionDB.addAnswer(id, theAnswer);
    res.json({question: updatedQuestion});
});

// PUT upvoteAnswer in question id and Answer id
app.put('/api/questions/:id/answers/:answerId', async (req, res) => {
    const id = req.params.id;
    const answerId = req.params.answerId;
    const upvoteAnswer = await questionDB.doLike(id, answerId);
    res.json({answers: upvoteAnswer});
});

// "Redirect" all get requests (except for the routes specified above) to React's entry point (index.html) to be handled by Reach router
// It's important to specify this route as the very last one to prevent overriding all of the other routes
app.get('*', (req, res) =>
    res.sendFile(path.resolve('..', 'client', 'build', 'index.html'))
);

/**** Start ****/
const url = process.env.MONGO_URL || 'mongodb://localhost/question_db';
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(async () => {
        // await questionDB.bootstrap(); // Fill in test data if needed. - together with question_db bootstrap
        await app.listen(port); // Start the API
        console.log(`Qanda API running on port ${port}!`);
    })
    .catch(error => console.error(error));
