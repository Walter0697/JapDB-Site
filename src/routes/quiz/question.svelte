<script lang="ts">
    import { onMount } from 'svelte';
    import { getCurrentQuizInfo, getVocabBank } from "@util/storage";  
    import { getRandomQuestion } from '@util/question';

    onMount(async () => {
        const item = getCurrentQuizInfo();
        const bookIdentifier = item.vocabIdentifier;
        const vocabs = getVocabBank(bookIdentifier);
        const question = getRandomQuestion(item, vocabs);
        console.log(question);

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