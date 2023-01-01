using FlixOne.Web.Models;
using FlixOne.Web.Persistance;

namespace FlixOne.Web.Common;

public static class Extension
{
    public static Product ToProductModel(this ProductViewModel productvm)
    {
        return new Product
        {
            CategoryId = productvm.CategoryId,
            Description = productvm.ProductDescription,
            Id = productvm.ProductId,
            Name = productvm.ProductName,
            Price = productvm.ProductPrice
        };
    }
    public static ProductViewModel ToProductvm(this Product productModel)
    {
        return new ProductViewModel
        {
            CategoryId = productModel.CategoryId,
            CategoryDescription = productModel.Category?.Description,
            CategoryName = productModel.Category?.Name,
            ProductDescription = productModel.Description,
            ProductId = productModel.Id,
            ProductImage = productModel.Image,
            ProductName = productModel.Name,
            ProductPrice = productModel.Price
        };
    }
    public static IEnumerable<Product> ToProductModel(this IEnumerable<ProductViewModel> productvm)
        => productvm.Select(ToProductModel).ToList();

    public static IEnumerable<ProductViewModel> ToProductvm(this IEnumerable<Product> productModel)
        => productModel.Select(ToProductvm).ToList();

    public static void SeedDb(this IInventoryRepository repo)
    {
        var c = new Category() { Description = "Category description", Id = new Guid(), Name = "Category name" };
        repo.AddCategory(c);

        repo.AddProduct(new Product() { Category = c, CategoryId = c.Id, Name = "Product name", Description = "Product description", Id = new Guid(), Price = 888 });
    }
}