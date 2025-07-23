```mermaid
sequenceDiagram
    participant browser
    participant server

    browser->>server: user input in the 'form element' sent to server through HTTP POST request
    Data is sent as the body of the POST request.
    activate server
    The server creates a new note object, and adds it to an array called notes.
    server-->>browser: HTTP status code 302: URL redirect instructions
    deactivate server

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
    server-->>browser: [{ "content": "HTML is easy", "date": "2023-1-1" }, ... ]
    deactivate server

    Note right of browser: The browser executes the callback function that renders the notes
