export enum QuizType {
    FlashCard = "FlashCard",
    Question = "Question",
}

export type QuizItem = {
    vocabIdentifier: string;
    quizSpecificQuestion: string;   // such as, grammar structure
    quizType: QuizType;
}