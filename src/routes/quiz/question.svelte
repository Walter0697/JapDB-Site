<script lang="ts">
    import type { Question, VocabItem, QuestionSentenceInfo } from '@type/question';
    import Sentence from '@lib/japanese/Sentence.svelte';
	import { grammarType, verbType } from '@util/constant';
    import { onMount } from 'svelte';
    import { getCurrentQuizInfo, getVocabBank } from '@util/storage';  
    import { getRandomQuestion } from '@util/question';
    import { detectVerbType, convertVerb } from '@util/grammar';
    import { toHiragana } from "@koozaki/romaji-conv";
    import { t } from '@lib/translations';

    function questionToString(info: QuestionSentenceInfo, translation: any): string {
        if (!info) return "";
        let output = "";
        const identifier_list: string[] = info.question_identifier;
        for (let i = 0; i < identifier_list.length; i++) {
            if (identifier_list[i] === "{}") {
                output += info.word;
            } else {
                output += translation(identifier_list[i]);
            }
        }
        return output;
    }

    let question_sentence: Question = null;
    $: question_display = questionToString(question_sentence?.question, $t);

    onMount(async () => {
        const item = getCurrentQuizInfo();
        const bookIdentifier = item.vocabIdentifier;
        const vocabs = getVocabBank(bookIdentifier);
        question_sentence = getRandomQuestion(item, vocabs);
    });
    
    // TODO
    // question type:
    // change form from verb
    // meaning -> hiragana
    // if flashcard: hiragana -> meaning
    // multiple choice for meaning?
    // the idea is that, first we grab the question type
    // then we use a script to generate a question based on the quiz info
    // then we put it into the question slot
    // after that, we store the result in the local storage
    // each component can make a successful or fail callback
    // after a while question that generated will be based on the previously wrong answer  
</script>

<div>
    <Sentence
        sentence={question_display}
        pronounce={question_sentence?.question?.pronounce}
    />
</div>