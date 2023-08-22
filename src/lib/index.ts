// Reexport your entry components here
import Tesseract, { createWorker } from 'tesseract.js';
import { readable, derived, writable} from 'svelte/store';
import type {Readable, Writable} from 'svelte/store';

/// create js-worker to run tesseract, also make him update the _progress state
let worker : Tesseract.Worker | null; 

/// set this writeable to the image that shall be scanned
export const image: Writable<Tesseract.ImageLike> = writable();


interface Progress {
	/// what step of the recognition are we currently in
	status: string;
	/// how far has this step progressed
	progress: number;
}

/// initializes the worker if not already initialized
export const initialize = async ()=>{
	if(_is_initialized)return;
    worker = createWorker({
        logger: (m) => {
            _progress.update((p) => <Progress>{ status: m.status, progress: m.progress });
        }
    });
	await worker.load();
	await worker.loadLanguage('deu');
	await worker.initialize('deu');
	_is_initialized = true;
}

/// cleans up all recognition stuff if its no longer needed
export const terminate = async ()=>{
	_is_initialized=false;
	await worker?.terminate();
}

/// stores whether the worker is ready for recognition
let _is_initialized = false;

/// combines status and progress into one store
const _progress: Writable<Progress> = writable();


/// what step of the recognition are we currently in
export const status = derived(_progress, ($_progress) => $_progress.status);

/// how far has this step progressed
export const progress = derived(_progress, ($_progress) => $_progress.progress);


const _recognize = async (image: Tesseract.ImageLike): Promise<Tesseract.RecognizeResult> => {
	//make sure worker is ready
	await initialize();
	const result = await worker!.recognize(image);
	console.log({text_found: result.data.text});
	return result;
};

/// the fully writeable result store, but we dont want to expose the setters..
const _result: Writable<Tesseract.RecognizeResult> = writable();

/// readable result directly from tesseract with all its data
export const result: Readable<Tesseract.RecognizeResult> = { subscribe: _result.subscribe };

/// all the resulting text
export const allText = derived(result, ($result) => {if ($result) return $result.data.text; return null;});

/// all text in html format
export const allTextHtml = derived(allText, ($allText) => $allText?.replace(/\n/g, '</br>'));




/// listens to image changes to run recognition pipeline
image.subscribe(newImg=>_recognize(newImg).then((res) => _result.set(res)));