using FlixOne.InventoryManagement.UserInterface;

namespace FlixOne.InventoryManagement.Command;

internal abstract class NonTerminatingCommand : InventoryCommand
{
    internal NonTerminatingCommand(IUserInterface userInterface) : base(commandIsTerminating:false, userInterface)
    {
    }
}