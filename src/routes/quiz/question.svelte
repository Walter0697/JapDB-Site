<script lang="ts">
    import { onMount } from 'svelte';
    import LayoutGrid, { Cell } from '@smui/layout-grid';
    import Paper, { Title, Subtitle } from '@smui/paper';
    import Button, { Label } from '@smui/button';

    import MultipleChoice from '@lib/question/MultipleChoice.svelte';
    import NextQuestionButton from '@lib/question/item/NextQuestionButton.svelte';
    import Sentence from '@lib/japanese/Sentence.svelte';

    import type { AnswerStatus } from '@type/answer';
    import type { Question, VocabItem, QuestionSentenceInfo } from '@type/question';
	import { grammarType, verbType } from '@util/constant';
    import { getCurrentQuizInfo, getVocabBank } from '@util/storage';  
    import { getRandomQuestion } from '@util/question';
    import { detectVerbType, convertVerb } from '@util/grammar';
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

    function getNewQuestion() {
        answer_status = {
            user_selected: -1,
            correct_answer: -1,
            status: "none",
        }
        const item = getCurrentQuizInfo();
        const bookIdentifier = item.vocabIdentifier;
        const vocabs = getVocabBank(bookIdentifier);
        question_info = getRandomQuestion(item, vocabs);
    }

    function multipleChoicePickAnswer(selected_index: number) {
        const correct_index: number = question_info.correct_index;
        const correct_answer: string = question_info.answer_choice[correct_index];
        const selected_answer: string = question_info.answer_choice[selected_index];
        if (correct_answer === selected_answer) {
            answer_status = {
                user_selected: selected_index,
                correct_answer: correct_index,
                status: "correct",
            }
        } else {
            answer_status = {
                user_selected: selected_index,
                correct_answer: correct_index,
                status: "incorrect",
            }
        }
        //getNewQuestion();
    }

    onMount(async () => {
        getNewQuestion();
    });
    
    let answer_status: AnswerStatus = {
        user_selected: -1,
        correct_answer: -1,
        status: "none",
    }
    let question_info: Question = null;
    $: question_display = questionToString(question_info?.question, $t);


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

<LayoutGrid>
    <Cell span={12}>
        <Paper>
            <Title>
                <Sentence
                    sentence={question_display}
                    pronounce={question_info?.question?.pronounce}
                    textColor={'white'}
                />
            </Title>
        </Paper>        
    </Cell>
    <Cell span={12}>
        <MultipleChoice
            answer_status={answer_status}
            question_info={question_info}
            onAnswerClick={multipleChoicePickAnswer}
        />
    </Cell>
    <Cell span={12}>
        <Paper>
            <Subtitle>
            
            </Subtitle>
        </Paper>
    </Cell>
    <Cell span={12}>
        <NextQuestionButton 
            answer_status={answer_status}
            onNextClick={getNewQuestion}
        />
    </Cell>
</LayoutGrid>