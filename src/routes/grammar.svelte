<script lang="ts">
	import { detectVerbType, convertVerb } from '@util/grammar';
	import { toHiragana } from '@koozaki/romaji-conv';
    import { grammarType, verbType } from '@util/constant';

    const testingVerb: string = "karu";
    const verb_type: string = detectVerbType(testingVerb);
    const result: string = convertVerb(testingVerb, verb_type, grammarType.humbleSpeech);
    console.log(result);
    const hiragana: string = toHiragana(result);
    console.log(hiragana);

</script>