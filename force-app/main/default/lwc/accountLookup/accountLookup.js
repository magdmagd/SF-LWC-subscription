import { LightningElement, api, track } from 'lwc';
import findAccounts from '@salesforce/apex/AccountController.findAccounts';

export default class AccountLookup extends LightningElement {
    @track searchTerm = ''; // Holds the current search term
    @track accounts; // Holds the list of account results
    @track error; // Holds any error

    // Public property for the input label
    @api label = 'Account Lookup';

    // Called when the search term changes
    handleSearchChange(event) {
        this.searchTerm = event.target.value;

        if (this.searchTerm.length >= 2) {
            // Fetch matching accounts from Apex
            findAccounts({ searchTerm: this.searchTerm })
                .then((result) => {
                    this.accounts = result;
                    this.error = undefined;
                })
                .catch((error) => {
                    this.error = error.body.message;
                    this.accounts = undefined;
                });
        } else {
            this.accounts = undefined; // Reset the account list if the search term is too short
        }
    }

    // Called when an account is selected
    handleAccountSelect(event) {
        const accountId = event.target.dataset.id;

        // Dispatch a custom event to notify the parent component
        const selectEvent = new CustomEvent('select', {
            detail: { accountId }
        });
        this.dispatchEvent(selectEvent);
    }
}
