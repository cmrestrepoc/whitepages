# Whitepages App

## Objective

Create a simple app that initially shows a list (optionally lazily-loaded) of people (see `list_view.png`) and opens a modal dialog with details when a list item is tapped (see `modal_view.png`). Tapping the modal dialog anywhere should close it. Font sizes, colors, padding, margin, and positioning can all be approximate. Padding and margin should not be absent.

Within this sandbox, you can add dependencies and use them as if you were working locally and installing NPM packages.

All of your code should be added to the `/src` folder; you should not need to change anything outside of the `/src` folder.

You will submit this project once you have completed the objective, and during your interview with Whitepages, you will be asked to add a feature to it as a live-coding session with the interviewer.

## API

We have provided an API for you to use and have added it to the project. It will fail about 10% of the time; please make sure you handle errors gracefully when it fails!

The API has the following methods:

- `getList({ number, offset })` - returns a promise, which when successful resolves with an array of objects (id:string, first_name:string, and last_name:string); `number` is the number of entries to return, and `offset` is the position to start with (for example, getList({ number: 10, offset: 0 }) would return the first 10 entries) - defaults to number of 30, and offset of 0
- `get(id)` - returns a promise, which when successful resolves with a person object (id:string, first_name:string, last_name:string, email:string, phone:string, address1: string, city:string, state:string, and zip_code: string)
