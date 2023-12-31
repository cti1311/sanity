const testResult = require("../../utils/testResult");

const PG_URL = "https://acssimuat.payubiz.in/pg/Cyber3DS/home";
const SIM_URL = "https://pgsim01.payu.in/authenticateCard";

module.exports = async function* (page,context) {
  // PG page load
  try {
    await page.waitForURL(PG_URL, {
      timeout: 5000,
    });
    yield ["PG page loaded", true, ""]
  } catch (e) {
    yield ["PG page loaded", false, String(e)]
    return;
  }

  // OTP submission
  try {
    await page.locator('//*[@id="password"]').fill("123456", {
      timeout: 1000,
    });
    await page.locator('//*[@id="submitBtn"]').click({
      timeout: 1000,
    });
    yield ["OTP submitted", true, ""]
  } catch (e) {
    yield ["OTP submitted", false, String(e)];
    return;
  }
};
