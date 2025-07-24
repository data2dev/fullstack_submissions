```mermaid
sequenceDiagram
    participant browser
    participant server

    browser->>server: user input in the 'form element' sent to server through HTTP POST request
    Note right of browser: The browser sends the Data as the body of the POST request.
    activate server
    server-->>browser: HTTP status code 302: URL redirect instructions
    deactivate server

    Note left of server: The server creates a new note object, and adds the data to an array called notes.

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes (reload)
    activate server
    server-->>browser: HTML document
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css (reload)
    activate server
    server-->>browser: the css file
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js (reload)
    activate server
    server-->>browser: the JavaScript file
    deactivate server

    Note right of browser: The browser starts executing the JavaScript code that fetches the JSON from the server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser:
    deactivate server

    Note right of browser: The browser executes the callback function that renders the new  notes
