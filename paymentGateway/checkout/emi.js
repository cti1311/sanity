const getMapping = require("../helper/emiBankCodeConverter");

const PG_URL = "https://apitest.payu.in/public/#/*";

module.exports = async function* ({ page, bankcode, payload }) {
  try {
    await page.waitForURL(PG_URL, {
      timeout: 10000,
    });
    yield ["Checkout page loaded ( L1 )", true, ""];
  } catch (e) {
    yield ["Checkout page loaded ( L1 )", false, String(e)];
    return;
  }

  try {
    await page
      .locator("css=.all-payment-options-wrapper")
      .getByText("EMI", { exact: true })
      .click({
        timeout: 5000,
      });
    yield ["EMI Checkout page loaded ( L2 )", true, ""];
  } catch (e) {
    yield ["EMI Checkout page loaded ( L2 )", false, String(e)];
    return;
  }

  try {
    await page.getByTestId("item-cc").click({
      timeout: 5000,
    });
    yield ["CC EMI Checkout page loaded", true, ""];
  } catch (e) {
    yield ["CC Checkout page loaded", false, String(e)];
    return;
  }

  try {
    await page.getByTestId(`item-${getMapping(bankcode)}`).click({
      timeout: 5000,
    });
    yield [`${bankcode} visible on checkout page`, true, ""];
  } catch (e) {
    yield [`${bankcode} visible on checkout page`, false, String(e)];
    return;
  }

  try {
    await page.getByTestId("cardNumber").fill(payload.ccnum, {
      timeout: 5000,
    });
    await page
      .getByTestId("cardExpiry")
      .fill(`${payload.ccexpmon}/${payload.ccexpyr.substring(2)}`, {
        timeout: 5000,
      });
    await page.getByTestId("cardCvv").fill(payload.ccvv, {
      timeout: 5000,
    });
    yield ["Card information filled", true, ""];
  } catch (e) {
    yield ["Card information filled", false, String(e)];
    return;
  }

  try {
    await page.locator(`input[type="radio"][value=${bankcode}]`).click({
      timeout: 3000,
    });
    yield ["Selected the tenure", true, ""];
  } catch (e) {
    yield ["Selected the tenure", false, String(e)];
    return;
  }

  try {
    // Wait and locate the first enabled "PROCEED" button
    const button = await page
      .getByRole("button", { name: "PROCEED" })
      .filter({
        hasNot: page.locator("[disabled]"),
      })
      .first()
      .click({ timeout: 5000 });
    yield ["Clicked proceed button", true, ""];
  } catch (e) {
    yield ["Clicked proceed button", false, String(e)];
    return;
  }
};
