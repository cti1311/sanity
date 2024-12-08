const testResult = require("../../utils/testResult");

const PG_URL = "https://pgsim01.payu.in/initiate";
const SIM_URL = "https://pgsim01.payu.in/authenticateCard";

module.exports = async function* (page) {
  // PG page load
  try {
    await page.waitForURL(PG_URL, {
      timeout: 3000,
    });
    yield ["PG page loaded", true, ""]
  } catch (e) {
    yield ["PG page loaded", false, String(e)]
    return;
  }

  // OTP submission
  try {
    await page.locator('//*[@id="OTP"]').fill("123456", {
      timeout: 1000,
    });
    await page.locator('//*[@id="submit"]').click({
      timeout: 1000,
    });
    yield ["OTP submitted", true, ""]
  } catch (e) {
    yield ["OTP submitted", false, String(e)];
    return;
  }

  // Simulator page load
  try {
    await page.waitForURL(SIM_URL, {
      timeout: 3000,
    });
    yield ["Simulator page loaded", true, ""]
  } catch (e) {
    yield ["Simulator page loaded", false, String(e)];
    return;
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
    yield ["Simulated success response", true, ""]
  } catch (e) {
    yield ["Simulated success response", false, String(e)];
    return;
  }
};
