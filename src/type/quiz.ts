export enum QuizType {
    FlashCard = "FlashCard",
    Question = "Question",
}

export enum QuizQuestion {
    RespectForm = "RespectForm",
}

export type QuizItem = {
    vocabIdentifier: string;
    quizSpecificQuestion: QuizQuestion;
    quizType: QuizType;
}