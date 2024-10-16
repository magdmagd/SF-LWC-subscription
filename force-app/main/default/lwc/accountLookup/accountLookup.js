import { LightningElement, track, wire, api } from 'lwc';
import findAccounts from '@salesforce/apex/AccountController.findAccounts'; // Apex method

export default class AccountLookup extends LightningElement {
    @api label; // Label for the lookup field
    @api value; // Selected value (Account Id)
    @track accountOptions = []; // Options to show in the dropdown

    // Handle when a user selects an account from the dropdown
    handleSelect(event) {
        this.value = event.detail.value;

        // Dispatch an event to notify parent of the selected Account
        const selectedEvent = new CustomEvent('select', {
            detail: { value: this.value }
        });
        this.dispatchEvent(selectedEvent);
    }

    // Wire the method to search for accounts based on user input
    @wire(findAccounts)
    wiredAccounts({ error, data }) {
        if (data) {
            this.accountOptions = data.map(account => {
                return { label: account.Name, value: account.Id };
            });
        } else if (error) {
            this.accountOptions = [];
            console.error('Error fetching accounts:', error);
        }
    }
}
