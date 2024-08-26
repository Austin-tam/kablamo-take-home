import { test, expect } from '@playwright/test';
const CONVERTFROM = 'CAD';
const CONVERTTO = 'AUD';

test('should successfully retrieve Forex conversion rate "CAD to AUD" for the recent 10 weeks using observations by Series', async ({ request }) => {
  const response = await (request.get(`observations/FX${CONVERTFROM}${CONVERTTO}/json?recent_weeks=10`))

  
})

test('should return error if Forex series not found or not available', async ({ request }) => {
  const response = await (request.get(`observations/FXUSDAUD/json?recent_weeks=10`))

  expect(response.status()).toEqual(404)
})