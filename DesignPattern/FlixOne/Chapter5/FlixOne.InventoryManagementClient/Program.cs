using FlixOne.InventoryManagement.UserInterface;
using Microsoft.Extensions.DependencyInjection;
using FlixOne.InventoryManagementClient;
using FlixOne.InventoryManagement.Command;
using FlixOne.InventoryManagement.Repository;

IServiceCollection services = new ServiceCollection();

services.AddTransient<IUserInterface, ConsoleUserInterface>();
services.AddTransient<ICatalogService, CatalogService>();
services.AddTransient<IInventoryCommandFactory, InventoryCommandFactory>();
services.AddTransient<Func<string, InventoryCommand>>(InventoryCommand.GetInventoryCommand);
var context = new InventoryContext();
services.AddSingleton<IInventoryReadContext, InventoryContext>(p => context);
services.AddSingleton<IInventoryWriteContext, InventoryContext>(p => context);
services.AddSingleton<IInventoryContext, InventoryContext>(p => context);

IServiceProvider serviceProvider = services.BuildServiceProvider();

var catalogService = serviceProvider.GetService<ICatalogService>();
catalogService!.Run();

Console.WriteLine("CatalogService has completed.");
Console.ReadLine();