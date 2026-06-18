1.Parsing - In the context of the browser rendering pipeline, parsing is the stage where the browser reads     
            raw files (HTML, CSS, JavaScript) and converts them into internal data structures that it can work with.

   A simplified browser pipeline looks like this:

   1. Receive HTML
   2. Parse HTML → DOM
   3. Parse CSS → CSSOM
   4. Combine DOM + CSSOM → Render Tree
   5. Layout (calculate positions/sizes)
   6. Paint (draw pixels)
   7. Composite (show on screen)


2.Dom Tree - The DOM Tree (Document Object Model Tree) is a tree-like representation of an HTML document that 
             the browser creates after parsing HTML.

        It allows JavaScript to read, modify, add, or remove elements on a webpage.

Example

  HTML:

  <!DOCTYPE html>
  <html>
    <body>
      <h1>Hello</h1>
      <p>Welcome</p>
    </body>
  </html>

   The browser parses this HTML and creates a DOM tree:

   Document
    └── html
      └── body
        ├── h1
        │   └── "Hello"
        └── p
            └── "Welcome"

    Each item in the tree is called a node:

    Document → root node
    html, body, h1, p → element nodes
    "Hello", "Welcome" → text nodes



3.CSSOM Tree - The CSSOM Tree (CSS Object Model Tree) is the browser's internal representation of all the CSS
               rules that apply to a webpage.

         Just as HTML is parsed into a DOM Tree, CSS is parsed into a CSSOM Tree.
         h1 {
             color: blue;
            }

         p {
             font-size: 16px;
            }

       he browser parses the CSS and creates a CSSOM structure similar to:

    Stylesheet
      ├── Rule: h1
      │   └── color: blue
      │
      └── Rule: p
          └── font-size: 16px



4.Render Tree - The Render Tree is a structure the browser creates by combining the DOM Tree and CSSOM Tree.
                It contains only the elements that need to be displayed on the screen, along with their computed styles.
            Step 1: DOM Tree

            HTML:

            <body>
            <h1>Hello</h1>
            <p>Welcome</p>
            </body>

        DOM Tree:

        body
         ├── h1
         │   └── "Hello"
         └── p
             └── "Welcome"
        Step 2: CSSOM Tree

        CSS:

       h1 {
               color: blue;
          }

        p {
            font-size: 16px;
          }

         CSSOM:

        Stylesheet
          ├── h1
          │   └── color: blue
          └── p
              └── font-size: 16px
       Step 3: Create Render Tree

        The browser combines the DOM and CSSOM:

        Render Tree
          ├── h1
          │   ├── text: Hello
          │   └── color: blue
          │
          └── p
              ├── text: Welcome
              └── font-size: 16px

    The Render Tree contains:

      Visible elements only
      Their content
      Their computed styles


5.Event Bubbling - Event bubbling is a mechanism in the browser where an event that occurs on a child 
                   element automatically propagates (bubbles up) through its parent elements, all the way up to the document.

    Example

   HTML:

      <div id="parent">
        <button id="child">Click Me</button>
      </div>

    JavaScript:

          document.getElementById("parent").addEventListener("click", () => {
                console.log("Parent clicked");
            });

          document.getElementById("child").addEventListener("click", () => {
                console.log("Button clicked");
           });

           When you click the button, the output is:

     Button clicked
      Parent clicked
     Why?

       The click happens on the button first, then bubbles upward:

      button
         ↑
     div#parent
         ↑
        body
         ↑
        html
         ↑
      document



6.Event Capturing - Event capturing is the phase of event propagation in which an event travels from the root 
                    of the DOM (document) down to the target element before the target and bubbling phases occur. 
                    A listener participates in this phase when it is registered with { capture: true } (or true as the third argument to addEventListener).
            By Default, Listeners Use Bubbling
            Listening During Capture Phase
            Pass true as the third argument (or use { capture: true }):


7.Event Delegation - Event delegation is a technique where you attach a single event listener to a parent 
                     element instead of attaching listeners to multiple child elements. It works because of event bubbling.
                     Event delegation is a pattern where a single event listener is attached to a parent element to handle events from its child elements. It relies on event bubbling and uses event.target to identify which child triggered the event. This improves performance and automatically supports dynamically added elements