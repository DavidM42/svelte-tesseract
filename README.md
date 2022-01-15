# Svelte-Tesseract

- A wrapper for [tesseract.js](https://github.com/naptha/tesseract.js) for usage with svelte.

- Simple OCR / text-recognition in any svelte app.

## Alpha

this is still in its earliest development and might not work yet.

## Usage

this library exposes a tesseract store that can be used like any other svelte store.

```typescript
///import tesseract store 
import {image, result, allText} from 'svelte-tesseract';

/// loading a new image
image.set(tesseract_imagelike);
```

```html
<h1>{$allText}</h1>
```

<!--TODO-->
