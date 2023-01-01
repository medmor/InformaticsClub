using System;

namespace Marketplace.Domain;

public record class ClassifiedAdId 
{
    private Guid value {get;}

    public ClassifiedAdId(Guid val){
        if(val == default){
            throw new ArgumentNullException(nameof(value), "ClassifiedAd Id cannot be empty");
        }
        value = val;
    }
    public void SetTitle(){}
    public void UpdateText(){}
    public void UpdatePrice(){}

}