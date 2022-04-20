<script lang="ts">
	import { detectVerbType, convertVerb } from '@util/grammar';
    import { grammarType, verbType } from '@util/constant';
    import { romajiToHiragana } from 'hiragana-romaji-katakana';

    const testingVerb: string = "karu";
    const verb_type: string = detectVerbType(testingVerb);
    const result: string = convertVerb(testingVerb, verb_type, grammarType.humbleSpeech);
    console.log(result);
    const hiragana: string = romajiToHiragana(result);
    console.log(hiragana);

</script>