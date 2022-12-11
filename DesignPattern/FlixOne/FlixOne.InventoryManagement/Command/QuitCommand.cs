using FlixOne.InventoryManagement.UserInterface;

namespace FlixOne.InventoryManagement.Command;

internal class QuitCommand : InventoryCommand
{
    public QuitCommand(IUserInterface userInterface) : base(true, userInterface) { }
    internal override bool InternalCommand()
    {
        Interface.WriteMessage("Thank you for using FlixOne Inventory Management System");
        return true;
    }
}