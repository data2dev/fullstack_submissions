```mermaid
sequenceDiagram
    participant browser
    participant server

    browser->>server: get HTML page request
    Note right of browser: The browser sends the Data as the body of the POST request.
    activate server
    server-->>browser: HTML page fetched from the server
    deactivate server

    Note right of browser: HTML content manipulated with JavaScript that executes in the browser
