using FlixOne.InventoryManagement.Command;
using FlixOne.InventoryManagementTest.Helpers;

namespace FlixOne.InventoryManagementTest;

[TestClass]
public class InventoryCommandFactoryTests
{
    public InventoryCommandFactory? Factory { get; set; }

    [TestInitialize]
    public void Initialize()
    {
        var expectedInterface = new TestUserInterface(
            new List<Tuple<string, string>>(),
            new List<string>(),
            new List<string>()
        );
        Factory = new InventoryCommandFactory(expectedInterface);
    }

    [TestMethod]
    public void QuitCommand_Successful()
    {
        Assert.IsInstanceOfType(Factory!.GetCommand("q"), typeof(QuitCommand), "q should be QuitCommand");
        Assert.IsInstanceOfType(Factory.GetCommand("quit"), typeof(QuitCommand), "quit should be QuitCommand");
    }

    [TestMethod]
    public void HelpCommand_Successful()
    {
        Assert.IsInstanceOfType(Factory!.GetCommand("?"), typeof(HelpCommand), "? should be HelpCommand");
    }

    [TestMethod]
    public void UnknownCommand_Successful()
    {
        Assert.IsInstanceOfType(Factory!.GetCommand("add"), typeof(UnknownCommand), "unmatched command should be UnknownCommand");
        Assert.IsInstanceOfType(Factory.GetCommand("addinventry"), typeof(UnknownCommand), "unmatched command should be UnknownCommand");
        Assert.IsInstanceOfType(Factory.GetCommand("h"), typeof(UnknownCommand), "unmatched command should be UnknownCommand");
    }

    [TestMethod]
    public void AddinventoryCommand_Successful()
    {
        Assert.IsInstanceOfType(Factory!.GetCommand("a"), typeof(AddInventoryCommand), "a should AddInventoryCommand");
        Assert.IsInstanceOfType(Factory.GetCommand("addinventory"), typeof(AddInventoryCommand), "addinventory should be AddInventoryCommand");
    }

    [TestMethod]
    public void GetInventoryCommand_Successful()
    {
        Assert.IsInstanceOfType(Factory!.GetCommand("g"), typeof(GetInventoryCommand), "g should be GetInventoryCommand");
        Assert.IsInstanceOfType(Factory.GetCommand("getinventory"), typeof(GetInventoryCommand), "getinventory should be GetInventoryCommand");
    }

    [TestMethod]
    public void UpdateQuantityCommand_Successful()
    {
        Assert.IsInstanceOfType(Factory!.GetCommand("u"), typeof(UpdateQuantityCommand), "u should be UpdateQuantityCommand");
        Assert.IsInstanceOfType(Factory.GetCommand("updatequantity"), typeof(UpdateQuantityCommand), "updatequantity should be UpdateQuantityCommand");
        Assert.IsInstanceOfType(Factory.GetCommand("UpdaTEQuantity"), typeof(UpdateQuantityCommand), "UpdaTEQuantity should be UpdateQuantityCommand");
    }

}