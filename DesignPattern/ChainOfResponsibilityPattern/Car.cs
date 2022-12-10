namespace ChainOfResponsibility;

class Car
{
    public ServiceRequirements Requirements { get; set; }

    public bool IsServiceComplete { get => Requirements == ServiceRequirements.None; }
}