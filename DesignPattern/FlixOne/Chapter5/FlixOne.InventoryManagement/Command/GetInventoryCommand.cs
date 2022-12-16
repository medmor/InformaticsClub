using FlixOne.InventoryManagement.UserInterface;
using FlixOne.InventoryManagement.Repository;

namespace FlixOne.InventoryManagement.Command;

internal class GetInventoryCommand : NonTerminatingCommand
{
    public readonly IInventoryReadContext _context;
    public GetInventoryCommand(IUserInterface userInterface, IInventoryReadContext context) : base(userInterface)
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