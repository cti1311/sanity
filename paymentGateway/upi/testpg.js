const PG_URL = "https://apitest.payu.in/public/#/*/upiLoader";
const SIM_URL = "https://pgsim01.payu.in/UPI-test-transaction/confirm/*";

module.exports = async function* (page, context) {
  // PG page load
  try {
    await page.waitForURL(PG_URL, {
      timeout: 3000,
    });
    yield ["UPI loader page loaded", true, ""];
  } catch (e) {
    yield ["UPI loader page loaded", false, String(e)];
    return;
  }
  const pagePromise = context.waitForEvent("page");

  // Credentials submission
  try {
    await page.locator('//*[@id="app"]/div[1]/div[1]/div[3]/p/a').click({
      timeout: 1000,
    });
    yield ["Clicked on simulate button", true, ""];
  } catch (e) {
    yield ["Clicked on simulate button", false, String(e)];
    return;
  }

  const page1 = await pagePromise;

  try {
    await page1
      .locator('//*[@id="authenticate"]')
      .click({
        timeout: 1000,
      })
      // await new Promise(res => {setTimeout(()=>{// console.log("timeout")},10000)})
    await page1
      .locator('//*[@id="upiPopupBtn"]')
      .click({
        timeout: 1000,
      })
      // await new Promise(res => {setTimeout(()=>{// console.log("timeout")},10000)})
      await page1.close();
  
    yield ["Simulator page loaded", true, ""];
  } catch (e) {
    await page1.close();
    yield ["Simulator page loaded", false, String(e)];
    return;
  }
};
