
<script lang="ts">
    ///import tesseract store 
    import {image as img, result, allText} from '$lib';

    /// loading a new image
    img.set('https://i.imgur.com/1ZQ2J9M.jpg');
	let  avatar:any, fileinput:any;
	
	const onFileSelected =(e:any)=>{
  let image = e.target.files[0];
            let reader = new FileReader();
            reader.readAsDataURL(image);
            reader.onload = e => {
                 avatar = e.target!.result
                 img.set(avatar);
            };
}
	
</script>
<div id="app">
	<h1>Upload Image</h1>
  
        {#if avatar}
        <img class="avatar" src="{avatar}" alt="d" />
        {:else}
        <img class="avatar" src="https://cdn4.iconfinder.com/data/icons/small-n-flat/24/user-alt-512.png" alt="" /> 
        {/if}
				<img class="upload" src="https://static.thenounproject.com/png/625182-200.png" alt="" on:click={()=>{fileinput.click();}} />
        <div class="chan" on:click={()=>{fileinput.click();}}>Choose Image</div>
        <input style="display:none" type="file" accept=".jpg, .jpeg, .png" on:change={(e)=>onFileSelected(e)} bind:this={fileinput} >

</div>


<p>the text was '<i>{$allText}</i>'</p>
<style>
	#app{
	display:flex;
		align-items:center;
		justify-content:center;
		flex-flow:column;
}
 
	.upload{
		display:flex;
	height:50px;
		width:50px;
		cursor:pointer;
	}
	.avatar{
		display:flex;
		height:200px;
		width:200px;
	}
</style>

