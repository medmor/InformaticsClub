using FlixOne.InventoryManagement.Models;
namespace FlixOne.InventoryManagement.Repository;
using System.Collections.Concurrent;


internal interface IInventoryContext
{
    Book[] GetBooks();
    bool AddBook(string name);
    bool UpdateQuantity(string name, int quantity);
}

internal class InventoryContext : IInventoryContext
{
    private static InventoryContext _context;
    private static object _lock = new object();

        private readonly IDictionary<string, Book> _books;

    public static InventoryContext Singleton
    {
        get
        {
            if (_context == null)
            {
                lock (_lock)
                {
                    if (_context == null)
                    {
                        _context = new InventoryContext();
                    }
                }
            }

            return _context;
        }
    }
    private InventoryContext()
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