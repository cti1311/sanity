const { page } = require("playwright");

const PG_URL = "https://apitest.payu.in/public/#/*";

module.exports =  async function* ({page, bankcode}) {
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
      .getByText("Wallet", { exact: true })
      .click({
        timeout: 5000,
      });
    yield ["Credentials submitted", true, ""];
  } catch (e) {
    yield ["Credentials submitted", false, String(e)];
    return
  }

  try {
    await page.getByTestId(`item-${bankcode}`).click({
      timeout: 5000,
    });
    yield ["Wallet selected", true, ""];
  } catch (e) {
    yield ["Wallet selected", false, String(e)];
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
