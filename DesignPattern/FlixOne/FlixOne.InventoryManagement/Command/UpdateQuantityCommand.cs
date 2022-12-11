using FlixOne.InventoryManagement.Repository;
using FlixOne.InventoryManagement.UserInterface;

namespace FlixOne.InventoryManagement.Command;

internal class updateQuantityCommand : NonTerminatingCommand, IParameterisedCommand
{

    private readonly IInventoryContext _context;
    public updateQuantityCommand(IUserInterface userInterface, IInventoryContext context) : base(userInterface)
    {
        _context = context;
    }

    internal string? InventoryName { get; private set; }
    internal int Quantity { get; private set; }

    public bool GetParameters()
    {
        int q = 0;
        if (string.IsNullOrWhiteSpace(InventoryName))
            InventoryName = GetParameter("name");
        if (Quantity == 0)
            int.TryParse(GetParameter("quantity"), out q);
        Quantity = q;
        return !string.IsNullOrWhiteSpace(InventoryName) && Quantity != 0;
    }

    internal override bool InternalCommand()
    {
        return _context.UpdateQuantity(InventoryName!, Quantity);
    }
}