import { LightningElement, api } from 'lwc';


export default class SubscriptionSummary extends LightningElement 
{
    
    @api accountId;
    @api productId;
    @api subscriptionName;
    @api subscriptionType;
    @api tier;
    @api value;
    @api currency;
    @api description;

    @api subscriptionDetails = {
        Name_c : '',
        Subscription_Type__c: '',
        Value__c: '',
        Currency__c: '',
        Tier__c: '',
        Description__c: '',
        Product__c: '',
        Account__c: ''
    };


    // Handle the 'Back' button click
    handleBack() 
    {
        // Dispatch event to the parent component to navigate back to the form
        const backEvent = new CustomEvent('back');
        this.dispatchEvent(backEvent);
    }

    // Handle the 'Submit' button click
    handleSubmit() 
    {
        // Call the Apex method to create the subscription
        createSubscription({
            subscriptionName :this.subscriptionName ,
            subscriptionType: this.subscriptionType,
            value: this.value,
            currency: this.currency,
            tier: this.tier,
            description: this.description,
            productId: this.selectedProductId,
            accountId: this.selectedAccountId
        })
        .then(result => {
            if (result.startsWith('Success')) {
                // Show success message
                this.showToast('Success', 'Subscription created successfully!', 'success');
            } else {
                // Show error message
                this.showToast('Error', result, 'error');
            }
        })
        .catch(error => {
            console.error('Error creating subscription:', error);
            this.showToast('Error', 'Something went wrong!', 'error');
        });
    }

    // Helper method to display toast messages
    showToast(title, message, variant) 
    {
        const event = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant,
        });
        this.dispatchEvent(event);
    }


    handleConfirm() {
        // Dispatch an event to notify parent that subscription is confirmed
        const confirmEvent = new CustomEvent('confirm', {
            detail: {
                accountId: this.accountId,
                productId: this.productId,
                subscriptionType: this.subscriptionType,
                subscriptionName: this.subscriptionName ,
                tier: this.tier,
                value: this.value,
                description: this.description
            }
        });
        this.dispatchEvent(confirmEvent);
    }

}
