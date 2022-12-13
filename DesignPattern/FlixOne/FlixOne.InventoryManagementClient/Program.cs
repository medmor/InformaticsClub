using FlixOne.InventoryManagement.UserInterface;
using Microsoft.Extensions.DependencyInjection;
using FlixOne.InventoryManagementClient;
using FlixOne.InventoryManagement.Command;

IServiceCollection services = new ServiceCollection();

services.AddTransient<IUserInterface, ConsoleUserInterface>();
services.AddTransient<ICatalogService, CatalogService>();
services.AddTransient<IInventoryCommandFactory, InventoryCommandFactory>();

IServiceProvider serviceProvider = services.BuildServiceProvider();

var service = serviceProvider.GetService<ICatalogService>();
service!.Run();

Console.WriteLine("CatalogService has completed.");
Console.ReadLine();