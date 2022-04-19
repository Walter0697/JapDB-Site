import type { Question, VocabItem, QuestionSentenceInfo } from '@type/question'
import { QuestionType } from '@type/question';
import type { QuizItem } from '@type/quiz';
import { getRandom, getRandomItem, getRandomListOfItem } from '@util/utils';

export const getRandomQuestion = (item: QuizItem, vocabs: VocabItem[]): Question => {
    return getMultipleChoiceQuestion(item, vocabs);
}

// type1: find the meaning of the word
// type2: find the word with that meaning
// type3: which is the correct grammar, but then we will need a list of verbs
export const getMultipleChoiceQuestion = (item: QuizItem, vocabs: VocabItem[]): Question => {
    const questionTypeIndex: number = getRandom(2);
    if (questionTypeIndex === 0) {
        return MultipleChoiceWordToMeaning(vocabs);
    }
    return MultipleChoiceMeaningToWord(vocabs);
}

// MCQ: given word, ask meaning
const MultipleChoiceWordToMeaning = (vocabs: VocabItem[]): Question => {
    const multipleChoiceList: VocabItem[] = getRandomListOfItem(vocabs, 4);

    let answer_choice: string[] = [];
    for (let i = 0; i < multipleChoiceList.length; i++) {
        answer_choice.push(multipleChoiceList[i].meaning);
    }

    const correct_answer: string[] = [];
    const correct_index: number = getRandom(4);

    const questionInfo: QuestionSentenceInfo = {
        question_identifier: ["quiz.wordtomeaning", "{}"],
        word: multipleChoiceList[correct_index].word,
        pronounce: multipleChoiceList[correct_index].pronounce,
    }

    const output: Question = {
        question: questionInfo,
        question_type: QuestionType.MultipleChoice,
        answer_choice: answer_choice,
        correct_answer: correct_answer,
        correct_index: correct_index,
    }

    return output;
}

// MCQ: given meaning, ask word
const MultipleChoiceMeaningToWord = (vocabs: VocabItem[]): Question => {
    const multipleChoiceList: VocabItem[] = getRandomListOfItem(vocabs, 4);

    let answer_choice: string[] = [];
    for (let i = 0; i < multipleChoiceList.length; i++) {
        answer_choice.push(multipleChoiceList[i].word);
    }

    const correct_answer: string[] = [];
    const correct_index: number = getRandom(4);

    const questionInfo: QuestionSentenceInfo = {
        question_identifier: ["quiz.meaningtoword", "{}"],
        word: multipleChoiceList[correct_index].meaning,
        pronounce: multipleChoiceList[correct_index].pronounce,
    }

    const output: Question = {
        question: questionInfo,
        question_type: QuestionType.MultipleChoice,
        answer_choice: answer_choice,
        correct_answer: correct_answer,
        correct_index: correct_index,
    }

    return output;
}

// MCQ: given verb, get verb with form
const MultipleChoiceVerbToForm = (item: QuizItem, verbs: VocabItem[]): Question => {
    // TODO: verbs list, randomly pick between global and books
    const selected_verb: VocabItem = getRandomItem(verbs);

    const correct_answer: string[] = [];
    const correct_index: number = getRandom(4);

    const questionInfo: QuestionSentenceInfo = {
        question_identifier: [],
        word: "",
        pronounce: null,
    }

    let output: Question = {
        question: questionInfo,
        question_type: QuestionType.MultipleChoice,
        answer_choice: [],
        correct_answer: correct_answer,
        correct_index: correct_index,
    }

    return output;
}