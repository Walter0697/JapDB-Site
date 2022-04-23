<script lang="ts">
    import LayoutGrid, { Cell } from '@smui/layout-grid';
    import Button, { Label } from '@smui/button';

    import type { AnswerStatus } from '@type/answer';

    export let answer_status: AnswerStatus = null;
    export let onNextClick: () => void = null;
</script>

{#if answer_status}
    {#if answer_status.status !== "none"}
        <LayoutGrid>
            <Cell span={12}>
                <Button 
                    touch 
                    variant="raised" 
                    style="width: 100%;"
                    on:click={onNextClick}
                >
                    <Label>Next</Label>
                </Button>
            </Cell>
        </LayoutGrid>
    {/if}
{/if}