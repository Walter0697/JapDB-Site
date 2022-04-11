<script lang="ts">
	import type { Pronounciation, PronounciationList } from '@type/pronounciation';
    import Sentence from '@lib/japanese/Sentence.svelte';

    
    let p: Pronounciation = {
        word: "測試",
        hiragana: "先生",
    }
    let pronounce: PronounciationList = {
        list: [p],
    };

</script>

<div>
    <Sentence 
        sentence={"這是一個測試內容"}
        pronounce={pronounce}
    />
</div>

<style>
</style>