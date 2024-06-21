/**
 * script for https://wormboy3.neocities.org/markdown-tool 's behavior. this includes conversion from markdown to html and behavior of buttons.
 * 
 * compiled from typescript
 */

import "https://cdn.jsdelivr.net/npm/marked/marked.min.js";

// gather elements.
const HLJS_SCRIPT = document.getElementById("script-hljs") as HTMLScriptElement;

const INPUT_AREA = document.getElementById("input") as HTMLTextAreaElement;
const OUTPUT_AREA = document.getElementById("output") as HTMLElement;

const COPY_BTN = document.getElementById("copy-text") as HTMLButtonElement;
const RENDER_CHECK = document.getElementById("auto-preview") as HTMLInputElement;


// copy current html output to clipboard.
COPY_BTN.addEventListener("click", () => {
    navigator.clipboard.writeText(OUTPUT_AREA.innerText);
});


/**
 * reloads the HLJS highlighting script.
 */
function runHLJS(): void {
    HLJS_SCRIPT.remove();
    document.head.appendChild(HLJS_SCRIPT);
}

/**
 * renders the output.
 */
function updateOutput(): void {
    OUTPUT_AREA.innerText = marked.parse(INPUT_AREA.value);
    OUTPUT_AREA.classList.remove("hljs");
    runHLJS();
}

// change output preview after leaving the textarea box
INPUT_AREA.addEventListener("change", () => {
    updateOutput();
});

// changes output with every keyup.
INPUT_AREA.addEventListener("keyup", () => {
    if (!RENDER_CHECK.checked) return;
    updateOutput();
});
