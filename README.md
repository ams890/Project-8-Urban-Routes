# SPRINT 8 PROJECT | Urban Routes Web App

## PROJECT DESCRIPTION
In this project, I am testing different functionalities for the Urban Routes application. I am using 

## TECHNOLOGIES USED
For this project I've used the following technologies:
- GitHub - to set up and clone the repository, and commit changes
- VS Code - to write the JavaScript tests, run them in the Terminal emulator and evaluate the results
- Tripleten's remote server for Urban Routes - to connect the API endpoints for running our tests
- WebDriverIO (ChromeDriver)
- Chrome Browser
- Chrome DevTools, especially the Elements and Network panels

## TECHNIQUES USED
These tests (createAnOrder.e2e.js) were written using the Mocha framework and the "describe" and "it" functions to walk through all the steps of ordering a taxi on Urban Routes. To write these tests in JavaScript, I leaned on the use of JS modules to organize my code. 

In the page.js file, you will find all the CSS selectors and XPath locators I used within my functions and tests. These were chosen based on different page elements needed for the tests, and filled out by manually inspecting them in Chrome DevTools. You'll also see I created functions within page.js to eliminate redundant or repetitive code in my tests. 

In the helper.js file, you'll see the JS module import functions that helped generate a random phoneNumber and getElementByText. 

## TEST INSTRUCTIONS
Follow these steps to run each test.

Pre-conditions:
- Start the server to make sure it is active
- Copy/paste the server URL into the baseURL of the wdio.config.js file (line 31)

1) In Visual Studio code, open a new Terminal window
2) In terminal, navigate to the correct folder by typing the command and pressing Return:
    cd hm08-qa-us
3) To run the tests, type the following command and pressing Return:
    npm run wdio
