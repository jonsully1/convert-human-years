# Serverless Developer - Code War

## User story

- As An API user
- I want To get dogs and cats ages relative to human years
- So that I am able to convert easily the ages of my pets

## Technical Criteria
When I provide an integer >= 1 representing human years to an api
endpoint, I must receive an object in the following format:

```
{
  humanYears: integer,
  catYears: integer,
  dogYears: integer
}
```
The conversion works as follows:

### Cat Years
- 15 cat years for first year
- +9 cat years for second year
- +4 cat years for each year after that

### Dog Years
- 15 dog years for first year
- +9 dog years for second year
- +5 dog years for each year after that

## Unit Testing

We need to write unit tests for Lambda code exceeding 90% code coverage to ensure consistency and prevent breaking existing code.

There is a process to follow when setting up, writing and executing unit tests.

## Packages for unit testing
- mocha
- chai
- nyc
- lambda-tester
- sinon

These packages should be installed as devDependencies (see package.json)

## Local environment setup for unit testing

You will need to:
- install your dependancies

```
yarn i
```
## Unit Test File Structure
- All endpoint tests are written in the file `test/functions/` with the .spec.js file name convention

in `test/test.js` we include our endpoint tests:

```
requireDir('./functions');
```

To pass a body into the Lambda call, you must put it in the event function, and stringify it in JSON: 
```
.event({
  body: JSON.stringify({
    humanYears: 1,
  }),
})
```

## Running Unit Tests

Run your tests using `yarn test` or `npm test`;

The code coverage breakdown will be displayed once it's complete. Any errors will be flagged in the terminal window.

Example:

```
~/dev/johno/serverless-developer-code-war2 (development ✗) yarn test
yarn run v1.22.17
warning package.json: No license field
$ nyc mocha --timeout 10000000 --exit


  endpoint convertHumanYears returns 500 error
    ✔ humanYears is required
    ✔ humanYears must be an integer
    ✔ humanYears must be greater than 0

  endpoint convertHumanYears returns 200 success
    ✔ returns humanYears 1, catYears 15 and dogYears 15
    ✔ returns humanYears 2, catYears 24 and dogYears 24
    ✔ returns humanYears 3, catYears 28 and dogYears 29
    ✔ returns humanYears 100, catYears 416 and dogYears 514


  7 passing (17ms)

------------------------------------------|---------|----------|---------|---------|-------------------
File                                      | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
------------------------------------------|---------|----------|---------|---------|-------------------
All files                                 |     100 |       80 |     100 |     100 |                   
 serverless-developer-code-war2           |     100 |      100 |     100 |     100 |                   
  handler.js                              |     100 |      100 |     100 |     100 |                   
 serverless-developer-code-war2/functions |     100 |       80 |     100 |     100 |                   
  convertHumanYears.js                    |     100 |       80 |     100 |     100 | 24                
------------------------------------------|---------|----------|---------|---------|-------------------
✨  Done in 0.96s.
```