/**
 * script for https://wormboy3.neocities.org/markdown-tool 's behavior. this includes conversion from markdown to html and behavior of buttons.
 * 
 * compiled from typescript
 */

// @ts-ignore Import module
import { marked } from "https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js";

// @ts-ignore Import module
import hljs from "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.8.0/es/highlight.min.js";


// configure marked
marked.use({
    breaks: true,
    gfm: true
});

const CUSTOMS_CLASSNAME = "custom";

// gather elements.
const INPUT_AREA = document.getElementById("input") as HTMLTextAreaElement;
const OUTPUT_AREA = document.getElementById("output") as HTMLElement;

const COPY_BTN = document.getElementById("copy-text") as HTMLButtonElement;
const RENDER_CHECK = document.getElementById("auto-preview") as HTMLInputElement;

const ADD_CUSTOM = document.getElementById("add-custom") as HTMLButtonElement;
const CUSTOMS = document.getElementById(CUSTOMS_CLASSNAME) as HTMLDivElement;


function addRow(search?: string, replace?: string) {
    const row = document.createElement('div') as HTMLDivElement;
    row.classList.add('h-flex', 'gap-1');

    const input = document.createElement('input') as HTMLInputElement;
    input.setAttribute("type", "text");
    const clone = input.cloneNode() as HTMLInputElement;

    if (search !== undefined) input.value = search;
    if (replace !== undefined) clone.value = replace;
    
    const button = document.createElement('button') as HTMLButtonElement;
    button.innerText = 'x';
    button.classList.add('remove');
    button.addEventListener('click', () => { row.remove() })
    
    row.appendChild(input);
    row.appendChild(clone);
    row.appendChild(button);
    
    CUSTOMS.appendChild(row);
}


// copy current html output to clipboard.
COPY_BTN.addEventListener("click", () => {
    navigator.clipboard.writeText(OUTPUT_AREA.innerText);
});

// create new input for custom replacement
ADD_CUSTOM.addEventListener("click", () => {
    addRow();
});

// adding a default example row
addRow("--", "&mdash;");

/**
 * runs the replacement based on inputs
 */
function runReplacement(text: string): string {
    // iterate through children of customs
    for (const child of document.querySelectorAll(`#${CUSTOMS_CLASSNAME} > div.h-flex.gap-1`)) {
        // get first and second value -- add to a book. if one or either are empty, skip.
        const search = child.firstElementChild as HTMLInputElement;
        const replace = child.querySelector("input:not(:first-child)") as HTMLInputElement;

        // safety check + then replace
        if (search.value === '' || replace.value === '') {
            console.log('search or replace value is blank, skipping.');
            continue;
        }

        text = text.replaceAll(search.value, replace.value);
    }

    return text;
}


/**
 * renders the output.
 */
function updateOutput(): void {
    const parsed = marked.parse(INPUT_AREA.value) as string;
    const replaced = runReplacement(parsed);
    const highlighted = hljs.highlight(replaced, {language: 'html'}).value as string;
    
    // keep the line breaks aughh
    OUTPUT_AREA.innerHTML = highlighted.replaceAll("><", ">\n<");
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

// setup
hljs.highlightAll();
