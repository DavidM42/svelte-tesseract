<script>
	import {initialize, allText, image} from '$lib/index'
	(async()=>{
		console.log(await initialize());
		image.set('https://tesseract.projectnaptha.com/img/eng_bw.png');
	})()
</script>

<h1>Welcome</h1>
<p>{$allText}</p>
