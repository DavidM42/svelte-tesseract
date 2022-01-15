import Tesseract, { createWorker } from 'tesseract.js';
import Store, { readable, derived, writable } from 'svelte/store';

const worker = createWorker({
	logger: (m) => console.log(m)
});

export const image : Store.Writable<Tesseract.ImageLike> = writable();

const _processor = derived(
    image,
    $image => _recognize($image).then(res => _result.set(res))
);

const _result : Store.Writable<Tesseract.RecognizeResult> = writable();

const _recognize = async (image: Tesseract.ImageLike) : Promise<Tesseract.RecognizeResult> => {
	await worker.load();
	await worker.loadLanguage('eng');
	await worker.initialize('eng');
	const result = await worker.recognize(image);
	console.log(result.data.text);
	await worker.terminate();
    return result;
};

export const result : Store.Readable<Tesseract.RecognizeResult> = {subscribe: _result.subscribe};

export const allText = derived(result, $result => $result.data.text);