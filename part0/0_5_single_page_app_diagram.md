```mermaid
sequenceDiagram
    participant browser
    participant server

    browser->>server: get HTML page request

    activate server
    server-->>browser: HTML page fetched from the server
    deactivate server

    Note right of browser: HTML content manipulated with JavaScript that executes in the browser
