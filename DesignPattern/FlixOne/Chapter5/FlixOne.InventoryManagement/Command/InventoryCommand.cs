using FlixOne.InventoryManagement.Repository;
using FlixOne.InventoryManagement.UserInterface;
using Microsoft.Extensions.DependencyInjection;
namespace FlixOne.InventoryManagement.Command;

public abstract class InventoryCommand
{
    private readonly bool _isTerminatingCommand;
    protected IUserInterface Interface { get; }
    internal InventoryCommand(bool commandIsTerminating, IUserInterface interf)
    {
        _isTerminatingCommand = commandIsTerminating;
        Interface = interf;
    }
    public (bool wasSuccessful, bool shouldQuit) RunCommand()
    {
        if (this is IParameterisedCommand parameterisedCommand)
        {
            var allParametersCompleted = false;
            while (allParametersCompleted == false)
            {
                allParametersCompleted = parameterisedCommand.GetParameters();
            }
        }
        return (InternalCommand(), _isTerminatingCommand);
    }

    internal abstract bool InternalCommand();
    protected string? GetParameter(string parameterName)
    {
        return Interface.ReadValue($"Enter {parameterName} : ");
    }
    public static Func<IServiceProvider, Func<string, InventoryCommand>> GetInventoryCommand => provider => input =>
    {
        switch (input.ToLower())
        {
            case "q":
            case "quit":
                return new QuitCommand(provider.GetService<IUserInterface>());
            case "a":
            case "addinventory":
                return new AddInventoryCommand(provider.GetService<IUserInterface>(), provider.GetService<IInventoryWriteContext>());
            case "g":
            case "getinventory":
                return new GetInventoryCommand(provider.GetService<IUserInterface>(), provider.GetService<IInventoryReadContext>());
            case "u":
            case "updatequantity":
                return new UpdateQuantityCommand(provider.GetService<IUserInterface>(), provider.GetService<IInventoryWriteContext>());
            case "?":
                return new HelpCommand(provider.GetService<IUserInterface>());
            default:
                return new UnknownCommand(provider.GetService<IUserInterface>());
        }
    };
}