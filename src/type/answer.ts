export type AnswerStatus = {
    user_selected: number;
    correct_answer: number;
    status: string;         // none / correct / incorrect
}

export type AnswerReview = {
    correct_answer: string;
}