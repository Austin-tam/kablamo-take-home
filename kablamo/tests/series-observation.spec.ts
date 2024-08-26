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
      const validate = ajv.compile(require('./series-observation-success.schema.json'))
      const validRes = validate(response.json())

      expect(response.status()).toEqual(200)
      expect(validRes).toBe(true)
    })
  });

  test('should return error if Forex series not found or not available', async ({ request }) => {
    const response = await (request.get('observations/FXUSDAUD/json?recent_weeks=10'))
    const validate = ajv.compile(require('./series-observation-error.schema.json'))
    const validRes = validate(response.json())

    expect(response.status()).toEqual(404)
    expect(validRes).toBe(true)
  });

  test('should return error if recent weeks is not numeric', async ({ request }) => {
    const response = await (request.get('observations/FXCADAUD/json?recent_weeks=a'))
    const validate = ajv.compile(require('./series-observation-error.schema.json'))
    const validRes = validate(response.json())

    expect(response.status()).toEqual(400)
    expect(validRes).toBe(true)
  })

  test('should return error if API endpoint url is incorrect', async ({ request }) => {
    const response = await (request.get('observations'))
    const validate = ajv.compile(require('./series-observation-error.schema.json'))
    const validRes = validate(response.json())

    expect(response.status()).toEqual(404)
    expect(validRes).toBe(true)
  })
})