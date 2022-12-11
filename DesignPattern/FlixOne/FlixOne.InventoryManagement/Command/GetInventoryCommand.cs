using FlixOne.InventoryManagement.UserInterface;

namespace FlixOne.InventoryManagement.Command;

internal class GetInventoryCommand : NonTerminatingCommand {
    public GetInventoryCommand(IUserInterface userInterface) : base(userInterface)
    {
    }

    internal override bool InternalCommand()
    {
        throw new NotImplementedException();
    }
}