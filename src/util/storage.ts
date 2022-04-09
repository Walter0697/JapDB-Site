const VOCAB_BANK: string = "VOCAB_BANK";

type VocabBankItem = {
    identifier: string;
    version: string;
    content: string;
}

export const getItem = (key: string): string => {
    const item = localStorage.getItem(key);
    if (item) {
        return item;
    }
    return "";
}

export const setItem = (key: string, value: string) => {
    localStorage.setItem(key, value);
}

export const isVocabBankExist = (identifier: string, version: string): boolean => {
    const item = getItem(VOCAB_BANK);
    if (item) {
        let output: VocabBankItem[];
        output = JSON.parse(item);
        if (output) {
            const vocab = output.find(s => s.identifier === identifier);
            if (vocab) {
                if (vocab.version === version) {
                    return true;
                }
            }
        }
    }
    return false;
}

export const setVocabBank = (identifier: string, version: string, content: string) => {
    const item = getItem(VOCAB_BANK);
    let result: VocabBankItem[];
    let input: VocabBankItem = {
        identifier: identifier,
        version: version,
        content: content,
    }

    if (item) {
        result = JSON.parse(item);
        if (result) {
            // if there is a same identifier, remove it first
            result = result.filter(s => s.identifier !== identifier);
        } else {
            result = [];
        }
    } else {
        result = [];
    }

    result.push(input);

    const strResult: string = JSON.stringify(result);
    setItem(VOCAB_BANK, strResult);
}

export const getVocabBank = (identifier: string): string => {
    const item = getItem(VOCAB_BANK);
    if (item) {
        let result: VocabBankItem[];
        result = JSON.parse(item);
        if (result) {
            let output = result.find(s => s.identifier === identifier);
            return output.content;
        }
    }
    return "";
}