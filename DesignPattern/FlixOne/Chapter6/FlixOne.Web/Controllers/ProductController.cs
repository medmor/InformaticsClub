using FlixOne.Web.Common;
using FlixOne.Web.Models;
using FlixOne.Web.Persistance;
using Microsoft.AspNetCore.Mvc;

namespace FlixOne.Web.Controllers;

public class ProductController : Controller
{
    public readonly IInventoryRepository _repository;
    public ProductController(IInventoryRepository repository) => _repository = repository;

    public IActionResult Index()
    {
        _repository.SeedDb();
        var ps = _repository.GetProducts();
        return View(ps.ToProductvm());
    }
    public IActionResult Details(Guid id) => View(_repository.GetProduct(id).ToProductvm());
    public IActionResult Create() => View();
    [HttpPost]
    [ValidateAntiForgeryToken]
    public IActionResult Create(Product product)
    {
        try
        {
            _repository.AddProduct(product);
            return RedirectToAction(nameof(Index));
        }
        catch
        {
            return View();
        }
    }
    public IActionResult Edit(Guid id) => View(_repository.GetProduct(id));
    [HttpPost]
    [ValidateAntiForgeryToken]
    public IActionResult Edit(Guid id, [FromBody] Product product)
    {
        try
        {
            _repository.UpdateProduct(product);
            return RedirectToAction(nameof(Index));
        }
        catch
        {
            return View();
        }
    }
    public IActionResult Delete(Guid id) => View(_repository.GetProduct(id));
    [HttpPost]
    [ValidateAntiForgeryToken]
    public IActionResult Delete(Guid id, [FromBody] Product product)
    {
        try
        {
            _repository.RemoveProduct(product);
            return RedirectToAction(nameof(Index));
        }
        catch
        {
            return View();
        }
    }
}