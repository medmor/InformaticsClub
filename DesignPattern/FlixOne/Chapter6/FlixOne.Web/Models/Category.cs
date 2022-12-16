namespace FlixOne.Web.Models;

public class Category
{
    public Guid Id { get; set; }
    public string? Name { get; set; }
    public string? Description { get; set; }
    public virtual IEnumerable<Product> Products { get; set; }
    public Category()
    {
        Products = new List<Product>();
    }
}