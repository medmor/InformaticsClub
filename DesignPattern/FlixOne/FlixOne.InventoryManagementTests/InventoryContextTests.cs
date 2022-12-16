using FlixOne.InventoryManagement.Repository;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Configuration.Memory;

namespace FlixOne.InventoryManagementTest;

[TestClass]
public class InventoryContextTests
{
    ServiceProvider? Services { get; set; }

    [TestInitialize]
    public void Startup()
    {
        IServiceCollection services = new ServiceCollection();
        var context = new InventoryContext();
        services.AddSingleton<IInventoryContext, InventoryContext>();
        Services = services.BuildServiceProvider();

        var source = new MemoryConfigurationSource();
        source.InitialData = new Dictionary<string, string?>();
        var b = new MemoryConfigurationProvider(source);
    }
    [TestMethod]
    public void MaintainBooks_Successful()
    {
        List<Task> tasks = new List<Task>();

        //add thirty books
        foreach (var id in Enumerable.Range(1, 30))
        {
            tasks.Add(AddBook($"Book_{id}"));
        }
        Task.WaitAll(tasks.ToArray());
        tasks.Clear();
        //let's update the quantity of the books by adding 1, 2, 3, 4, 5
        foreach (var quantity in Enumerable.Range(1, 10))
        {
            foreach (var id in Enumerable.Range(1, 30))
            {
                tasks.Add(UpdateQuantity($"Book_{id}", quantity));
            }
        }
        //let's update the quantity of the books by subtracting 1, 2 ,3, 4, 5
        foreach (var quantity in Enumerable.Range(1, 10))
        {
            foreach (var id in Enumerable.Range(1, 30))
            {
                tasks.Add(UpdateQuantity($"Book_{id}", -quantity));
            }
        }
        Task.WaitAll(tasks.ToArray());
        //all quantities should be 0
        foreach (var book in Services!.GetService<IInventoryContext>()!.GetBooks())
        {
            Assert.AreEqual(0, book.Quantity);
        }
    }

    public Task AddBook(string book)
    {
        return Task.Run(() =>
        {
            //var context = new InventoryContext();
            Assert.IsTrue(Services!.GetService<IInventoryContext>()!.AddBook(book));
        });
    }

    public Task UpdateQuantity(string book, int quantity)
    {
        return Task.Run(() =>
        {
            //var context = new InventoryContext();
            Assert.IsTrue(Services!.GetService<IInventoryContext>()!.UpdateQuantity(book, quantity));
        });
    }
}