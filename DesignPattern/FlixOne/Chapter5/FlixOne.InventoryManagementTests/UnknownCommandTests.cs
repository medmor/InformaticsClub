using FlixOne.InventoryManagement.Command;

namespace FlixOne.InventoryManagementTest;

[TestClass]
public class UnknownCommandTests{
    [TestMethod]
    public void UnknownCommand_Successful(){
        var expectedInterface = new Helpers.TestUserInterface(
            new List<Tuple<string, string>>(),
            new List<string>(),
            new List<string>{
                "Unable to determine the desired command."
            }
        );

        var command = new UnknownCommand(expectedInterface);
        var result = command.RunCommand();

        Assert.IsFalse(result.shouldQuit, "Unknown is not terminating command.");
        Assert.IsFalse(result.wasSuccessful, "Unknown should not complete Successfully.");
    }
}