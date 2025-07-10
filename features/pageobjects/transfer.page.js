import Page from "./page.js";

class TransferPage extends Page {
  get inputAmount() {
    return $("//input[@id='amount']")
  }

  get inputFromAccount() {
    return $("//select[@id='fromAccountId']")
  }

  get inputToAccount() {
    return $("//select[@id='toAccountId']")
  }

  get btnTransfer () {
    return $("//input[@value='Transfer']")
  }

  async transfer (
    amount,
    fromAccount,
    toAccount
  ) {
    await expect(this.inputAmount).toBeExisting();
    await this.inputAmount.waitForEnabled();
    await this.inputAmount.setValue(amount);

    await expect(this.inputFromAccount).toBeExisting();
    await this.inputFromAccount.waitForEnabled();
    await this.inputFromAccount.selectByAttribute('value', fromAccount);

    await expect(this.inputToAccount).toBeExisting();
    await this.inputToAccount.waitForEnabled();
    await this.inputToAccount.selectByAttribute('value', toAccount);

    await expect(this.btnTransfer).toBeExisting();
    await this.btnTransfer.click();
  }

  open() {
    return super.open('transfer');
  }
}

export default new TransferPage();
