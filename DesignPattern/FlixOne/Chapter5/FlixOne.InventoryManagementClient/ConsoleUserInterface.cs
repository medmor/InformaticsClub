using FlixOne.InventoryManagement.UserInterface;

namespace FlixOne.InventoryManagementClient;

internal class ConsoleUserInterface : IUserInterface {
    public string? ReadValue(string message){
        Console.ForegroundColor = ConsoleColor.Green;
        Console.WriteLine(message);
        Console.ForegroundColor = ConsoleColor.White;
        return Console.ReadLine();
    }
    public void WriteMessage(string message){
        Console.ForegroundColor = ConsoleColor.Green;
        Console.WriteLine(message);
        Console.ForegroundColor = ConsoleColor.White;
    }
    public void WriteWarning(string message){
        Console.ForegroundColor = ConsoleColor.DarkYellow;
        Console.WriteLine(message);
    }
}