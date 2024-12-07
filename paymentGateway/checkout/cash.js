const { page } = require("playwright");

const PG_URL = "https://apitest.payu.in/public/#/*";

module.exports =  async function* ({page, bankcode}) {
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
      .getByText("Wallet", { exact: true })
      .click({
        timeout: 5000,
      });
    yield ["Clicked procced button", true, ""];
  } catch (e) {
    yield ["Clicked procced button", false, String(e)];
    return
  }

  try {
    await page.getByTestId(`item-${bankcode}`).click({
      timeout: 5000,
    });
    yield ["Selected ${bankcode} from the Wallet list", true, ""];
  } catch (e) {
    yield ["Selected ${bankcode} from the Wallet list", false, String(e)];
    return
  }

  try {
    await page.getByTestId(`item-${bankcode}`).getByRole('button', { name: 'PROCEED',  }).click({
      timeout: 5000,
    });
    yield ["Clicked procced button", true, ""];
  } catch (e) {
    yield ["Clicked procced button", false, String(e)];
    return
  }
}
