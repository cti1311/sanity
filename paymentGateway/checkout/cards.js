const PG_URL = "https://apitest.payu.in/public/#/*";

module.exports =  async function* ({page, bankcode, payload}) {
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
      .getByText('Cards (Credit/Debit)')
      .click({
        timeout: 5000,
      });
    yield ["Credentials submitted", true, ""];
  } catch (e) {
    yield ["Credentials submitted", false, String(e)];
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
    yield ["Credentials submitted", true, ""];
  } catch (e) {
    yield ["Credentials submitted", false, String(e)];
    return
  }

  try {
    // await new Promise(res => {setTimeout(()=>{// console.log("timeout")},10000)})
    await page.getByRole('button', { name: 'PROCEED' }).click({
      timeout: 5000,
    });
    yield ["Credentials submitted", true, ""];
  } catch (e) {
    yield ["Credentials submitted", false, String(e)];
    return
  }

  try { 
    await page.getByTestId('closeWithoutSave').click({
      timeout: 5000,
    });
    yield ["Credentials submitted", true, ""];
  } catch (e) {
    yield ["Credentials submitted", true, String(e)];
    return
  }
}
