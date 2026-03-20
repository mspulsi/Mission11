using AmazonProject.API.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AmazonProject.API.Controllers;

[ApiController]
[Route("[controller]")]
public class BooksController : ControllerBase
{
    private readonly BookstoreDbContext _context;
    
    public BooksController(BookstoreDbContext temp)
    {
        _context = temp;
    }

    [HttpGet]
    public IActionResult GetBooks(int count = 10, int page = 1, string sortBy = "")

    {
        var query = _context.Books.AsQueryable();

        if (sortBy == "asc")
            query = query.OrderBy(x => x.Title);
        else if (sortBy == "desc")
            query = query.OrderByDescending(x => x.Title);

        var dbBooks = query
            .Skip((page - 1) * count)
            .Take(count)
            .ToList();
        
        var dbTotalBooks = _context.Books.Count();

        var data = new
        {
            books = dbBooks,
            total_books = dbTotalBooks
        };

        return Ok(data);
    }

}