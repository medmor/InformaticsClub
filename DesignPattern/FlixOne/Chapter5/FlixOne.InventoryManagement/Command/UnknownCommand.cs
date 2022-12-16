using FlixOne.InventoryManagement.UserInterface;

namespace FlixOne.InventoryManagement.Command;

internal class UnknownCommand : NonTerminatingCommand
{
    public UnknownCommand(IUserInterface userInterface) : base(userInterface)
    {
    }

    internal override bool InternalCommand()
    {
        Interface.WriteWarning("Unable to determine the desired command.");
        return false;
    }
}