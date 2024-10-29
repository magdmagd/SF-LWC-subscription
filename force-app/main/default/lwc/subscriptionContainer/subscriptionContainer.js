import { LightningElement, track } from 'lwc';

export default class SubscriptionContainer extends LightningElement {
    @track isForm = true;
    @track isSummary = false;
    @track subscriptionData;

    handleNext(event) {
        this.subscriptionData = event.detail;
        this.isForm = false;
        this.isSummary = true;
    }

    handleBack() {
        this.isForm = true;
        this.isSummary = false;
    }

    handleFinish() {
        this.isForm = true;
        this.isSummary = false;
        this.subscriptionData = null;
    }
}
