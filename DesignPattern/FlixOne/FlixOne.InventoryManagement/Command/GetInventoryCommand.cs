using FlixOne.InventoryManagement.UserInterface;
using FlixOne.InventoryManagement.Repository;

namespace FlixOne.InventoryManagement.Command;

internal class GetInventoryCommand : NonTerminatingCommand
{
    public readonly IInventoryContext _context;
    public GetInventoryCommand(IUserInterface userInterface, IInventoryContext context) : base(userInterface)
    {
        _context = context;
    }

    internal override bool InternalCommand()
    {
        foreach(var book in _context.GetBooks()){
            Interface.WriteMessage($"{book.Name, -30}\tQuantity : {book.Quantity}");
        }
        return true;
    }
}