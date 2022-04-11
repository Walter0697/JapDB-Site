import type { PronounciationList } from '@type/pronounciation';

export interface BookCollection {
    localName: string;
    englishName: string;
    chineseName: string;
    japaneseName: string;
    allChapters: BookChapter[];
};

export interface BookChapter {
    identifier: string;
    version: string;
    chapterNumber: string;
    chapterTitle: string;
    grammar: string;
    pronounciation: PronounciationList;
};