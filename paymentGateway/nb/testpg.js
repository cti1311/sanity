const testResult = require("../../utils/testResult");

const PG_URL = "https://apitest.payu.in/public/#/*/upiLoader";
const SIM_URL = "https://pgsim01.payu.in/UPI-test-transaction/confirm/*";

module.exports = async (page) => {

  let result = testResult();
  // Cleanup function
  function CleanUpAndReturn() {
    result.stopTimer();
    return result;
  }

  // start the timer
  result.startTimer();

  // PG page load
  try {
    await page.waitForURL(PG_URL, {
      timeout: 3000,
    });
    result.addStep("PG page loaded", true);
  } catch (e) {
    result.addStep("PG page loaded", false, String(e));
    return CleanUpAndReturn();
  }

  // Credentials submission
  try {
    await page.locator('//*[@id="app"]/div[1]/div[1]/div[3]/p/a').click({
      timeout: 1000,
    });
    result.addStep("Credentials submitted", true, "");
  } catch (e) {
    result.addStep("Credentials submitted", false, String(e));
    return CleanUpAndReturn();
  }

  // Simulate success response
  try {

    result.addStep("Simulated success response", true, "");
  } catch (e) {
    result.addStep("Simulated success response", false, String(e));
    return CleanUpAndReturn();
  }

  return CleanUpAndReturn();
};
