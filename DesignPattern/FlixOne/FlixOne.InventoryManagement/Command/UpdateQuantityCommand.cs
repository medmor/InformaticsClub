using FlixOne.InventoryManagement.UserInterface;

namespace FlixOne.InventoryManagement.Command;

internal class updateQuantityCommand : NonTerminatingCommand, IParameterisedCommand
{
    public updateQuantityCommand(IUserInterface userInterface) : base(userInterface)
    {
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
        throw new NotImplementedException();
    }
}