Simple-jQuery-Sticky-Bar
========================

40-line jQuery plugin to create a sticky navbar (or any div on your webpage)

## Demo

Look in the 'demo' folder for examples. Top, Bottom, and Justified usage examples provided.

## Options

**maintainHeight** _[true, false]_

Adds the height of the navbar to the new margin of the parent upon sticking navbar. (Prevents content from jumping up the page by the previous height of the in-flow navbar.)

**maintainWidth** _[true, false]_

Sets the navbar width upon sticking navbar. (Useful when the new 'position' rule changes how the navbar displays.)

**checkFullWidth** _[true, false]_

When using maintainWidth, this option will check if the navbar is equal to the width of the parent element. If so, it will use 'width: 100%' instead of setting the pixel width. (Useful in case the user resizes the viewport.)

**maintainMargin** _[true, false]_

Sets the margin of the parent element to the previous margin of the navbar upon sticking navbar.(Prevents content from jumping up page by the previous margin of the in-flow navbar.)

**navbarInline** _[true, false]_

Use this option when the navbar sits inside the content container with other content above it.