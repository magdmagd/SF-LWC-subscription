import { LightningElement, api, track } from 'lwc';
import findAccounts from '@salesforce/apex/AccountController.findAccounts';

export default class AccountLookup extends LightningElement {
    @api label = 'Account Lookup';
    @track searchTerm = '';
    @track accounts;
    @track error;

    handleSearchChange(event) {
        this.searchTerm = event.target.value;
        if (this.searchTerm.length >= 2) {
            findAccounts({ searchTerm: this.searchTerm })
                .then(result => {
                    this.accounts = result;
                    this.error = undefined;
                })
                .catch(error => {
                    this.error = error.body.message;
                    this.accounts = undefined;
                });
        } else {
            this.accounts = undefined;
        }
    }

    handleAccountSelect(event) {
        const accountId = event.target.dataset.id;
        const selectEvent = new CustomEvent('select', { detail: { accountId } });
        this.dispatchEvent(selectEvent);
    }
}
