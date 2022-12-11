using FlixOne.InventoryManagement.UserInterface;

namespace FlixOne.InventoryManagement.Command;

internal class UnknownCommand : NonTerminatingCommand
{
    public UnknownCommand(IUserInterface userInterface) : base(userInterface)
    {
    }

    internal override bool InternalCommand()
    {
        throw new NotImplementedException();
    }
}