using FlixOne.InventoryManagement.UserInterface;
namespace FlixOne.InventoryManagement.Command;

internal class HelpCommand : NonTerminatingCommand
{
    public HelpCommand(IUserInterface userInterface) : base(userInterface)
    {
    }
    internal override bool InternalCommand()
    {
        Console.WriteLine("USAGE :");
        Console.WriteLine("\taddinventory (a)");
        Console.WriteLine("EXemples :");
        return true;
    }
}