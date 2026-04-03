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
    public IActionResult GetBooks(int count = 10, int page = 1, string sortBy = "", string category = "all")
    {
        var query = _context.Books.AsQueryable();

        if (sortBy == "asc")
            query = query.OrderBy(x => x.Title);
        else if (sortBy == "desc")
            query = query.OrderByDescending(x => x.Title);

        if (category != "all") {
            query = query.Where(x => x.Category == category);
        }
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

    [HttpGet("{id}")]
    public IActionResult GetBook(int id)
    {
        var book = _context.Books.Find(id);
        if (book == null)
        {
            return NotFound();
        }
        return Ok(book);
    }

    [HttpPost]
    public IActionResult CreateBook([FromBody] Book book)
    {
        _context.Books.Add(book);
        _context.SaveChanges();
        return CreatedAtAction(nameof(GetBook), new { id = book.BookId }, book);
    }

    [HttpPut("{id}")]
    public IActionResult UpdateBook(int id, [FromBody] Book book)
    {
        var existingBook = _context.Books.Find(id);
        if (existingBook == null)
        {
            return NotFound();
        }

        existingBook.Title = book.Title;
        existingBook.Author = book.Author;
        existingBook.Publisher = book.Publisher;
        existingBook.Isbn = book.Isbn;
        existingBook.Classification = book.Classification;
        existingBook.Category = book.Category;
        existingBook.PageCount = book.PageCount;
        existingBook.Price = book.Price;

        _context.SaveChanges();
        return Ok(existingBook);
    }

    [HttpDelete("{id}")]
    public IActionResult DeleteBook(int id)
    {
        var book = _context.Books.Find(id);
        if (book == null)
        {
            return NotFound();
        }

        _context.Books.Remove(book);
        _context.SaveChanges();
        return NoContent();
    }
}