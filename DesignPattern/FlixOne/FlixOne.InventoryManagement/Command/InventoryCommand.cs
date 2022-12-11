using FlixOne.InventoryManagement.UserInterface;

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
        return Interface.ReadValue($"Enter {parameterName}:");
    }
}