import { LightningElement, track } from 'lwc';

export default class SubscriptionContainer extends LightningElement {
    @track showForm = true;
    @track showSummary = false;
    @track accountId;
    @track productId;
    @track subscriptionName;
    @track subscriptionType;
    @track tier;
    @track value;
    @track description;

    // Handle next button from subscription form to show summary
    handleNext(event)
     {
        // Store data from the form
        this.accountId = event.detail.accountId;
        this.productId = event.detail.productId;
        this.subscriptionType = event.detail.subscriptionType;
        this.tier = event.detail.tier;
        this.subscriptionName = event.detail.subscriptionName;
        this.value = event.detail.value;
        this.description = event.detail.description;

        // Navigate to the summary
        this.showForm = false;
        this.showSummary = true;
    }

    // Handle back button from summary to go back to form
    handleBack() 
    {
        this.showForm = true;
        this.showSummary = false;
    }

    // Handle confirm button from summary
    handleConfirm(event) 
    {
        
        console.log('Subscription confirmed with details:', event.detail);
    }
}
