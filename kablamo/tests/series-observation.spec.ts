import { test, expect } from '@playwright/test'
import Ajv from 'ajv'

const CONVERTFROM = 'CAD'
const CONVERTTO = 'AUD'

test.describe('Series by observation tests', () => {
  const ajv = new Ajv()

  test('should successfully retrieve Forex conversion rate "CAD to AUD" for the recent 10 weeks using observations by Series', async ({ request }) => {
    const response = await (request.get(`observations/FX${CONVERTFROM}${CONVERTTO}/json?recent_weeks=10`))
    const validate = ajv.validate(require('./series-observation-success.schema.json'), response.body())

    expect(response.status()).toEqual(200)
    expect(validate).toBe(true)
  })

  test('should return error if Forex series not found or not available', async ({ request }) => {
    const response = await (request.get(`observations/FXUSDAUD/json?recent_weeks=10`))
    const validate = ajv.validate(require('./series-observation-error.schema.json'), response.body())

    expect(response.status()).toEqual(404)
    expect(validate).toBe(true)
  })
})