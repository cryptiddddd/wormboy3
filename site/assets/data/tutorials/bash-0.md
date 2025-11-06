
lately i've been spending time workign on some linux rices. <span class="whisper">it's not like yummy rice, tho it is yummy, this is slang for customizing my computer's widgets and colors and interface stuff it's really fun and teaches you a lot about the system...</span> namely i've been workign on making my laptop more user-friendly/user-oriented and less rough around the edges, cuz i want to make some other old laptops friendly to ppl entreiyl new to linux!! this is a noble effort.

one thing i wanted to do is to clean up my scfreenshot utility that i use. i have a one-liner that lets me take a screencap of a portion of the screen. here is the command:

```bash
maim -s | xclip -selection clipboard -t image/png -i
```

BREAK IT DOWN:
- `maim` is short for "<em>ma</em>ke <em>im</em>age", which is a program that.. makes image. this is the part where you click and drag to capture an area of da screen, or just click on a window to capture the window (the `-s` argument is what specifies this action)
- `|` this vertical pipe rules. this is not a beginner bash tutorial, but basically this pipe dictates that we will "pipe" the output of the first command (maim) into the input of the second command.
- `xclip` is our second command, and it is basically a nice and simple clipboard utility. thing. it is how we say "put this data on the clipboard so i can paste it somewhere".

ok cool yaaay! that's my screenshot utility and it works great.

here is the poblem i wanted to solve: there's no visual indication of what was done w the screenshot. on windows, when you hit ur screenshot button and click n drag, usually a window pops up about it. so what if a friend uses my computer and takes a screenshot and then what do they even do.... 

## making dat screenshot utility

here's what i want it to do:
1. take screenshot 
2. put screenshot on clipboard
3. give a notification that the screenshot has been taken, and maybe give me some basic info about the image

2 of those steps are already taken care of, but i learned a lot pursuing the third! here are some questions i had to investigate:
- how do i send a notification and what parameters cna i set?
- how do i manage putting the image on my clipboard AND analyzing it?
- how do i get information about an image without saving it to file?

the answers are so much easier than i ever thought ! and this is thanks to something called...

## process substitution

sorry i took so logn to get here hopefully i can edit down but also who care. anyhow.

process substitution is when you substitution the output of a process in the place of where a should file name be. understand? 

<div class="notes">
<p>msot image/file analysis tools (or manipulation tools, or just.. the anything) expect a file path! ie: <code>writefile --output-path=/lala.json</code></p>
</div>

process substitution allows us to: 

```bash
readfile --input-path=[PROCESS HERE]
```

and ehre..... is the syntax.....

```bash
readfile --input-path=<(maim -s)
```

great okay remember `maim` do we remember `maim` we all remeber `maim` right

so now the output of `maim` is sorta held in some pocket dimension that can be referred to as a mystery path name from the perspective of this make-believe `readfile` process.

great so maybe that make no sense let's see it in action. here is my script for my new and ebautifil wormboy screenshot uttitity.

```bash
# take screenshot
maim -s | xclip -selection clipboard -t image/png -i

# read dimensions from clipboard data
dimensions=$(identify -format "%w × %h" <(xclip -o -selection clipboard))

# send notification
notify-send -u "LOW" -a "screenshot" "copied to clipboard" "png, ($dimensions)"
```

in this script BREAK IT DOWN
1. we take our screenshot
2. this line is a doozy:
    - the `variable_name=$(command)` is the first part of this line. we are taking the output of the line in the first pair of parenthesis and saving it to a variable.
    - the command inside, `identify` is one that will give us information about the given png image, usually given as a pathname. syntax usually looks like: `identify /path/to/image.png`
    - ignore the `-format "%w × %h"`. or don't. i dc. i like it. it tells `identify` to format its output as just the width and height of the image.
    - in place of `/path/to/image.png` (an actual path), we have PROCESS SUBSTITUTION...
3. the process substitution sytax (`<(command)` -- note that the < is only on one side, like an arrow) tells the command inside (`xclip`, in this case) to run first, and for its output to be given to `identify` (the outside command) as if it were a file, and not just raw data.
4. then we send a notification with the command `notify-send`, which shooould be on most linux systems afaik.... anyways. the arguments and parameters basically mean to send a low-priority notification that says "screenshot: copied to clipboard" and the following information is provided as the body of the notification.

## okay maybe explain it another way

let's look at the long way around i could have done this

```bash
# take screenshot
maim -s | xclip -selection clipboard -t image/png -i

# save clipboard to file
TEMP_FILE=/tmp/0.png
xclip -o -selection clipboard > $TEMP_FILE

# read dimensions from file
dimensions=$(identify -format "%w × %h" $TEMP_FILE)

# clean up temp file
rm $TEMP_FILE

# send notification
notify-send -u "LOW" -a "screenshot" "copied to clipboard" "png, ($dimensions)"
```

see how that path is used? i save the output of `xclip` reading my clipboard to a temporary file, then i read from that file, and then i clean it up.

using process substitution, all that is saved, and i don't have to think about cleaning it up.

how does process substitution work internally? does it save to a temporary file? i don't know! it probably does, given that it cannot change the code of the program it feeds into, and that program expects a string path to manipulate (remember: just because it takes a path as an argument/parameter doesn't mean it is guaranteed to do anything with it. that would be stupid program design, but nothing is promised and reality follows no law anymore)

so that's my notes on process subsitution. i love this feature of bash and i'm glad.

# using my script

hi there if you are on linux and wanna use this script:

```bash
#!/usr/bin/bash

maim -s | xclip -selection clipboard -t image/png -i

dimensions=$(identify -format "%w × %h" <(xclip -o -selection clipboard))

notify-send -u "LOW" -a "screenshot" "copied to clipboard" "png, ($dimensions)"
```

all you gotta do is...

ensure you have the following dependencies installed:
- maim
- imagemagick (provides `identify`)

then save the above code to a .sh file (ie, "worm-screenshot.sh"), and ensure it has permission to execute.

binding it to a key will depend on your window manager. i use i3, and this is something i can easily bind in the config files. there's some crazy lingo for you, but if you're using something like mint cinnamon edition, you can go to system settings > keyboard and try and make a shortcut from there.
