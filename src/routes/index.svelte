<script context="module" lang="ts">
	export const prerender = true;
	    ///import tesseract store 
    import {image, result} from '$lib/tesseract/store';
	
</script>

<script lang="ts">
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<section>
	<h1>
		Welcome to your new<br />SvelteKit app {$result}
	</h1>

	<h2>
		try editing <strong>src/routes/index.svelte</strong>
	</h2>

</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 1;
	}

	h1 {
		width: 100%;
	}
</style>
