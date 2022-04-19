import type { Question, VocabItem, QuestionSentenceInfo } from '@type/question'
import { QuestionType } from '@type/question';
import type { QuizItem } from '@type/quiz';
import { getRandom, getRandomListOfItem } from '@util/utils';

export const getRandomQuestion = (item: QuizItem, vocabs: VocabItem[]): Question => {
    return getMultipleChoiceQuestion(vocabs);
}

// type1: find the meaning of the word
// type2: find the word with that meaning
// type3: which is the correct grammar, but then we will need a list of verbs
export const getMultipleChoiceQuestion = (vocabs: VocabItem[]): Question => {
    const multipleChoiceList: VocabItem[] = getRandomListOfItem(vocabs, 4);

    let answer_choice: string[] = [];
    for (let i = 0; i < multipleChoiceList.length; i++) {
        answer_choice.push(multipleChoiceList[i].meaning);
    }

    let correct_answer: string[] = [];
    let correct_index: number = getRandom(4);

    let questionInfo: QuestionSentenceInfo = {
        question_identifier: ["quiz.wordtomeaning", "{}"],
        word: multipleChoiceList[correct_index].word,
        pronounce: multipleChoiceList[correct_index].pronounce,
    }

    let output: Question = {
        question: questionInfo,
        question_type: QuestionType.MultipleChoice,
        answer_choice: answer_choice,
        correct_answer: correct_answer,
        correct_index: correct_index,
    }

    return output;
}