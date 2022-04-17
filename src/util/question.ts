import type { Question, VocabItem } from '@type/question'
import { QuestionType } from '@type/question';
import type { QuizItem } from '@type/quiz';
import { getRandom, getRandomListOfItem } from '@util/utils';

export const getRandomQuestion = (item: QuizItem, vocabs: VocabItem[]): Question => {
    return getMultipleChoiceQuestion(vocabs);
}

// type1: type the word with that meaning
export const getConvertQuestion = (): Question => {
    // pick a verb 50% chance from this chapter?
    // convert it to be the answer?
    // revert to be 30% chance of the question?
    return null;
}

// type1: find the meaning of the word
// type2: find the word with that meaning
// type3: which is the correct grammar
export const getMultipleChoiceQuestion = (vocabs: VocabItem[]): Question => {
    const multipleChoiceList: VocabItem[] = getRandomListOfItem(vocabs, 4);

    let answer_choice: string[] = [];
    for (let i = 0; i < multipleChoiceList.length; i++) {
        console.log(multipleChoiceList[i]);
        answer_choice.push(multipleChoiceList[i].meaning);
    }

    let correct_answer: string[] = [];
    let correct_index: number = getRandom(4);

    let output: Question = {
        question: "meaning of word",
        question_type: QuestionType.MultipleChoice,
        answer_choice: answer_choice,
        correct_answer: correct_answer,
        correct_index: correct_index,
    }

    return output;
}