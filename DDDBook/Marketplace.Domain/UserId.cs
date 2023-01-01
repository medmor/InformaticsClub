namespace Marketplace.Domain;

public class UserId{
    private Guid value {get; set;}
    public UserId(Guid val){
        if(val == default){
            throw new ArgumentNullException(nameof(value), "User Id cannot be empty");
        }
            value = val;
    }
}