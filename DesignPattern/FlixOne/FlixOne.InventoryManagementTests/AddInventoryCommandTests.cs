using FlixOne.InventoryManagement.Command;
using FlixOne.InventoryManagement.Models;
using FlixOne.InventoryManagementTest.Helpers;

namespace FlixOne.InventoryManagementTest;

[TestClass]
public class AddInventoryCommandTests
{
    [TestMethod]
    public void AddIventoryCommand_Successful()
    {
        const string expectedBookName = "AddInventoryUnitTest";
        var expectedInterface = new Helpers.TestUserInterface(
            new List<Tuple<string, string>>{
                new Tuple<string, string>("Enter name : ", expectedBookName)
            },
            new List<string>(),
            new List<string>()
        );
        var context = new TestInventoryContext(new Dictionary<string, Book> {
            {"Gremlins", new Book {Id=1, Name = "Gremlins", Quantity = 7}}
        });

        var command = new AddInventoryCommand(expectedInterface, context);

        var result = command.RunCommand();

        Assert.IsFalse(result.shouldQuit, "AddInventory is not a terminating command.");
        Assert.IsTrue(result.wasSuccessful, "AddInventory did not complete successfully");

        Assert.AreEqual(1, context.GetAddedBooks().Length, "AddInventory should have added one new book.");
        
        var newBook = context.GetAddedBooks().First();
        Assert.AreEqual(expectedBookName, newBook.Name, "AddInventory did not add book successfully.");
    }
}