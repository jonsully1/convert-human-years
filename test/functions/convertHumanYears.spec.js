/* eslint-disable no-undef */
const { expect } = require('chai');
const LambdaTester = require('lambda-tester');
const handler = require('../../handler');

describe('endpoint convertHumanYears returns 500 error', () => {
  it('humanYears is required', () => LambdaTester(handler.convertHumanYears)
    .event({ body: JSON.stringify({}) })
    .expectResult((result) => {
      expect(result.statusCode).to.equal(500);
      const body = JSON.parse(result.body);
      expect(body).to.equal('humanYears is required');
    }));

  it('humanYears must be an integer', () => LambdaTester(handler.convertHumanYears)
    .event({ body: JSON.stringify({ humanYears: '' }) })
    .expectResult((result) => {
      expect(result.statusCode).to.equal(500);
      const body = JSON.parse(result.body);
      expect(body).to.equal('humanYears must be an integer');
    }));

  it('humanYears must be greater than 0', () => LambdaTester(handler.convertHumanYears)
    .event({ body: JSON.stringify({ humanYears: 0 }) })
    .expectResult((result) => {
      expect(result.statusCode).to.equal(500);
      const body = JSON.parse(result.body);
      expect(body).to.equal('humanYears must be greater than 0');
    }));
});

describe('endpoint convertHumanYears returns 200 success', () => {
  it('returns humanYears 1, catYears 15 and dogYears 15', () => LambdaTester(handler.convertHumanYears)
    .event({ body: JSON.stringify({ humanYears: 1 }) })
    .expectResult((result) => {
      expect(result.statusCode).to.equal(200);
      const { humanYears, catYears, dogYears } = JSON.parse(result.body);
      expect(humanYears).to.equal(1);
      expect(catYears).to.equal(15);
      expect(dogYears).to.equal(15);
    }));

  it('returns humanYears 2, catYears 24 and dogYears 24', () => LambdaTester(handler.convertHumanYears)
    .event({ body: JSON.stringify({ humanYears: 2 }) })
    .expectResult((result) => {
      expect(result.statusCode).to.equal(200);
      const { humanYears, catYears, dogYears } = JSON.parse(result.body);
      expect(humanYears).to.equal(2);
      expect(catYears).to.equal(24);
      expect(dogYears).to.equal(24);
    }));

  it('returns humanYears 3, catYears 28 and dogYears 29', () => LambdaTester(handler.convertHumanYears)
    .event({ body: JSON.stringify({ humanYears: 3 }) })
    .expectResult((result) => {
      expect(result.statusCode).to.equal(200);
      const { humanYears, catYears, dogYears } = JSON.parse(result.body);
      expect(humanYears).to.equal(3);
      expect(catYears).to.equal(28);
      expect(dogYears).to.equal(29);
    }));

  it('returns humanYears 100, catYears 416 and dogYears 514', () => LambdaTester(handler.convertHumanYears)
    .event({ body: JSON.stringify({ humanYears: 100 }) })
    .expectResult((result) => {
      expect(result.statusCode).to.equal(200);
      const { humanYears, catYears, dogYears } = JSON.parse(result.body);
      expect(humanYears).to.equal(100);
      expect(catYears).to.equal(416);
      expect(dogYears).to.equal(514);
    }));
});
