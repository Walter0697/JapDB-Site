export enum QuestionType {
    MultipleChoice = "MultipleChoice",
    Question = "Question",
}

export type Question = {
    question: string;
    question_type: QuestionType;
    answer_choice: string[];
    correct_answer: string[];
}

export type VocabItem = {
    word: string;
    pronounce: string;  // maybe not this one
    meaning: string;
}