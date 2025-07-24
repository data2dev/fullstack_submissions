```mermaid
sequenceDiagram
    participant browser
    participant server

    browser->>server: The POST request to the address new_note_spa contains the new note as JSON data
    Note right of browser: the JSON data sent contains the note and timestamp
    activate server
    server-->>browser: server responds with status code 201 created.
    deactivate server
