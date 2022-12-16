using FlixOne.InventoryManagement.UserInterface;
using FlixOne.InventoryManagement.Repository;

namespace FlixOne.InventoryManagement.Command;

internal class AddInventoryCommand : NonTerminatingCommand, IParameterisedCommand
{
    private readonly IInventoryWriteContext _context;
    public AddInventoryCommand(IUserInterface userInterface, IInventoryWriteContext context) : base(userInterface)
    {
        _context = context;
    }
    public string? InventoryName { get; private set; }
    internal override bool InternalCommand()
    {
        return _context.AddBook(InventoryName!);
    }
    public bool GetParameters()
    {
        if (string.IsNullOrWhiteSpace(InventoryName))
            InventoryName = GetParameter("name");
        return !string.IsNullOrWhiteSpace(InventoryName);
    }
}