using FlixOne.InventoryManagement.UserInterface;

namespace FlixOne.InventoryManagementTest.Helpers;

class TestUserInterface : IUserInterface
{
    private readonly List<Tuple<string, string>> _expectedReadRequests;
    private readonly List<string> _expectedWriteMessageRequests;
    private readonly List<string> _expectedWriteWarningRequests;

    private int _expectedReadRequestsIndex;
    private int _expectedWriteMessageRequestsIndex;
    private int _expectedWriteWarningRequestsIndex;

    public TestUserInterface(
        List<Tuple<string, string>> expectedReadRequests,
        List<string> expectedWriteMessageRequests,
        List<string> expectedWriteWarningRequests)
    {
        _expectedReadRequests = expectedReadRequests;
        _expectedWriteMessageRequests = expectedWriteMessageRequests;
        _expectedWriteWarningRequests = expectedWriteWarningRequests;
    }
    public string? ReadValue(string message)
    {
        Assert.IsTrue(_expectedReadRequestsIndex < _expectedReadRequests.Count, "Received too many command read requests.");
        Assert.AreEqual(_expectedReadRequests[_expectedReadRequestsIndex].Item1,
            message,
            "received unexpected command read message.");
        return _expectedReadRequests[_expectedReadRequestsIndex++].Item2;
    }

    public void WriteMessage(string message)
    {
        Assert.IsTrue(_expectedWriteMessageRequestsIndex < _expectedWriteMessageRequests.Count, 
        "Received too many command write message requests.");
        Assert.AreEqual(_expectedWriteMessageRequests[_expectedWriteMessageRequestsIndex++],
        message,
        "Received unexpected command write message.");
    }

    public void WriteWarning(string message)
    {
        Assert.IsTrue(_expectedWriteWarningRequestsIndex < _expectedWriteWarningRequests.Count,
        "Received too many command write requests.");
        Assert.AreEqual(_expectedWriteWarningRequests[_expectedWriteWarningRequestsIndex++],
        message,
        "Received unexpected command write warning message");
    }

    public void Validate(){
        Assert.IsTrue(_expectedReadRequestsIndex == _expectedReadRequests.Count,
        "Not all read requests were performed.");
        Assert.IsTrue(_expectedWriteMessageRequests.Count == _expectedWriteMessageRequestsIndex,
        "Not all write requests were performed.");
        Assert.IsTrue(_expectedWriteWarningRequests.Count == _expectedWriteWarningRequestsIndex,
        "Not all warning write requests were performed.");
    }
}