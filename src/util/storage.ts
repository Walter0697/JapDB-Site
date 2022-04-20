import type { QuizType, QuizItem } from '@type/quiz';
import type { VocabItem } from '@type/question';
import type { BookCollection, BookChapter } from '@type/book';

const VOCAB_BANK: string = "VOCAB_BANK";
const CURRENT_QUIZ: string = "CURRENT_QUIZ";
const BOOK_LIST: string = "BOOK_LIST";

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

export const isVocabBankExist = (bookIdentifier: string, version: string): boolean => {
    const item = getItem(VOCAB_BANK);
    if (item) {
        let result: VocabItem[];
        if (result) {
            const exist = result.find(s => s.book.identifier === bookIdentifier && s.book.version === version);
            if (exist) {
                return true;
            }
        }
    }

    return false;
}

export const setVocabBank = (content: VocabItem[]) => {
    const item = getItem(VOCAB_BANK);
    let result: VocabItem[];

    if (item) {
        result = JSON.parse(item);
        for (let i = 0; i < content.length; i++) {
            const vocab = content[i];
            result = result.filter(s => !(s.identifier === vocab.identifier && s.book.identifier === vocab.book.identifier));
            result.push(content[i]);
        }
    } else {
        result = content;
    }

    const strResult: string = JSON.stringify(result);
    setItem(VOCAB_BANK, strResult);
}

export const getVocabBank = (bookIdentifier: string): VocabItem[] => {
    const item = getItem(VOCAB_BANK);
    if (item) {
        let result: VocabItem[];
        result = JSON.parse(item);
        if (result) {
            let output = result.filter(s => s.book.identifier === bookIdentifier);
            return output;
        }
    }
    return null;
}

export const setCurrentQuiz = (vocabIdentifier: string, question: string, quizType: QuizType) => {
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

export const setBookList = (data: BookCollection[]) => {
    const strResult: string = JSON.stringify(data);
    setItem(BOOK_LIST, strResult);
}

export const getBookList = (): BookCollection[] => {
    const item = getItem(BOOK_LIST);
    if (item) {
        let output: BookCollection[] = null;
        output = JSON.parse(item);
        return output;
    }
    return null;
}

export const getBookChapterByIdentifier = (identifier: string): BookChapter => {
    const item = getItem(BOOK_LIST);
    if (item) {
        let collection: BookCollection[] = null;
        collection = JSON.parse(item);
        if (collection) {
            for (let i = 0; i < collection.length; i++) {
                const bookChapter: BookChapter = collection[i].allChapters.find(s => s.identifier === identifier);
                if (bookChapter) {
                    return bookChapter;
                }
            }
        }
    }
    return null;
}