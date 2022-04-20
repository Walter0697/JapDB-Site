import { grammarType, verbType } from '@util/constant';
import { romajiToHiragana, hiraganaToRomaji } from 'hiragana-romaji-katakana';

export const detectVerbType = (word: string): string => {

    if (word.endsWith("suru")) {
        return verbType.suruVerb;
    } else if (word.endsWith("ru")) {
        const hiragana: string = romajiToHiragana(word);
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

    if (grammar === grammarType.conjuntiveForm) {
        if (verb_type === verbType.uVerb) {
            let final: string = word.slice(0, -1);  //removing u
            return final + "i";
        } else if (verb_type === verbType.ruVerb) {
            let final: string = word.slice(0, -2);  //removing ru
            return final;
        } else if (verb_type === verbType.suruVerb) {
            let final: string = word.slice(0, -4);  //removing suru
            return final + "si";
        }
    } else if (grammar === grammarType.negativeForm) {
        if (verb_type === verbType.uVerb) {
            const hiragana = romajiToHiragana(word);
            if (hiragana.endsWith("う")) {
                let final: string = hiragana.slice(0, -1);
                return hiraganaToRomaji(final) + "wanai";
            }
            let final: string = word.slice(0, -1);
            return final + "anai";
        } else if (verb_type === verbType.ruVerb) {
            let final: string = word.slice(0, -2);
            return final + "nai";
        } else if (verb_type === verbType.suruVerb) {
            let final: string = word.slice(0, -4);
            return final + "sinai";
        }
    } else if (grammar === grammarType.teForm) {
        if (verb_type === verbType.uVerb) {
            if (word.endsWith("bu") || word.endsWith("mu") || word.endsWith("nu")) {
                let final: string = word.slice(0, -2);
                return final + "nte";
            } else if (word.endsWith("gu")) {
                let final: string = word.slice(0, -2);
                return final + "ide";
            } else if (word.endsWith("ku")) {
                let final: string = word.slice(0, -2);
                return final + "ite";
            } else if (word.endsWith("su")) {
                let final: string = word.slice(0, -2);
                return final + "site";
            } else if (word.endsWith("ru")) {
                let final: string = word.slice(0, -2);
                return final + "tte";
            } else if (word.endsWith("tsu")) {
                let final: string = word.slice(0, -3);
                return final + "tte";
            } else {
                let final: string = word.slice(0, -1);
                return final + "tte";
            }
        } else if (verb_type === verbType.ruVerb) {
            let final: string = word.slice(0, -2);
            return final + "te";
        } else if (verb_type === verbType.suruVerb) {
            let final: string = word.slice(0, -4);
            return final + "site";
        }   
    } else if (grammar === grammarType.perfectiveForm) {
        const teForm = convertVerb(word, verb_type, grammarType.teForm);
        let final: string = teForm.slice(0, -2);
        if (teForm.endsWith("te")) {
            return final + "ta";
        } else if (teForm.endsWith("de")) {
            return final + "da";
        }
    } else if (grammar === grammarType.imperativeForm) {
 
    } else if (grammar === grammarType.politeForm) {
        const conjuntive: string = convertVerb(word, verb_type, grammarType.conjuntiveForm);
        return conjuntive + "masu";
    } else if (grammar === grammarType.prohibitedForm) {
        
    } else if (grammar === grammarType.conditionalForm) {

    } else if (grammar === grammarType.passiveForm) {

    } else if (grammar === grammarType.causativeForm) {

    } else if (grammar === grammarType.respectfulSpeech) {

    } else if (grammar === grammarType.humbleSpeech) {
        const conjuntive: string = convertVerb(word, verb_type, grammarType.conjuntiveForm);
        if (verb_type === verbType.suruVerb) {
            return "go" + conjuntive + "masu";
        } else {
            return "o" + conjuntive + "simasu";
        }
    } 
    return "";
}

// using dictionary form as identifier
const specialForm = {
    "suru": {
        [grammarType.humbleSpeech]: "itasu",
        [grammarType.respectfulSpeech]: "nasaru",
        [grammarType.causativeForm]: "saseru",
        [grammarType.passiveForm]: "sareru",
        [grammarType.conditionalForm]: "sureba",
        [grammarType.prohibitedForm]: "suruna",
        [grammarType.politeForm]: "simasu",
        [grammarType.negativeForm]: "sinai",
        [grammarType.perfectiveForm]: "sita",
        [grammarType.teForm]: "site",
        [grammarType.conjuntiveForm]: "si"
    },
    "kuru": {
        [grammarType.humbleSpeech]: "mairu",
        [grammarType.respectfulSpeech]: "irassyairu",
        [grammarType.causativeForm]: "kosaseru",
        [grammarType.passiveForm]: "korareru",
        [grammarType.conditionalForm]: "kureba",
        [grammarType.prohibitedForm]: "kuruna",
        [grammarType.politeForm]: "kimasu",
        [grammarType.negativeForm]: "konai",
        [grammarType.perfectiveForm]: "kita",
        [grammarType.teForm]: "kite",
        [grammarType.conjuntiveForm]: "ki"
    },
    "aru": {
        [grammarType.negativeForm]: "nai"
    },
    "tou": {
        [grammarType.perfectiveForm]: "touta",
        [grammarType.teForm]: "aoute"
    },
    "kou": {
        [grammarType.perfectiveForm]: "kouta",
        [grammarType.teForm]: "koute"
    },
    "iku": {
        [grammarType.humbleSpeech]: "mairu",
        [grammarType.respectfulSpeech]: "irassyairu",
        [grammarType.perfectiveForm]: "itta",
        [grammarType.teForm]: "itte"
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