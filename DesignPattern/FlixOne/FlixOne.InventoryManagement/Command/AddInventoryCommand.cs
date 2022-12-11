using FlixOne.InventoryManagement.UserInterface;
namespace FlixOne.InventoryManagement.Command;

internal class AddInventoryCommand : NonTerminatingCommand, IParameterisedCommand
{
    public AddInventoryCommand(IUserInterface userInterface) : base(userInterface)
    {
    }
    public string? InventoryName { get; private set; }
    internal override bool InternalCommand()
    {
        throw new NotImplementedException();
    }
    public bool GetParameters()
    {
        if (string.IsNullOrWhiteSpace(InventoryName))
            InventoryName = GetParameter("name");
        return !string.IsNullOrWhiteSpace(InventoryName);
    }
}