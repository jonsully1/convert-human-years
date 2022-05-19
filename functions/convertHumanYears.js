const Yup = require('yup');
const responses = require('../modules/jsonResponse');

const cat = {
  firstYear: 15,
  secondYear: 9,
  older: 4,
};

const dog = {
  firstYear: 15,
  secondYear: 9,
  older: 5,
};

const schema = Yup.object({
  humanYears: Yup.number()
    .typeError('humanYears must be an integer')
    .required('humanYears is required')
    .min(1, 'humanYears must be greater than 0'),
});

module.exports = async (event) => {
  const body = JSON.parse(event.body);
  const { humanYears } = body;

  let catYears = 0;
  let dogYears = 0;

  try {
    await schema.validate(body);
    switch (humanYears) {
      case 1:
        catYears = cat.firstYear;
        dogYears = dog.firstYear;
        break;
      case 2:
        catYears = cat.firstYear + cat.secondYear;
        dogYears = dog.firstYear + dog.secondYear;
        break;
      default:
        catYears = cat.firstYear + cat.secondYear + ((humanYears - 2) * cat.older);
        dogYears = dog.firstYear + dog.secondYear + ((humanYears - 2) * dog.older);
        break;
    }

    return responses.status({
      humanYears,
      catYears,
      dogYears,
    }, 200);
  } catch (e) {
    return responses.status(e.message, 500);
  }
};
