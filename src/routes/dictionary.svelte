<script lang="ts">
    import LayoutGrid, { Cell } from '@smui/layout-grid';
    import Paper, { Title, Subtitle, Content } from '@smui/paper';
	import LinearProgress from '@smui/linear-progress';
    import Textfield from '@smui/textfield';
    import HelperText from '@smui/textfield/helper-text';
    import Button, { Label } from '@smui/button';

    import { romajiToHiragana, hiraganaToRomaji } from 'hiragana-romaji-katakana';

    import Sentence from '@lib/japanese/Sentence.svelte';
    import type { Pronounciation, PronounciationList } from '@type/pronounciation';
    import type { VocabType } from '@type/question';
    import type { BookChapter } from '@type/book';

    import { t } from '@lib/translations';

    type BookSource = {
        bookName: string;
        bookid: string;
        bookInfo: BookChapter;
    }

    type MeaningData = {
        bookid: string;
        data: VocabType;
        meaning: string;
        source: string;
        word: string;
        pronounce: PronounciationList;
    }

    let search_word: string = "";
    let searched: boolean = false;
    let loading: boolean = false;
    let found: boolean = false;

    let meaning_list: MeaningData[] = [];
    let book_list: BookSource[] = [];

    function onSearchHandler() {
        searched = true;
        loading = true;
        found = false;
        const romaji = hiraganaToRomaji(search_word);
        fetch(import.meta.env.VITE_BACKEND_URL + "/meaning?identifier=" + romaji)
        .then(response => response.json())
        .then(data => {
            let word_book_list: BookSource[] = [];
            data.books.forEach(book => {
                const pronounceList: PronounciationList = {
                    list: [],
                };
                book.chapter.pronounce.forEach(pro => {
                    let pronounce: Pronounciation = {
                        word: pro.word,
                        hiragana: pro.hiragana,
                    };
                    pronounceList.list.push(pronounce);
                });
                let chapter: BookChapter = {
                    identifier: book.identifier,
                    version: book.version,
                    chapterNumber:  book.chapter?.number,
                    chapterTitle: book.chapter?.title,
                    grammar: book.grammar,
                    pronounciation: pronounceList,
                };
                let source: BookSource = {
                    bookid: book._id,
                    bookName: book.translation.local,
                    bookInfo: chapter,
                }
                word_book_list.push(source);
            });
            book_list = word_book_list;

            let meaning_data_list: MeaningData[] = [];
            data.word.meaning.forEach(meaning => {
                const pronounceList: PronounciationList = {
                    list: [],
                };
                const vocabData: VocabType = {
                    type: meaning.data.type,
                    section: meaning.data.section,
                    form: meaning.data.form,
                    verb_form: meaning.data.verb_form,
                }
                meaning.pronounce.forEach(pro => {
                    let pronounce: Pronounciation = {
                        word: pro.word,
                        hiragana: pro.hiragana,
                    };
                    pronounceList.list.push(pronounce);
                });
                let wordMeaning: MeaningData = {
                    bookid: meaning.bookid,
                    data: vocabData,
                    meaning: meaning.meaning,
                    source: meaning.source,
                    pronounce: pronounceList,
                    word: meaning.word,
                }
                meaning_data_list.push(wordMeaning);
            });

            meaning_list = meaning_data_list;

            found = true;
            loading = false;
        })
    }

</script>  

<LayoutGrid>
    <Cell span={8}>
        <Textfield class="shaped-filled" variant="filled" bind:value={search_word} label="Type here...">
            <HelperText slot="helper"></HelperText>
        </Textfield>
    </Cell>
    <Cell span={4}>
        <Button on:click={onSearchHandler} variant="raised">
            <Label>Search</Label>
        </Button>
    </Cell>
    {#if searched}
        {#if loading}
            <Cell span={12}>
                <LinearProgress indeterminate />
            </Cell>
        {:else if !found}
            <Cell span={12}>
                Cannot find the word: {search_word}
            </Cell>
        {/if}
    {/if}
    {#if !loading && found}
        {#each meaning_list as meaning, i}
            <Cell span={12}>
                <Paper>
                    <Title>
                        {meaning.meaning}   
                    </Title>
                    <Content>
                        {$t('generic.word')} :
                        <Sentence
                            sentence={meaning.word}
                            pronounce={meaning.pronounce}
                            textColor={"white"}
                        />
                        {#each book_list as book, j}
                            {#if book.bookid['$old'] == meaning.bookid['$old']}  
                                <Sentence
                                    sentence={`${$t('generic.source')}: ${book.bookName} Chapter ${book.bookInfo.chapterNumber}`}
                                    pronounce={book.bookInfo.pronounciation}
                                    textColor={"white"}
                                />
                            {/if}
                        {/each}
                    </Content>
                </Paper>
            </Cell>
        {/each}
    {/if}
</LayoutGrid>

<style>

</style>