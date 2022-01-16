<script>
	import {initialize, allText, image, status} from '$lib/index'
	(async()=>{
		console.log(await initialize());
		image.set('https://tesseract.projectnaptha.com/img/eng_bw.png');
	})()
</script>

<h1>Welcome</h1>
<p>{$status}</p>
<p>{$allText}</p>
