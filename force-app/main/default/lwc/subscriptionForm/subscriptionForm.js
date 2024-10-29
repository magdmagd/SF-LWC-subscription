import { LightningElement, track } from 'lwc';

export default class SubscriptionForm extends LightningElement {
    @track subscriptionType;
    @track name;
    @track value;
    @track currency;
    @track tier;
    @track description;
    @track accountId;
    @track productId;

    currencyOptions = [
        { label: 'USD', value: 'USD' },
        { label: 'EUR', value: 'EUR' },
        { label: 'EGP', value: 'EGP' },
        { label: 'GPB', value: 'GPB' }
    ];

    tierOptions = [
        { label: 'Bronze', value: 'Bronze' },
        { label: 'Silver', value: 'Silver' },
        { label: 'Gold', value: 'Gold' }
    ];

    subscriptionTypeOptions = [
        { label: 'Monthly', value: 'Monthly' },
        { label: 'Annual', value: 'Annual' },
        { label: 'Premium', value: 'Premium' }
    ];
    

    handleChange(event)
     {
        this[event.target.dataset.id] = event.target.value;
     }

    handleInputChange(event) 
    {
        const field = event.target.label.toLowerCase();
        this[field] = event.target.value;
    }

    handleAccountSelect(event) {
        this.accountId = event.detail.accountId;
    }


    handleProductSelect(event) 
    {
        this.productId = event.detail.productId;
    }

    handleNext() 
    {
        const subscriptionData = 
        {
            subscriptionType: this.subscriptionType,
            name: this.name ,
            value: this.value,
            currency: this.currency,
            tier: this.tier,
            description: this.description,
            accountId: this.accountId,
            productId: this.productId
        };
        this.dispatchEvent(new CustomEvent('next', { detail: subscriptionData }));
    }
 


     
}
