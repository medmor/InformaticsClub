namespace FlixOne.InventoryManagementTest.ImplementationFactoryTests;

public abstract class InventoryCommand
{
    protected abstract string[] CommandStrings { get; }
    public virtual bool IsCommandFor(string input)
    {
        return CommandStrings.Contains(input.ToLower());
    }
}

public class QuitCommand : InventoryCommand
{
    protected override string[] CommandStrings => new string[] {"q", "quit"};
}

public class GetInventoryCommand : InventoryCommand {
    protected override string[] CommandStrings => new string[] {"g", "getinventory"};
}

public class AddInventoryCommand : InventoryCommand {
    protected override string[] CommandStrings => new string[] {"a", "addinventory"};
}

public class UpdateQuantityCommand : InventoryCommand {
    protected override string[] CommandStrings => new string[] {"u", "updatequantity"};
}

public class HelpCommand : InventoryCommand {
    protected override string[] CommandStrings => new string[] {"?"};
}

public class UnknownCommand : InventoryCommand {
    protected override string[] CommandStrings => new string[0];
    public override bool IsCommandFor(string input)
    {
        return true;
    }
}