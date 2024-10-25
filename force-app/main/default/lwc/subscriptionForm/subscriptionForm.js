import { LightningElement, track } from 'lwc';

export default class SubscriptionForm extends LightningElement {
    @track subscriptionType;
    @track subscriptionName;
    @track value;
    @track currency;
    @track tier;
    @track description;
    @track selectedProductId;
    @track selectedAccountId;

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
    

    handleInputChange(event) 
    {
        const field = event.target.label.toLowerCase();
        this[field] = event.target.value;
    }

    handleAccountSelect(event) 
    {
        this.selectedAccountId = event.detail.value;
    }

    // Handle product selection
    handleProductSelect(event)
    {
        this.selectedProductId = event.detail.value;
    }

    handleBack()
    {
        this.showSummary = false ;
    }
    handleNext()
     {
        // Navigate to Summary Screen
        this.showSummary = true; 
        this.dispatchEvent(new CustomEvent('next', {
            detail: {
                subscriptionType: this.subscriptionType,
                subscriptionName: this.subscriptionName,
                Value: this.value,
                currency: this.currency,
                tier: this.tier,
                description: this.description,
                selectedProduct: this.selectedProductId,
                selectedAccount: this.selectedAccountId
            }
        }));
    }//end handleNext()


    handleSubmit() 
    {

        console.log('Selected Account ID:', this.selectedAccountId);
        createSubscription(
        {
            subscriptionType: this.subscriptionType,
            subscriptionName: this.subscriptionName,
            value: this.value,
            currency: this.currency,
            tier: this.tier,
            description: this.description,
            selectedProduct: this.selectedProductId,
            selectedAccount: this.selectedAccountId
        })      
        .then(result => {
            if (result.startsWith('Error'))
            {
                // Show error message
            } 
            else 
            {
                // Show success message and possibly reset form
            }
        })
        .catch(error => 
            {
            console.error('Error creating subscription:', error);
            });
     }

    handleCancel()
    {
        this.showSummary = false ;
    }

    handleChange(event) 
    {
        const field = event.target.label;
        if (field === 'Subscription Type') 
            {
            this.subscriptionType = event.target.value;
           } 
        else if (field === 'Value') 
            {
            this.value = event.target.value;
          } 
          else if (field === 'Tier') 
            {
            this.tier = event.target.value;
            }
         else if (field === 'Description')
             {
            this.description = event.target.value;
           }
      }

}
