import { grammarType, verbType } from '@util/constant';
import { toHiragana } from "@koozaki/romaji-conv";

export const detectVerbType = (word: string): string => {

    if (word.endsWith("suru")) {
        return verbType.suruVerb;
    } else if (word.endsWith("ru")) {
        const hiragana: string = toHiragana(word);
        if (hiragana.length === 2) {
            return verbType.uVerb;
        }
        return verbType.ruVerb;
    } else {
        return verbType.uVerb;
    }
}

export const convertVerb = (word: string, verb_type: string, grammar: string): string => {
    const specialFormObj = specialForm[word];
    if (specialFormObj) {
        const grammarFormObj = specialFormObj[grammar];
        if (grammarFormObj) {
            return grammarFormObj;
        }
    }

    if (grammar === grammarType.imperativeForm) {
        if (verb_type === verbType.uVerb) {
            let final: string = word.slice(0, -1);  //removing u
            return final + "imasu";
        } else if (verb_type === verbType.ruVerb) {
            let final: string = word.slice(0, -2);  //removing ru
            return final + "masu";
        } else if (verb_type === verbType.suruVerb) {
            let final: string = word.slice(0, -4);  //removing suru
            return final + "simasu";
        }
    } else if (grammar === grammarType.prohibitedForm) {

    } else if (grammar === grammarType.conditionalForm) {

    } else if (grammar === grammarType.passiveForm) {

    } else if (grammar === grammarType.causativeForm) {

    } else if (grammar === grammarType.respectfulSpeech) {

    } else if (grammar === grammarType.humbleSpeech) {
        const politeForm: string = convertVerb(word, verb_type, grammarType.imperativeForm);
        if (verb_type === verbType.suruVerb) {
            return "go" + politeForm;
        } else {
            let final: string = politeForm.slice(0, -4);    //removing masu
            return "o" + final + "simasu";
        }
    } 
    return "";
}

// using dictionary form as identifier
const specialForm = {
    "iku": {
        [grammarType.humbleSpeech]: "mairu",
        [grammarType.respectfulSpeech]: "irassyairu"
    },
    "kuru": {
        [grammarType.humbleSpeech]: "mairu",
        [grammarType.respectfulSpeech]: "irassyairu",
        [grammarType.causativeForm]: "kosaseru",
        [grammarType.passiveForm]: "korareru",
        [grammarType.conditionalForm]: "kureba",
        [grammarType.prohibitedForm]: "kuruna",
        [grammarType.politeForm]: "kimasu"
    },
    "iru": {
        [grammarType.humbleSpeech]: "oru",
        [grammarType.respectfulSpeech]: "irassyairu"
    },
    "taberu": {
        [grammarType.humbleSpeech]: "itadaku",
        [grammarType.respectfulSpeech]: "mesiagairu"
    },
    "nomu": {
        [grammarType.humbleSpeech]: "itadaku",
        [grammarType.respectfulSpeech]: "mesiagairu"
    },
    "morau": {
        [grammarType.humbleSpeech]: "itadaku",
    },
    "iu": {
        [grammarType.humbleSpeech]: "mousu",
        [grammarType.respectfulSpeech]: "ossyaru"
    },
    "suru": {
        [grammarType.humbleSpeech]: "itasu",
        [grammarType.respectfulSpeech]: "nasaru",
        [grammarType.causativeForm]: "saseru",
        [grammarType.passiveForm]: "sareru",
        [grammarType.conditionalForm]: "sureba",
        [grammarType.prohibitedForm]: "suruna",
        [grammarType.politeForm]: "simasu"
    },
    "siru": {
        [grammarType.humbleSpeech]: "zonjiageru",
        [grammarType.respectfulSpeech]: "gozonji"
    },
    "miru": {
        [grammarType.humbleSpeech]: "haikensuru",
        [grammarType.respectfulSpeech]: "goranninaru"
    },
    "kiku": {
        [grammarType.humbleSpeech]: "ukagau",
    },
    "au": {
        [grammarType.humbleSpeech]: "omenikakaru",
    },
    "yaru": {
        [grammarType.causativeForm]: "saseru"
    }
}