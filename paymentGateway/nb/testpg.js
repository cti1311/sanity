const testResult = require("../../utils/testResult");

const PG_URL = "https://pgsim01.payu.in/initiate";
const SIM_URL = "https://pgsim01.payu.in/authenticateNetBank";

module.exports = async function* (page, context) {
  // PG page load
  try {
    await page.waitForURL(PG_URL, {
      timeout: 5000,
    });
    yield ["PG page loaded", true,""];
  } catch (e) {
    yield ["PG page loaded", false, String(e)];
    return;
  }

  // Credentials submission
  try {
    await page.getByPlaceholder('Enter payu as username').fill('payu',{
      timeout: 1000,
    });
    await page.getByPlaceholder('Enter payu as password').fill('payu',{
      timeout: 1000,
    });
    // // console.log(await page.getByPlaceholder('Enter payu as username').inputValue());
    // // console.log(await page.getByPlaceholder('Enter payu as password').inputValue());
    // await new Promise(res=>(setTimeout((res)=>{// console.log("sddf")},10000)))
    // page.on('request', request => // console.log('>>', request.method(), request.url(), request.postData()));
// page.on('response', response => // console.log('<<', response.status(), response.url(), response.body().then((res=>// console.log(res)))));
    await page.getByRole('button', { name: 'Submit' }).click({
      timeout: 3000,
    });
    
    yield ["Credentials submitted", true, ""];
  } catch (e) {
    yield ["Credentials submitted", false, String(e)];
    return;
  }

  // Open simulator page
  try {
    page.waitForURL(SIM_URL,{
      timeout: 30000
    })
    await page.waitForResponse('**/jquery.min.js');
    yield ["Simulated page loaded", true, ""];
  } catch (e) {
    yield ["Simulated page loaded", false, String(e)];
    return;
  }

  try {
    await page.getByRole('button', { name: 'Simulate Success Response' }).click({
      timeout: 5000,
    });
    yield ["Simulate Success Response", true, ""];
  } catch (e) {
    yield ["Simulate Success Response", false, String(e)];
    return;
  }
};
