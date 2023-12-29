const { page } = require("playwright");

const PG_URL = "https://apitest.payu.in/public/#/*";
const SIM_URL = "https://pgsim01.payu.in/UPI-test-transaction/confirm/*";

module.exports =  async function* (page) {
  try {
    await page.waitForURL(PG_URL, {
      timeout: 10000,
    });
    yield ["UPI loader page loaded", true, ""];
  } catch (e) {
    yield ["UPI loader page loaded", false, String(e)];
    return;
  }

  try {
    await page
      .getByText("UPI", { exact: true })
      .click({
        timeout: 5000,
      });
    yield ["Credentials submitted", true, ""];
  } catch (e) {
    yield ["Credentials submitted", false, String(e)];
    return
  }

  try {
    await page.locator('#paymentRightBar').getByText('Enter Any UPI ID').click({
      timeout: 5000,
    });
    yield ["Credentials submitted", true, ""];
  } catch (e) {
    yield ["Credentials submitted", false, String(e)];
    return
  }

  try {
    await page.getByPlaceholder('Enter UPI ID').fill("9999999999@upi",{
      timeout: 5000,
    });
    yield ["VPA entered submitted", true, ""];
  } catch (e) {
    yield ["VPA entered submitted", false, String(e)];
    return
  }

  try {
    await page.getByRole('button', { name: 'Verify' }).click({
      timeout: 5000,
    });
    yield ["Credentials submitted", true, ""];
  } catch (e) {
    yield ["Credentials submitted", false, String(e)];
    return
  }

  try {
    await page.getByRole('button', { name: 'PROCEED' }).click({
      timeout: 5000,
    });
    yield ["Credentials submitted", true, ""];
  } catch (e) {
    yield ["Credentials submitted", false, String(e)];
    return
  }
}
