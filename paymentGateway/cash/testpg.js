const testResult = require("../../utils/testResult");

const PG_URL = "https://pgsim01.payu.in/initiate";
const SIM_URL = "https://pgsim01.payu.in/authenticateCard";

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

  // OTP submission
  try {
    await page.locator('//*[@id="OTP"]').fill("123456", {
      timeout: 1000,
    });
    await page.locator('//*[@id="submit"]').click({
      timeout: 1000,
    });
    result.addStep("OTP submitted", true, "");
  } catch (e) {
    result.addStep("OTP submitted", false, String(e));
    return CleanUpAndReturn();
  }

  // Simulator page load
  try {
    await page.waitForURL(SIM_URL, {
      timeout: 3000,
    });
    result.addStep("Simulator page loaded", true);
  } catch (e) {
    result.addStep("Simulator page loaded", false, String(e));
    return CleanUpAndReturn();
  }

  // Simulate success response
  try {
    await page
      .locator(
        "xpath=/html/body/div/section/div/div/div[2]/div/form/div/div[1]/div/div/input"
      )
      .click({
        timeout: 3000,
      });
    result.addStep("Simulated success response", true, "");
  } catch (e) {
    result.addStep("Simulated success response", false, String(e));
    return CleanUpAndReturn();
  }

  return CleanUpAndReturn();
};
