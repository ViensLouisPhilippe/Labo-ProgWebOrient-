using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NuGet.Packaging;
using ServeurImages.Data;
using ServeurImages.Models;

namespace ServeurImages.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class PicturesController : ControllerBase
    {
        private readonly ServeurImagesContext _context;

        public PicturesController(ServeurImagesContext context)
        {
            _context = context;
        }

        // GET: api/Pictures
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Picture>>> GetPicture()
        {
          if (_context.Picture == null)
          {
              return NotFound();
          }
            return await _context.Picture.ToListAsync();
        }

        // GET: api/Pictures/5
        [HttpGet("{size}/{id}")]
        [AllowAnonymous]
        public async Task<ActionResult> GetFile(string size, int id)
        {
          if (_context.Picture == null)
          {
              return NotFound();
          }
            var picture = await _context.Picture.FindAsync(id);

            if (picture == null)
            {
                return NotFound();
            }
            if (!Regex.Match(size, "lg|sm").Success)
            {
                return BadRequest(new {Message = "La taille demandé est inadéquate"});
            }
            byte[] bytes = System.IO.File.ReadAllBytes(Directory.GetCurrentDirectory() + "/images/" + size + "/" + picture.FileName);

            return File(bytes, picture.FileName);
        }

        

        // POST: api/Pictures
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        [DisableRequestSizeLimit]
        public async Task<ActionResult> PostPicture()
        {
          if (_context.Picture == null)
          {
              return Problem("Entity set 'ServeurImagesContext.Picture'  is null.");
          }
          try
          {
                IFormCollection formCollection = await Request.ReadFormAsync();
                IFormFile? file = formCollection.Files.GetFile("cle");

                if (file == null)
                {
                    Image image = Image.Load(file.OpenReadStream());

                    Picture picture = new Picture()
                    {
                        Id = 0,
                        FileName = Guid.NewGuid().ToString() + Path.GetExtension(file.FileName),
                        MimType = file.ContentType
                    };
                    image.Save(Directory.GetCurrentDirectory() + "images/lg/" + picture.FileName);
                    image.Mutate(i =>
                        i.Resize(new ResizeOptions()
                        {
                            Mode = ResizeMode.Min,
                            Size = new Size() { Width = 320 }
                        })
                    );
                    image.Save(Directory.GetCurrentDirectory() + "images/sm/" + picture.FileName);


                    _context.Entry(picture).State = EntityState.Modified;
                    await _context.SaveChangesAsync();
                    return Ok(new { Message = "L'image est ajouté avec succès au DbSet" });
                }
                else
                {
                    return NotFound(new { Message = "aucune image fournie" });
                }
            }
          catch (Exception)
          {
              throw;
          }
        }

        // DELETE: api/Pictures/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePicture(int id)
        {
            if (_context.Picture == null)
            {
                return NotFound();
            }
            var picture = await _context.Picture.FindAsync(id);
            if (picture == null)
            {
                return NotFound();
            }
            if(picture.MimType != null && picture.FileName != null)
            {
                System.IO.File.Delete(Directory.GetCurrentDirectory() + "/images/lg" + picture.FileName);
                System.IO.File.Delete(Directory.GetCurrentDirectory() + "/images/sm" + picture.FileName);
            }


            _context.Picture.Remove(picture);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PictureExists(int id)
        {
            return (_context.Picture?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
