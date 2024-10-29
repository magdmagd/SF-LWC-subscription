import { LightningElement, api, track } from 'lwc';
import createSubscription from '@salesforce/apex/SubscriptionController.createSubscription';

export default class SubscriptionSummary extends LightningElement {
    @api subscriptionData;

    handleBack() {
        this.dispatchEvent(new CustomEvent('back'));
    }

    handleSubmit() {
        createSubscription({ subscription: this.subscriptionData })
            .then((result) => {
                alert(result); // Simple feedback, adjust as needed
                this.dispatchEvent(new CustomEvent('finish'));
            })
            .catch((error) => {
                console.error('Error creating subscription:', error);
            });
    }
}
