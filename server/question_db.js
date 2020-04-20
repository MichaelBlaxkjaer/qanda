class Db {
// Constructs an object for accessing questions in the database

    constructor(mongoose) {
        // The schema needed for storing questions in MongoDB
        const questionSchema = new mongoose.Schema({
            question: String,
            answers: [{ theAnswer: String, likes: Number }]
        });

        // This model is used in the methods of this class to access questions
        this.questionModel = mongoose.model('question', questionSchema);
    }

    // GET all Questions
    async getQuestions() {
        try {
            return await this.questionModel.find({});
        } catch (error) {
            console.error("getQuestions:", error.message);
            return {};
        }
    }

    // GET Question (by id)
    async getQuestion(id) {
        try {
            return await this.questionModel.findById(id);
        } catch (error) {
            console.error("getQuestion:", error.message);
            return {};
        }
    }

    // POST Question
    async createQuestion(newQuestion) {
        let question = new this.questionModel(newQuestion);
        return await question.save();
    }

    // POST Answer (in id of question)
    async addAnswer(questionId, text) {
        const question = await this.getQuestion(questionId);
        const answer = {theAnswer: text, likes: 0};
        question.answers.push(answer);
        return await question.save();
    }

    // PUT doLike answer id of question id)
    async doLike(id, answerId) {
        const question = await this.getQuestion(id);
        const answer = question.answers.id(answerId);
        answer.likes++;
        console.log(answer);
        return await question.save();
    }

    // This method adds a bunch of test data if the database is empty.

    /*
    async bootstrap(count = 10) {

        function getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min + 1) + min);
        }

        function getRandomQuestion() {
            return ['Question 1?', 'Question 2?', 'Question 3?', 'Question 4?'][getRandomInt(0,3)]
        }

        let l = (await this.getQuestions()).length;
        console.log("Question collection size:", l);

        if (l === 0) {
            let promises = [];

            for (let i = 0; i < count; i++) {
                let question = new this.questionModel({
                    question: getRandomQuestion(),
                    answers: [
                        { theAnswer: "Answer1?", likes: 0},
                        { theAnswer: "Answer2", likes: 0}
                    ]
                });
                promises.push(question.save());
            }

            return Promise.all(promises);
        }
    }
*/

}

// For exporting the object used to access the questions in the database
module.exports = mongoose => new Db(mongoose);