module.exports = {
    // Inputs
    fromField: '#from',
    toField: '#to',
    phoneNumberField: '#phone',
    codeField: '#code',
    cardNumberField: '#number.card-input',
    cvvCodeField: '#code.card-input', 
    messageForDriverField: '#comment',
    iceCreamValue: '.counter-value',
    // Buttons
    callATaxiButton: 'button=Call a taxi',
    phoneNumberButton: '//div[starts-with(text(), "Phone number")]',
    nextButton: 'button=Next',
    confirmButton: 'button=Confirm',
    supportivePlanButton: 'div=Supportive',
    linkButton: 'button=Link',
    paymentMethodButton: '.pp-text',
    addCardButton: 'div=Add card',
    closePaymentMethodModalButton: '.payment-picker .section.active .close-button',
    paymentMethodAddedCard: 'div=Card',
    blanketAndHandkerchiefsButton: '.r-sw',
    blanketSwitch: '.switch-input',
    iceCreamAddButton: 'div=+',
    orderButton: '.smart-button',
    // Modals
    phoneNumberModal: '.modal',
    paymentMethodModal: '.payment-picker.modal',
    carSearchModal: '.order-header-content',
    // Functions
    fillAddresses: async function(from, to) {
        const fromField = await $(this.fromField);
        await fromField.setValue(from);
        const toField = await $(this.toField);
        await toField.setValue(to);
        const callATaxiButton = await $(this.callATaxiButton);
        await callATaxiButton.waitForDisplayed();
        await callATaxiButton.click();
    },
    fillPhoneNumber: async function(phoneNumber) {
        const phoneNumberButton = await $(this.phoneNumberButton);
        await phoneNumberButton.waitForDisplayed();
        await phoneNumberButton.click();
        const phoneNumberModal = await $(this.phoneNumberModal);
        await phoneNumberModal.waitForDisplayed()
        const phoneNumberField = await $(this.phoneNumberField);
        await phoneNumberField.waitForDisplayed();
        await phoneNumberField.setValue(phoneNumber);
    },
    submitPhoneNumber: async function(phoneNumber) {
        await this.fillPhoneNumber(phoneNumber);
        // we are starting interception of request from the moment of method call
        await browser.setupInterceptor();
        await $(this.nextButton).click();
        // we should wait for response
        // eslint-disable-next-line wdio/no-pause
        await browser.pause(2000);
        const codeField = await $(this.codeField);
        // collect all responses
        const requests = await browser.getRequests();
        // use first response
        await expect(requests.length).toBe(1)
        const code = await requests[0].response.body.code
        await codeField.setValue(code)
        await $(this.confirmButton).click()
    },
    supportivePlanSelect: async function() {
        const supportivePlanButton = await $(this.supportivePlanButton);
        await supportivePlanButton.waitForDisplayed();
        supportivePlanButton.click();
        return supportivePlanButton;
    },
    fillCardNumber: async function (cardNumber) {
        const paymentMethodButton = await $(this.paymentMethodButton);
        await paymentMethodButton.waitForDisplayed();
        await paymentMethodButton.click();
        //const paymentMethodModal = await $(this.paymentMethodModal);
        //await paymentMethodModal.waitForDisplayed();
        const addCardButton = await $(this.addCardButton)
        await addCardButton.waitForDisplayed();
        await addCardButton.click();
        const cardNumberField = await $(this.cardNumberField);
        await cardNumberField.click();
        await cardNumberField.setValue(cardNumber);
    },

    fillCvvCode: async function (cvvCode) {
        const cvvCodeField = await $(this.cvvCodeField);
        await cvvCodeField.waitForDisplayed();
        await cvvCodeField.setValue(cvvCode);
        await browser.keys('Tab');
        const linkButton = await $(this.linkButton);
        await linkButton.waitForDisplayed();
        await expect(linkButton).not.toHaveElementClass('disabled'); //got rid of .ParentElement after linkButton, check again later
        await linkButton.click();
        const closePaymentMethodModalButton = await $(this.closePaymentMethodModalButton);
        await closePaymentMethodModalButton.waitForDisplayed();
        await closePaymentMethodModalButton.click();
    },

    fillMessageForDriver: async function(message) {
        const messageForDriverField = await $(this.messageForDriverField);
        await messageForDriverField.waitForDisplayed();
        await messageForDriverField.scrollIntoView();
        await messageForDriverField.setValue(message);
    }
};