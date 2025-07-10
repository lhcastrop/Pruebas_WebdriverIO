import { Given, When, Then } from '@wdio/cucumber-framework';
import LoginPage from '../pageobjects/login.page.js';
import CheckStatePage from '../pageobjects/checkState.page.js';
import TransferPage from '../pageobjects/transfer.page.js';

const pages = {
  login: LoginPage,
  checkState: CheckStatePage,
  transfer: TransferPage
};

Given(/^I am on the (\w+) page$/, async (page) => {
  await pages[page].open();
});

//LOGIN
When(/^I login with (\w+) and (.+)$/, async (username, password) => {
  await LoginPage.login(username, password);
});

Then(/^I should see a text saying (.*)$/, async (message) => {
  if (message == "Invalid") {
    // invalid username or password
    await expect($(".title")).toBeExisting();
    await expect($(".title")).toHaveTextContaining(message);
  } else {
    // valid username or password
    await expect($(".title")).toBeExisting();
    await expect($(".title")).toHaveTextContaining(message);
  }
});

//CHECK ACCOUNT STATE
When(/^I click on an (.*)$/,
     async (account) => {
       await CheckStatePage.selectAccount(account);
});

Then(/^I can see the (.*) as (.*), (.*), (.*) and (.*)$/,
     async (details, balance, account, accountType, available) => {
        if (accountType === "CHECKING") {
          await expect($(".title")).toBeExisting();
          await expect($(".title")).toHaveTextContaining(details);
          
          await expect($("//td[@id='accountId']")).toBeExisting();
          await expect($("//td[@id='accountId']")).toHaveTextContaining(account);
          
          await expect($("//td[@id='accountType']")).toBeExisting();
          await expect($("//td[@id='accountType']")).toHaveTextContaining(accountType);
          
          await expect($("//td[@id='balance']")).toBeExisting();
          await expect($("//td[@id='balance']")).toHaveTextContaining(balance);
          
          await expect($("//td[@id='availableBalance']")).toBeExisting();
          await expect($("//td[@id='availableBalance']")).toHaveTextContaining(available);
          await CheckStatePage.logout();
       }
});

//TRANSFER
When(/^I write the (.*) to transfer from the account (.*) to the account (.*) and press transfer$/,
     async (amount, fromAccount, toAccount) => {
       await TransferPage.transfer(amount, fromAccount, toAccount);
});

Then(/^I see (.*)$/, 
     async (message) => {
       if (message == "Invalid") {
         //Invalid transfer
         await expect($('//*[@id="showError"]/h1')).toBeExisting();
         await expect($('//*[@id="showError"]/h1')).toHaveTextContaining(message);
         await TransferPage.logout();
       } else {
         //Valid transfer
         await expect($('//*[@id="showResult"]/h1')).toBeExisting();
         await expect($('//*[@id="showResult"]/h1')).toHaveTextContaining(message);
         await TransferPage.logout();
       }
});
