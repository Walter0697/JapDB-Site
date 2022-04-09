import { writable, derived } from 'svelte/store';

export const apiData = writable("");

export const data = derived(apiData, ($apiData) => {
    if ($apiData){
      console.log("here");
      return $apiData;
    }
    return "testing";
});