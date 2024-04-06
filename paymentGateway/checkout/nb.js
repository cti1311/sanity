const PG_URL = "https://apitest.payu.in/public/#/*";

module.exports =  async function* ({page, bankcode}) {
  try {
    await page.waitForURL(PG_URL, {
      timeout: 10000,
    });
    yield ["Checkout page loaded ( L1 ) page loaded", true, ""];
  } catch (e) {
    yield ["Checkout page loaded ( L1 ) page loaded", false, String(e)];
    return;
  }

  try {
    await page
      .getByText("Net Banking", { exact: true })
      .click({
        timeout: 5000,
      });
    yield ["Netbanking Checkout page loaded ( L2 )", true, ""];
  } catch (e) {
    yield ["Netbanking Checkout page loaded ( L2 )", false, String(e)];
    return
  }

  try {
    await page.getByTestId(`net-banking-list-item-${bankcode}`, { exact: true }).first().click({
      timeout: 5000,
    });
    yield [`Selected ${bankcode} from the Netbanking list`, true, ""];
  } catch (e) {
    yield [`Selected ${bankcode} from the Netbanking list`, false, String(e)];
    return
  }

  try {
    await page.getByRole('button', { name: 'PROCEED' }).click({
      timeout: 5000,
    });
    yield ["Clicked procced button", true, ""];
  } catch (e) {
    yield ["Clicked procced button", false, String(e)];
    return
  }
}
