const page = require('../../page');
const helper = require('../../helper')

describe('Create an order', () => {
    it('should set the address', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        await expect($(page.fromField)).toHaveValue('East 2nd Street, 601');
        await expect($(page.toField)).toHaveValue('1300 1st St');

    })
    it('should select the supportive plan', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const supportivePlanButton = await page.supportivePlanSelect();
        await expect(supportivePlanButton.parentElement()).toHaveElementClass('active');
    })

    it('should fill in the phone number', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const phoneNumber = helper.getPhoneNumber('+1');
        await page.submitPhoneNumber(phoneNumber);
        await expect(await $(`div=${phoneNumber.toString()}`)).toBeExisting(); 
    })

    it('should add a credit card and cvv code', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        await page.fillCardNumber('1234 5678 9101');
        await page.fillCvvCode('15');
        await expect(await $(`${page.paymentMethodAddedCard}`)).toBeExisting();
    })

    it('should write a message for the driver', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const messageForDriverField = await $(page.messageForDriverField);
        await messageForDriverField.waitForDisplayed();
        await messageForDriverField.scrollIntoView();
        await messageForDriverField.setValue('Please text me upon arrival');
        await expect(await messageForDriverField).toBeExisting();
    })

    it('should order a blanket and handkerchiefs', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const supportivePlanButton = await $(page.supportivePlanButton);
        await supportivePlanButton.waitForDisplayed();
        await supportivePlanButton.click();
        const blanketAndHandkerchiefsButton = await $(page.blanketAndHandkerchiefsButton);
        await blanketAndHandkerchiefsButton.waitForDisplayed();
        await blanketAndHandkerchiefsButton.click();
        // eslint-disable-next-line wdio/no-pause
        await browser.pause(5000);
        await expect($(page.blanketSwitch)).toBeChecked();
    })

    it('should order 2 ice creams', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const supportivePlanButton = await $(page.supportivePlanButton);
        await supportivePlanButton.waitForDisplayed();
        await supportivePlanButton.click();
        const iceCreamAddButton = await $(page.iceCreamAddButton);
        await iceCreamAddButton.scrollIntoView();
        await iceCreamAddButton.click();
        await iceCreamAddButton.click();
        const iceCreamQty = 2;
        await expect($(`div=${iceCreamQty}`)).toBeExisting();
    })

    it('should make the car search modal appear', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const phoneNumber = helper.getPhoneNumber('+1');
        await page.submitPhoneNumber(phoneNumber);
        await page.fillCardNumber('1234 5678 9101');
        await page.fillCvvCode('15');
        const messageForDriverField = await $(page.messageForDriverField);
        await messageForDriverField.waitForDisplayed();
        await messageForDriverField.scrollIntoView();
        await messageForDriverField.setValue('Please text me upon arrival');
        const orderButton = await $(page.orderButton);
        await orderButton.waitForDisplayed();
        await orderButton.click();
        const carSearchModal = await $(page.carSearchModal);
        await carSearchModal.waitForDisplayed();
        await expect(carSearchModal).toBeExisting();
    })

})