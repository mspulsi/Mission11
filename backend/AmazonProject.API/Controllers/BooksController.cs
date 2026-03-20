using AmazonProject.API.Data;
using Microsoft.AspNetCore.Mvc;

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
    public IActionResult GetBooks(int count = 10, int page = 1)

    {
        var dbBooks = _context.Books
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