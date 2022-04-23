<script lang="ts">
    import LayoutGrid, { Cell } from '@smui/layout-grid';

    import MultipleChoiceItem from '@lib/question/item/MultipleChoiceItem.svelte';

    import type { AnswerStatus } from '@type/answer';
    import type { Question } from '@type/question';

    export let answer_status: AnswerStatus = null;
    export let question_info: Question = null;
    export let onAnswerClick: (_: number) => void = null;
</script>

<LayoutGrid>
    {#if question_info}
        {#each question_info.answer_choice as choice, i}
            <Cell span={6}>
                <MultipleChoiceItem
                    choice={choice}
                    index={i}
                    status={answer_status}
                    onClick={onAnswerClick}
                />
            </Cell>
        {/each}
    {/if}
</LayoutGrid>