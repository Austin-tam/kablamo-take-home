import { test, expect } from '@playwright/test'
import Ajv from 'ajv'

test.describe('Series by observation tests', () => {
  const ajv = new Ajv();

  [
    { convertFrom: 'CAD', convertTo: 'AUD' },
    { convertFrom: 'USD', convertTo: 'CAD' },
    { convertFrom: 'CAD', convertTo: 'JPY' },
  ].forEach(({convertFrom, convertTo}) => {
    test(`should successfully retrieve Forex conversion rate "${convertFrom} to ${convertTo}" for the recent 10 weeks using observations by Series`, async ({ request }) => {
      const response = await (request.get(`observations/FX${convertFrom}${convertTo}/json?recent_weeks=10`))
      const validate = ajv.validate(require('./series-observation-success.schema.json'), response.body())

      expect(response.status()).toEqual(200)
      expect(validate).toBe(true)
    })
  });

  test('should return error if Forex series not found or not available', async ({ request }) => {
    const response = await (request.get('observations/FXUSDAUD/json?recent_weeks=10'))
    const validate = ajv.validate(require('./series-observation-error.schema.json'), response.body())

    expect(response.status()).toEqual(404)
    expect(validate).toBe(true)
  });

  test('should return error if recent weeks is not numeric', async ({ request }) => {
    const response = await (request.get('observations/FXCADAUD/json?recent_weeks=a'))
    const validate = ajv.validate(require('./series-observation-error.schema.json'), response.body())

    expect(response.status()).toEqual(400)
    expect(validate).toBe(true)
  })
})