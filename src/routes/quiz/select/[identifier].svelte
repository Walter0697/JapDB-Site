<script lang="ts">
    import LayoutGrid, { Cell } from '@smui/layout-grid';
	import LinearProgress from '@smui/linear-progress';
    import Card, { 
        Media,
        MediaContent, 
    } from '@smui/card';
    import Ripple from '@smui/ripple';
    import { isVocabBankExist, setVocabBank, setCurrentQuiz, getBookChapterByIdentifier } from '@util/storage';
    import { onMount } from 'svelte';
    import { page } from '$app/stores';
    import { QuizType } from '@type/quiz';
    import type { BookChapter } from '@type/book';
    import type { VocabType, VocabItem } from '@type/question';
    import type { Pronounciation, PronounciationList } from '@type/pronounciation';
    import { goto } from '$app/navigation';
    import { t } from '@lib/translations';
 
    let identifier: string = "";
    let version: string = "";
    let fetching: boolean = true;
    
    onMount(async () => {
        const identifierInfo: string = $page.params.identifier;
        const bookInfo: string[] = identifierInfo.split('-');
        identifier = bookInfo[0];
        version = bookInfo[1];

        if (!isVocabBankExist(identifier, version)) {
            fetch(import.meta.env.VITE_BACKEND_URL + "/vocabs?identifier=" + identifier)
            .then(response => response.json())
            .then(data => {
                let vocabs: VocabItem[] = [];

                data.result.forEach(v => {
                    let list: Pronounciation[] = [];
                    v.pronounce.forEach(p => {
                        const pItem: Pronounciation = {
                            word: p.word,
                            hiragana: p.hiragana,
                        }
                        list.push(pItem);
                    });
                    let pronounciation: PronounciationList = {
                        list: list,
                    };
                    const vocabData: VocabType = {
                        type: v.data.type,
                        section: v.data.section,
                        form: v.data.form,
                        verb_form: v.data.verb_form
                    };
                    const result: VocabItem = {
                        word: v.word,
                        identifier: v.identifier,
                        pronounce: pronounciation,
                        meaning: v.meaning,
                        data: vocabData,
                        book: {
                            identifier: identifier,
                            version: version
                        }
                    };

                    vocabs.push(result);
                });
                setVocabBank(vocabs);
                fetching = false;
            });
        } else {
            fetching = false;
        }
    })

    function setQuizInformation(quizType: QuizType) {
        const bookChapter: BookChapter = getBookChapterByIdentifier(identifier);
        setCurrentQuiz(identifier, bookChapter.grammar, quizType);
        goto("/quiz/question");
    }

</script>

<LayoutGrid>
    {#if fetching}
        <Cell span={12}>
            <LinearProgress indeterminate />
        </Cell>
    {:else}
        <Cell span={6}>
            <Card variant="outlined">
                <Media class="" aspectRatio="16x9">
                    <MediaContent>
                    <div
                        style="color: #fff; position: absolute; bottom: 16px; left: 16px;"
                    >
                        <small>{$t('quiz.flashcarddesc')}</small>
                    </div>
                    </MediaContent>
                </Media>
                <div 
                    class="cardcontent" 
                    use:Ripple={{ surface: true }}
                    on:click={() => { setQuizInformation(QuizType.FlashCard); }}    
                >
                    <div class="cardtitle">Flash Card</div>
                </div>
            </Card>
        </Cell>
        <Cell span={6}>
            <Card variant="outlined">
                <Media class="" aspectRatio="16x9">
                    <MediaContent>
                      <div
                        style="color: #fff; position: absolute; bottom: 16px; left: 16px;"
                      >
                      <small>{$t('quiz.quizdesc')}</small>
                      </div>
                    </MediaContent>
                </Media>
                <div 
                    class="cardcontent" 
                    use:Ripple={{ surface: true }}
                    on:click={() => { setQuizInformation(QuizType.Question); }}
                >
                    <div class="cardtitle">Quiz</div>
                </div>
            </Card>
        </Cell>
    {/if}
</LayoutGrid>

<style>
    .cardtitle {
        font-size: 30px;
    }
    .cardcontent {
        height: 100%;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        cursor: pointer;
    }
</style>