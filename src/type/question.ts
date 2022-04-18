import type { PronounciationList } from '@type/pronounciation';

export enum QuestionType {
    MultipleChoice = "MultipleChoice",
    Question = "Question",
}

export type QuestionSentenceInfo = {
    question_identifier: string;
    word: string;
}

export type Question = {
    question: QuestionSentenceInfo;
    question_type: QuestionType;
    answer_choice: string[];
    correct_answer: string[];
    correct_index: number;
}

export type VocabType = {
    type: string;   // verb, noun or adjective
    section: string;    // if verb or adjective, which section
}

export type VocabItem = {
    word: string;
    identifier: string;
    pronounce: PronounciationList;
    meaning: string;
    data: VocabType;
}