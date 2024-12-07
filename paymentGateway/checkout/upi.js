const { page } = require("playwright");

const PG_URL = "https://apitest.payu.in/public/#/*";
const SIM_URL = "https://pgsim01.payu.in/UPI-test-transaction/confirm/*";

module.exports = async function* ({ page, bankcode }) {
  try {
    await page.waitForURL(PG_URL, {
      timeout: 10000,
    });
    // await page.waitForLoadState("networkidle")
    try {
      await page.getByText("Show all options").click({
        timeout: 3000,
      });
    } catch {}
    yield ["Checkout page loaded ( L1 )", true, ""];
  } catch (e) {
    yield ["Checkout page loaded ( L1 )", false, String(e)];
    return;
  }

  try {
    await page.getByText("UPI", { exact: true }).click({
      timeout: 5000,
    });
    yield ["Clicked procced button", true, ""];
  } catch (e) {
    yield ["Clicked procced button", false, String(e)];
    return;
  }

  try {
    await page.locator("#paymentRightBar").getByText("Enter Any UPI ID").click({
      timeout: 5000,
    });
    yield ["Clicked procced button", true, ""];
  } catch (e) {
    yield ["Clicked procced button", false, String(e)];
    return;
  }

  try {
    await page.getByPlaceholder("Enter UPI ID").fill("9999999999@upi", {
      timeout: 5000,
    });
    yield ["VPA submitted", true, ""];
  } catch (e) {
    yield ["VPA submitted", false, String(e)];
    return;
  }

  try {
    await page.getByRole("button", { name: "Verify" }).click({
      timeout: 5000,
    });
    yield ["VPA validated", true, ""];
  } catch (e) {
    yield ["VPA validated", false, String(e)];
    return;
  }

  try {
    await page.getByRole("button", { name: "PROCEED" }).click({
      timeout: 5000,
    });
    yield ["Clicked procced button", true, ""];
  } catch (e) {
    yield ["Clicked procced button", false, String(e)];
    return;
  }
};
