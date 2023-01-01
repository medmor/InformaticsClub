using FlixOne.Web.Contexts;
using FlixOne.Web.Models;
using Microsoft.EntityFrameworkCore;

namespace FlixOne.Web.Persistance;

public class inventoryRepository : IInventoryRepository
{
    private readonly InventoryContext _inventoryContext;

    public inventoryRepository(InventoryContext cont) => _inventoryContext = cont;
    public bool AddCategory(Category category)
    {
        _inventoryContext.Categories.Add(category);
        return _inventoryContext.SaveChanges() > 0;
    }

    public bool AddProduct(Product product)
    {
        _inventoryContext.Products.Add(product);
        return _inventoryContext.SaveChanges() > 0;
    }

    public IEnumerable<Category> GetCategories()
    {
        return _inventoryContext.Categories.ToList();
    }

    public Category GetCategory(Guid id)
    {
        return _inventoryContext.Categories.FirstOrDefault(c => c.Id == id);
    }

    public Product GetProduct(Guid id)
    {
        return _inventoryContext.Products.Include(p => p.Category).FirstOrDefault(p => p.Id == id);
    }

    public IEnumerable<Product> GetProducts()
    {
        var ps = _inventoryContext.Products.Include(p => p.Category).ToList();
        return ps;
    }

    public bool RemoveCategory(Category category)
    {
        _inventoryContext.Categories.Remove(category);
        return _inventoryContext.SaveChanges() > 0;
    }

    public bool RemoveProduct(Product product)
    {
        _inventoryContext.Products.Remove(product);
        return _inventoryContext.SaveChanges() > 0;
    }

    public bool UpdateCategory(Category category)
    {
        _inventoryContext.Update(category);
        return _inventoryContext.SaveChanges() > 0;
    }

    public bool UpdateProduct(Product product)
    {
        _inventoryContext.Update(product);
        return _inventoryContext.SaveChanges() > 0;
    }
}
