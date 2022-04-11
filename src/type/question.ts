import type { PronounciationList } from '@type/pronounciation';

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

export type VocabType = {
    type: string;   // verb, noun or adjective
    section: string;    // if verb or adjective, which section
}

export type VocabItem = {
    identifier: string;
    pronounce: PronounciationList;
    meaning: string;
    data: VocabType;
}