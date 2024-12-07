const PG_URL = "https://apitest.payu.in/public/#/*";

module.exports =  async function* ({page, bankcode, payload}) {
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
      .getByText('Cards (Credit/Debit)')
      .click({
        timeout: 5000,
      });
    yield ["Cards Checkout page loaded ( L2 )", true, ""];
  } catch (e) {
    yield ["Cards Checkout page loaded ( L2 )", false, String(e)];
    return
  }
  
  try {
    await page.getByTestId('cardNumber').fill(payload.ccnum,{
      timeout: 5000,
    });
    await page.getByTestId('cardExpiry').fill(`${payload.ccexpmon}/${payload.ccexpyr.substring(2)}`,{
      timeout: 5000,
    });
    await page.getByTestId('cardCvv').fill(payload.ccvv,{
      timeout: 5000,
    });
    await page.getByTestId('cardOwnerName').fill(payload.ccname,{
      timeout: 5000,
    });
    yield ["Card information filled", true, ""];
  } catch (e) {
    yield ["Card information filled", false, String(e)];
    return
  }

  try {
    // await new Promise(res => {setTimeout(()=>{// console.log("timeout")},10000)})
    await page.getByRole('button', { name: 'PROCEED' }).click({
      timeout: 5000,
    });
    yield ["Clicked procced button", true, ""];
  } catch (e) {
    yield ["Clicked procced button", false, String(e)];
    return
  }

  try { 
    await page.getByTestId('closeWithoutSave').click({
      timeout: 5000,
    });
    yield ["Checking for tokenization nudge", true, ""];
  } catch (e) {
    yield ["Checking for tokenization nudge", true, ""];
    return
  }
}
