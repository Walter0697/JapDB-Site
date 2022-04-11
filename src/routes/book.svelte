<script lang="ts">
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import LayoutGrid, { Cell } from '@smui/layout-grid';
    import Ripple from '@smui/ripple';
    import LinearProgress from '@smui/linear-progress';
    import Accordion, { Panel, Header, Content } from '@smui-extra/accordion';

    import type { Pronounciation, PronounciationList } from '@type/pronounciation';
    import type { BookChapter, BookCollection } from '@type/book';
    import { setBookList } from '@util/storage';
    import Sentence from '@lib/japanese/Sentence.svelte'

    let fetching: boolean = true;
    let collections: BookCollection[] = [];
    
    onMount(async () => {
        fetch(import.meta.env.VITE_BACKEND_URL + "/booklist")
        .then(response => response.json())
        .then(data => {
            let bookList = new Map<string, boolean>();
            data.result.forEach(book => {
                const bookName: string = book.translation.local;
                const exist: boolean = bookList.get(bookName);
                if (!exist) {
                    bookList.set(bookName, true);
                }
            });

            collections = [];
            for (const [bookName, exist] of bookList) {
                const chapterList = data.result.filter(s => s.translation.local === bookName);
                // any item from this list can give us correct book info
                // so just pick the first one
                let bookInfo: BookCollection = {
                    localName: chapterList[0].translation.local,
                    chineseName: chapterList[0].translation.zh,
                    englishName: chapterList[0].translation.en,
                    japaneseName: chapterList[0].translation.jp,
                    allChapters: [],
                };

                chapterList.forEach(element => {
                    let pronounceList: PronounciationList = {
                        list: [],
                    };
                    element.chapter.pronounce.forEach(pro => {
                        let pronounce: Pronounciation = {
                            word: pro.word,
                            hiragana: pro.hiragana,
                        };
                        pronounceList.list.push(pronounce);
                    });
                    let chapter: BookChapter = {
                        identifier: element.identifier,
                        version: element.version,
                        chapterNumber: element.chapter.number,
                        chapterTitle: element.chapter.title,
                        grammar: element.grammar,
                        pronounciation: pronounceList,
                    }
                    bookInfo.allChapters.push(chapter);
                });
                collections.push(bookInfo);
            }
            // add collection to local storage, we don't want to cache it first but should still get some references
            setBookList(collections);
            fetching = false;
        }).catch(error => {
            console.log(error);
            return '';
        });
    });

</script>

<LayoutGrid>
    {#if fetching}
        <Cell span={12}>
            <LinearProgress indeterminate />
        </Cell>
    {:else}
        {#each collections as bookInfo, i}
            <Cell span={12}>
                <Accordion>
                    <Panel>
                        <Header>{bookInfo.localName}</Header>
                        <Content>
                            <LayoutGrid>
                                {#each bookInfo.allChapters as chapter, j}
                                    <Cell span={6}>
                                        <div
                                            class="chapterButton"
                                            use:Ripple={{ surface: true }}
                                            on:click={() => { goto(`/quiz/select/${chapter.identifier}-${chapter.version}`); }}
                                        >
                                            <Sentence
                                                sentence={`${chapter.chapterNumber}) ${chapter.chapterTitle}`}
                                                pronounce={chapter.pronounciation}
                                                textColor={"white"}
                                            />
                                        </div>
                                    </Cell>
                                {/each}
                            </LayoutGrid>
                        </Content>
                    </Panel>
                </Accordion>
            </Cell>
        {/each}
    {/if}
</LayoutGrid>

<style>
    .chapterButton {
        display: inline-block;
        border-radius: 5px;
        padding: 10px;
        cursor: pointer;
    }
</style>