<script lang="ts">
    import LayoutGrid, { Cell } from '@smui/layout-grid';
    import Ripple from '@smui/ripple';
    import Card, {
        Media,
        MediaContent,
    } from '@smui/card';

    import type { AnswerReview } from '@type/answer';
    import type { Question } from '@type/question';

    export let answer_status: AnswerReview = null;
    export let question_info: Question = null;
    export let onReviewClick: () => void = null;

</script>

<LayoutGrid>
    {#if question_info}
        <Cell span={12}>
            <Card variant="outlined">
                <Media aspectRatio="16x9">
                    
                </Media>
            </Card>
        </Cell>
    {/if}
</LayoutGrid>

