using FlixOne.InventoryManagement.Models;
using System.Collections.Concurrent;

namespace FlixOne.InventoryManagement.Repository;

public class InventoryContext : IInventoryContext
{
    public string? Name {get; set;}
    private readonly object _lock = new Object();
    private readonly IDictionary<string, Book> _books;

    public InventoryContext()
    {
        _books = new ConcurrentDictionary<string, Book>();
    }
    public bool AddBook(string name)
    {
        _books.Add(name, new Book { Name = name });
        return true;
    }

    public Book[] GetBooks()
    {
        return _books.Values.ToArray();
    }

    public bool UpdateQuantity(string name, int quantity)
    {
        lock (_lock)
        {
            _books[name].Quantity += quantity;
        }
        return true;
    }
}