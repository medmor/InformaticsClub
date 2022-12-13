using FlixOne.InventoryManagement.Command;
using FlixOne.InventoryManagement.Models;
using FlixOne.InventoryManagementTest.Helpers;

namespace FlixOne.InventoryManagementTest;

[TestClass]
public class GetInventoryCommandTests
{
    [TestMethod]
    public void GetInventoryCommand_successful()
    {

        var expectedInvetrface = new Helpers.TestUserInterface(
            new List<Tuple<string, string>>(),
            new List<string>{
                "Gremlins                      \tQuantity : 7",
                "Willowsong                    \tQuantity : 3",
            },
            new List<string>()
        );

        var context = new TestInventoryContext(new Dictionary<string, Book>{
            {"Gremlins", new Book { Id=1, Name = "Gremlins", Quantity = 7}},
            {"Willowsong", new Book {Id = 2, Name = "Willowsong", Quantity = 3}}
        });

        var command = new GetInventoryCommand(expectedInvetrface, context);
        var result = command.RunCommand();

        Assert.IsFalse(result.shouldQuit, "GetInventory is not a terminating command.");
        Assert.IsTrue(result.wasSuccessful, "GetInventoy did not complete Successfully.");

        Assert.AreEqual(0, context.GetAddedBooks().Length, "GetInventory should not have added any books.");
        Assert.AreEqual(0, context.GetUpdatedBooks().Length, "GetInventory should not have updated any books.");
    }
}