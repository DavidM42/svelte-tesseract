<script>
import { initialize, allText, image, status } from "$lib/index";
import { onMount } from "svelte";
//   onMount(() => {
//     (async () => {
//       console.log(await initialize());
//       image.set("https://tesseract.projectnaptha.com/img/eng_bw.png");
//     })();
//   });
  import {createWorker} from 'tesseract.js'
  onMount(()=>{
  const worker = createWorker({logger:(m)=>console.log(m)});
  worker.recognize("https://tesseract.projectnaptha.com/img/eng_bw.png");
  });
</script>

<h1>Welcome</h1>
<!-- <p>{$status}</p>
<p>{$allText}</p> -->
