<script lang="ts">
    import { toStyles } from '../../util/utils'

    export let word: string = "";
    export let pronounce: string = "";
    export let fontSize: string = "16px";
    export let pronounceSize: string = "10px";
    export let textColor: string = "black";

    let styles = {
        'pronounce-size': pronounceSize,
        'word-size': fontSize,
        'text-color': textColor,
	};

    $: cssVarStyles = toStyles(styles);
	
</script>

<div class="container" style="{cssVarStyles}">
    <div class="pronounceStyle">{pronounce}</div>
    <div class="wordStyle">{word}</div>
</div>

<style>
    .container {
        display: inline-block;
        text-align: center;
        color: var(--text-color, black);
    }

    .pronounceStyle {
        font-size: var(--pronounce-size, 10px);
    }

    .wordStyle {
        font-size: var(--word-size, 16px);
    }
</style>