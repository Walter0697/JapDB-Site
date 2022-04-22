<script lang="ts">
    import type { AnswerStatus } from '@type/answer'
    import { Cell } from '@smui/layout-grid';
    import Ripple from '@smui/ripple';

    export let choice: string = ""
    export let onClick: (_: number) => void = null;
    export let index: number = -1;
    export let status: AnswerStatus = null;

    function getClass(s: AnswerStatus, answer_index: number): string {
        let className = "noneAnswer";
        if (s.status !== "none") {
            if (s.status === "correct") {
                if (s.correct_answer === answer_index) {
                    className = "correctAnswer";
                }
            } else {
                if (s.correct_answer === answer_index) {
                    className = "correctAnswer";
                } else if (s.user_selected === answer_index) {
                    className = "wrongAnswer";
                }
            }
        }
        return `choiceButton ${className}`
    }

    function onClickHandler(x: number) {
        if (onClick) {
            onClick(x);
        }
    }

    $: currentClassName = getClass(status, index);
</script>

<Cell span={6}>
    <div
        class={currentClassName}
        use:Ripple={{ surface: true }}
        on:click={() => { onClickHandler(index); }}
    >
        {choice}
    </div>
</Cell>

<style>

    .choiceButton {
        display: inline-block;
        border-radius: 5px;
        margin-left: 5px;
        padding: 10px;
        width: 90%;
        text-align: center;
        cursor: pointer;
    }
    
    .noneAnswer {
        background-color: gray;
    }

    .wrongAnswer {
        background-color: red;
    }

    .correctAnswer {
        background-color: green;
    }
</style>