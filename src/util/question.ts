import type { Question, VocabItem } from '@type/question'
import type { QuizType, QuizItem } from '@type/quiz';

export const getRandomQuestion = (item: QuizItem, vocabs: VocabItem[]): Question => {

    return null;
}

export const getConvertQuestion = (): Question => {
    // pick a verb 50% chance from this chapter?
    // convert it to be the answer?
    // revert to be 30% chance of the question?
    return null;
}

export const getMultipleChoiceQuestion = (vocabs: VocabItem): Question => {
    
    // pick a word
    // ask the meaning of the vocab
    return null;
}