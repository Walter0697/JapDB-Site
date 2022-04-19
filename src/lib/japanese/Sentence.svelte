<script lang="ts">
	import type { PronounciationList } from '@type/pronounciation';
    import { toStyles } from '@util/utils';
    import Japanese from '@lib/japanese/Japanese.svelte';

    export let sentence: string = "";
    export let pronounce: PronounciationList = null;
    export let fontSize: string = "16px";
    export let pronounceSize: string = "10px";
    export let textColor: string = "black";

    let styles = {
        'pronounce-size': pronounceSize,
        'word-size': fontSize,
        'text-color': textColor,
	};

    $: cssVarStyles = toStyles(styles);

    type SentenceComponent = {
        partType: string;   // either kanji or normal
        pronounce: string;
        content: string;
    }

    function convertSentenceToDisplay(s: string, p: PronounciationList): SentenceComponent[] {
        let output: SentenceComponent[] = [];

        if (p === null || p.list.length === 0) {
            const item: SentenceComponent = {
                partType: "normal",
                pronounce: "",
                content: s,
            }

            output.push(item);
        } else {
            let midResult: string = s;
            p.list.forEach((pronounce) => {
                midResult = midResult.replace(new RegExp(pronounce.word, 'g'), `|kanji${pronounce.word}|`);
            });

            let resultArr: string[] = midResult.split('|');
            resultArr.forEach((part) => {
                if (part.startsWith('kanji')) {
                    const pronounceObj = p.list.find(s => s.word === part.replace('kanji', ''));
                    if (pronounceObj) {
                        // if found, then output should add a kanji component
                        const item: SentenceComponent = {
                            partType: "kanji",
                            pronounce: pronounceObj.hiragana,
                            content: pronounceObj.word,
                        }
                        output.push(item);
                    } else {
                        // if not found, the text may have something weird here
                        const item: SentenceComponent = {
                            partType: "normal",
                            pronounce: "",
                            content: part,
                        }
                        output.push(item);
                    }
                } else {
                    const item: SentenceComponent = {
                        partType: "normal",
                        pronounce: "",
                        content: part,
                    }
                    output.push(item);
                }
            })
        }

        return output;
    }

    $: displayArray = convertSentenceToDisplay(sentence, pronounce);

</script>

<div class="container" style="{cssVarStyles}">
    {#each displayArray as item, i}
        {#if item.partType === "normal"}
            <span class="sentenceContainer">
                {item.content}
            </span>
        {:else}
            <Japanese
                word={item.content}
                pronounce={item.pronounce}
                fontSize={fontSize}
                pronounceSize={pronounceSize}
                textColor={textColor}
            />
        {/if}
    {/each}
</div>

<style>
    .container {
        display: inline-block;
        color: var(--text-color, black);
    }

    .sentenceContainer {
        font-size: var(--word-size, 16px);
    }
</style>