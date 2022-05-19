import type { Question, VocabItem, QuestionSentenceInfo } from '@type/question'
import { QuestionType } from '@type/question';
import { QuizItem, QuizType } from '@type/quiz';
import { grammarType } from '@util/constant';
import { convertVerb } from '@util/grammar';
import { getRandom, getRandomItem, getRandomListOfItem } from '@util/utils';
import { romajiToHiragana, hiraganaToRomaji } from 'hiragana-romaji-katakana';

export const getRandomQuestion = (item: QuizItem, vocabs: VocabItem[]): Question => {
    //return getMultipleChoiceQuestion(item, vocabs);
    if (item.quizType === QuizType.FlashCard) {
        return getFlashCardQuestion(item, vocabs);
    }
    return getMultipleChoiceQuestion(item, vocabs);
}

// type1: find the meaning of the word
// type2: find the word with that meaning
// type3: which is the correct grammar, but then we will need a list of verbs
export const getMultipleChoiceQuestion = (item: QuizItem, vocabs: VocabItem[]): Question => {
    if (item.quizSpecificQuestion === "") {
        const questionTypeIndex: number = getRandom(2);
        if (questionTypeIndex === 0) {
            return MultipleChoiceWordToMeaning(vocabs);
        }
        return MultipleChoiceMeaningToWord(vocabs)
    }
    const questionTypeIndex: number = getRandom(4);
    if (questionTypeIndex === 0) {
        return MultipleChoiceWordToMeaning(vocabs);
    } else if (questionTypeIndex === 1) {
        const verb_list: VocabItem[] = vocabs.filter(s => s.data.type === "verb" && s.data.form === "dictionary");
        return QuizConvertVerbToForm(item, verb_list);
    } else if (questionTypeIndex === 2) {
        const verb_list: VocabItem[] = vocabs.filter(s => s.data.type === "verb" && s.data.form === "dictionary");
        return MultipleChoiceVerbToForm(item, verb_list);
    }
    return MultipleChoiceMeaningToWord(vocabs);
}

export const getFlashCardQuestion = (item: QuizItem, vocabs: VocabItem[]): Question => {
    const questionTypeIndex: number = getRandom(2);
    if (questionTypeIndex === 0) {
        return FlashCardMeaningToWord(vocabs);
    }
    return FlashCardWordToMeaning(vocabs);
}

const FlashCardMeaningToWord = (vocabs: VocabItem[]): Question => {
    const selectedWord: VocabItem = getRandomItem(vocabs);
    
    const questionInfo: QuestionSentenceInfo = {
        question_identifier: ["quiz.meaningtoword", "{}"],
        word: selectedWord.meaning,
        pronounce: selectedWord.pronounce,
    }

    const output: Question = {
        question: questionInfo,
        question_type: QuestionType.Question,
        answer_choice: [],
        correct_answer: [selectedWord.word],
        correct_index: -1,
    }

    return output;
}

const FlashCardWordToMeaning = (vocabs: VocabItem[]): Question => {
    const selectedWord: VocabItem = getRandomItem(vocabs);

    const questionInfo: QuestionSentenceInfo = {
        question_identifier: ["quiz.wordtomeaning", "{}"],
        word: selectedWord.word,
        pronounce: selectedWord.pronounce,
    }

    const output: Question = {
        question: questionInfo,
        question_type: QuestionType.Question,
        answer_choice: [],
        correct_answer: [selectedWord.meaning],
        correct_index: -1,
    }

    return output;
}

// Quiz: given verb, to form
const QuizConvertVerbToForm = (item: QuizItem, verbs: VocabItem[]): Question => {
    const selected_verb: VocabItem = getRandomItem(verbs);
 
    let converting_word: string = selected_verb.word;
    for (let i = 0; i < selected_verb.pronounce.list.length; i++) {
        converting_word = converting_word.replace(selected_verb.pronounce.list[i].word, selected_verb.pronounce.list[i].hiragana);
    }
    converting_word = hiraganaToRomaji(converting_word);

    let correct_convertion: string = convertVerb(converting_word, selected_verb.data.section, item.quizSpecificQuestion);
    let correct_hiragana: string = romajiToHiragana(correct_convertion);
    for (let i = 0; i < selected_verb.pronounce.list.length; i++) {
        correct_hiragana = correct_hiragana.replace(selected_verb.pronounce.list[i].hiragana, selected_verb.pronounce.list[i].word);
    }

    const correct_answer: string[] = [correct_hiragana];
    
    const questionInfo: QuestionSentenceInfo = {
        question_identifier: ["quiz.grammarhumble", "{}"],
        word: selected_verb.word,
        pronounce: selected_verb.pronounce,
    }

    let output: Question = {
        question: questionInfo,
        question_type: QuestionType.Question,
        answer_choice: [],
        correct_answer: correct_answer,
        correct_index: -1,
    }

    return output;
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
    let grammar_list: string[] = [
        grammarType.conjuntiveForm,
        grammarType.negativeForm,
        grammarType.perfectiveForm,
        grammarType.teForm,
        grammarType.politeForm,
        grammarType.humbleSpeech
    ]

    let grammar_index = grammar_list.indexOf(item.quizSpecificQuestion);
    if (grammar_index !== -1) {
        grammar_list.splice(grammar_index, 1);
    }

    const random_grammar: string[] = getRandomListOfItem(grammar_list, 3);
    let question_choice: string[] = [];
    let converting_word: string = selected_verb.word;
    for (let i = 0; i < selected_verb.pronounce.list.length; i++) {
        converting_word = converting_word.replace(selected_verb.pronounce.list[i].word, selected_verb.pronounce.list[i].hiragana);
    }
    converting_word = hiraganaToRomaji(converting_word);

    let correct_convertion: string = convertVerb(converting_word, selected_verb.data.section, item.quizSpecificQuestion);
    let correct_hiragana: string = romajiToHiragana(correct_convertion);
    for (let i = 0; i < selected_verb.pronounce.list.length; i++) {
        correct_hiragana = correct_hiragana.replace(selected_verb.pronounce.list[i].hiragana, selected_verb.pronounce.list[i].word);
    }

    for (let i = 0; i < random_grammar.length; i++) {
        const converted: string = convertVerb(converting_word, selected_verb.data.section, random_grammar[i]);
        let hiragana: string = romajiToHiragana(converted);
        for (let i = 0; i < selected_verb.pronounce.list.length; i++) {
            hiragana = hiragana.replace(selected_verb.pronounce.list[i].hiragana, selected_verb.pronounce.list[i].word);
        }
        question_choice.push(hiragana);
    }

    const correct_answer: string[] = [];
    const correct_index: number = getRandom(4);
    question_choice.splice(correct_index, 0, correct_hiragana);
    
    const questionInfo: QuestionSentenceInfo = {
        question_identifier: ["quiz.grammarhumble", "{}"],
        word: selected_verb.word,
        pronounce: selected_verb.pronounce,
    }

    let output: Question = {
        question: questionInfo,
        question_type: QuestionType.MultipleChoice,
        answer_choice: question_choice,
        correct_answer: correct_answer,
        correct_index: correct_index,
    }

    return output;
}