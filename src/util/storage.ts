import type { QuizQuestion, QuizType, QuizItem } from '@type/quiz';
import type { BookCollection } from '@type/book';

const VOCAB_BANK: string = "VOCAB_BANK";
const CURRENT_QUIZ: string = "CURRENT_QUIZ";
const BOOK_LIST: string = "BOOK_LIST";

type VocabBankItem = {
    identifier: string;
    version: string;
    content: string;
}

export const getItem = (key: string): string => {
    const item = localStorage.getItem(key);
    if (item) {
        return item;
    }
    return "";
}

export const setItem = (key: string, value: string) => {
    localStorage.setItem(key, value);
}

export const isVocabBankExist = (identifier: string, version: string): boolean => {
    const item = getItem(VOCAB_BANK);
    if (item) {
        let output: VocabBankItem[];
        output = JSON.parse(item);
        if (output) {
            const vocab = output.find(s => s.identifier === identifier);
            if (vocab) {
                if (vocab.version === version) {
                    return true;
                }
            }
        }
    }
    return false;
}

export const setVocabBank = (identifier: string, version: string, content: string) => {
    const item = getItem(VOCAB_BANK);
    let result: VocabBankItem[];
    let input: VocabBankItem = {
        identifier: identifier,
        version: version,
        content: content,
    }

    if (item) {
        result = JSON.parse(item);
        if (result) {
            // if there is a same identifier, remove it first
            result = result.filter(s => s.identifier !== identifier);
        } else {
            result = [];
        }
    } else {
        result = [];
    }

    result.push(input);

    const strResult: string = JSON.stringify(result);
    setItem(VOCAB_BANK, strResult);
}

export const getVocabBank = (identifier: string): string => {
    const item = getItem(VOCAB_BANK);
    if (item) {
        let result: VocabBankItem[];
        result = JSON.parse(item);
        if (result) {
            let output = result.find(s => s.identifier === identifier);
            return output.content;
        }
    }
    return "";
}

export const setCurrentQuiz = (vocabIdentifier: string, question: QuizQuestion, quizType: QuizType) => {
    const item: QuizItem = {
        vocabIdentifier: vocabIdentifier,
        quizSpecificQuestion: question,
        quizType: quizType,
    }
    const strResult: string = JSON.stringify(item);
    setItem(CURRENT_QUIZ, strResult);
}

export const getCurrentQuizInfo = (): QuizItem => {
    const item = getItem(CURRENT_QUIZ);
    if (item) {
        let result: QuizItem;
        result = JSON.parse(item);
        return result;
    }
    return null;
}

export const setBookList = (data: BookCollection) => {
    const strResult: string = JSON.stringify(data);
    setItem(BOOK_LIST, strResult);
}

export const getBookList = (): BookCollection => {
    const item = getItem(BOOK_LIST);
    if (item) {
        let output: BookCollection = null;
        output = JSON.parse(item);
        return output;
    }
    return null;
}