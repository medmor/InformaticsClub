namespace ChainOfResponsibility;

abstract class ServiceHandler
{
    public ServiceHandler _nextServiceHandler;
    public ServiceRequirements _providedServices;

    public ServiceHandler(ServiceRequirements providedServices)
    {
        _providedServices = providedServices;
    }
    public void Service(Car car)
    {
        Console.WriteLine("---" + _providedServices + "----" + car.Requirements + "------" + (car.Requirements & _providedServices));
        if (_providedServices == (car.Requirements & _providedServices))
        {
            Console.WriteLine($"{this.GetType().Name} providing {this._providedServices} services.");
            car.Requirements &= ~_providedServices;
        }
        if (car.IsServiceComplete || _nextServiceHandler == null)
            return;
        else
            _nextServiceHandler.Service(car);
    }
    public void SetNextServiceHandler(ServiceHandler handler)
    {
        _nextServiceHandler = handler;
    }
}