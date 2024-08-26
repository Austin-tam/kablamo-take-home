# kablamo-take-home

This repo is for Kablamo's take-home assessment to create a lightweight API testing framework. The test cases that were implemented in this repo are as follows:

| Test Case | Test steps | Expected Result |
| :-----:	|	:-----: |	:-----: | 
| Should successfully retrieve forex conversion rate for: <br> CAD to AUD <br> USD to CAD <br> CAD to JPY | 1. Hit the endpoint with valid parameters <br> 2. Check status code and validate success schema | Status code should be 200 and schema should validate to true |
| Should return error if Forex series not found or not available | 1. Hit the endpoint with an invalid Forex series <br> 2. Check status code and validate error schema | Status code should be 404 and schema should validate to true |
| Should return error if recent weeks is not numeric | 1. Hit the endpoint with recent weeks changed to "a" <br> 2. Check status code and validate error schema | Status code should be 400 and schema should validate to true |
| Should return error if API endpoint url is incorrect | 1. Hit the endpoint with an incorrect url <br> 2. Check status code and validate error schema | Status code should be 404 and schema should validate to true |


# How To Run Tests And Reporting
To run the tests, go into the <code>kablamo</code> directory in terminal and run the command <code>npx playwright tests</code>. The tests should run and the output of the test run should be saved into <code>kablamo-take-home\kablamo\test-results\.last-run.json</code>.

To show an HTML report of the tests, after running the above command, in the same directory, run <code>npx playwright show-report</code>. This will open a new page in your browser with the HTML report of the tests that ran, which tests were successful, and any that failed.

# Observations And Additional Steps
A quick observation from this assessment is that the API is very minimal and not complex, only having GET endpoints and no other types of endpoints such as PUT or POST or DELETE. <br><br>
An additional step that could be done to further test the API is to add custom headers to test if the API is robust enough to handle different scenarios such as correct/incorrect authorzation if applicable, correct/incorrect tokens if applicable, varying content-types, etc. <br><br>
Another potential next step for this framework would be to implement it into a CI/CD pipeline such as Github Actions. That way the tests will be automated and could be configured to run against each new change introduced to the API to ensure correct behaviour.
