<script lang="ts">
    import LayoutGrid, { Cell } from '@smui/layout-grid';
	import LinearProgress from '@smui/linear-progress';
    import Card, { Content } from '@smui/card';
    import { isVocabBankExist, setVocabBank, getVocabBank } from './../../util/storage';
    import { onMount } from 'svelte';
    import { page } from '$app/stores';
 
    let identifier: string = "";
    let version: string = "";
    let fetching: boolean = true;
    
    onMount(async () => {
        const identifierInfo: string = $page.params.identifier;
        const bookInfo: string[] = identifierInfo.split('-');
        identifier = bookInfo[0];
        version = bookInfo[1];

        if (!isVocabBankExist(identifier, version)) {
            fetch(import.meta.env.VITE_BACKEND_URL + "/vocabs?identifier=" + identifier)
            .then(response => response.json())
            .then(data => {
                const item = JSON.stringify(data.result);
                setVocabBank(identifier, version, item);
                fetching = false;
            });
        } else {
            fetching = false;
        }
    })


</script>

<LayoutGrid>
    {#if fetching}
        <Cell span={12}>
            <LinearProgress indeterminate />
        </Cell>
    {:else}
        <Cell span={12}>
            <Card>
                
            </Card>
        </Cell>
    {/if}
</LayoutGrid>