using System;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.Processing;
using StiffSonngBackend.Database;
using StiffSonngBackend.Models;
using Image = StiffSonngBackend.Database.Image;

namespace StiffSonngBackend.Controllers
{
    [Route("/")]
    [ApiController]
    public class MainController : ControllerBase
    {
        private readonly IImageHandler _imageHandler;

        public MainController(IImageHandler imageHandler)
        {
            _imageHandler = imageHandler;
        }

        [HttpGet("song/{id}")]
        public ActionResult<Song> Get(int id)
        {
            Song song = null;
            using (var db = new SongContext())
            {
                song = db.Songs.SingleOrDefault(x => x.Id == id);
            }

            return song;
        }

        [HttpGet("mark/{id}")]
        public void Mark(int id)
        {
            Song song = null;
            using (var db = new SongContext())
            {
                song = db.Songs.SingleOrDefault(x => x.Id == id);
                if (song != null)
                {
                    song.LastUsed = DateTime.Now;
                    db.SaveChanges();
                }
            }
        }

        [HttpPost("createsong")]
        public long CreatSong([FromBody] NewSongDto newSong)
        {
            Song song;
            using (var db = new SongContext())
            {
                song = new Song{Title = newSong.Title, Lyrics = newSong.Lyrics, LastUsed = DateTime.Now};
                db.Songs.Add(song);
                db.SaveChanges();
            }

            return song.Id;
        }

        [HttpPost("updatesong")]
        public long UpdateSong([FromBody] Song song)
        {
            using (var db = new SongContext())
            {
                var loadedSong = db.Songs.SingleOrDefault(x => x.Id == song.Id);

                if (loadedSong != null)
                {
                    loadedSong.Title = song.Title;
                    loadedSong.Lyrics = song.Lyrics;
                    loadedSong.ChordsText = song.ChordsText;
                    loadedSong.LastUsed = DateTime.Now;
                }

                db.SaveChanges();
            }

            return song.Id;
        }

        [HttpDelete("deletesong/{id}")]
        public void Delete(int id)
        {
            using (var db = new SongContext())
            {
                var song = db.Songs.SingleOrDefault(x => x.Id == id);
                if (song != null)
                {
                    db.Songs.Remove(song);
                    db.SaveChanges();
                }
            }
        }

        [HttpPost("searchSongs")]
        public Song[] SearchSongs([FromBody] SearchDto search)
        {
            using (var db = new SongContext())
            {
                var query = db.Songs.AsQueryable();

                if (!string.IsNullOrEmpty(search.Title))
                {
                    query = query.Where(x => x.Title.Contains(search.Title));
                }

                if (!string.IsNullOrEmpty(search.Lyrics))
                {
                    query = query.Where(x => x.Lyrics.Contains(search.Lyrics));
                }

                query = query.OrderByDescending(x => x.LastUsed).Take(20);

                return query.ToArray();
            }
        }

        [HttpPost("UploadFiles")]
        public async Task<int> UploadImage(IFormFile file)
        {
            await _imageHandler.UploadImage(file);
            return 10;
        }

        [HttpPost("addchordimage/{songId}")]
        public async Task<int> AddChordImage([FromForm(Name = "file")] IFormFile file, int songId)
        {
            if (file.Length > 0)
            {
                using (var db = new ImagesContext())
                {
                    var loadedImage = db.Images.SingleOrDefault(x => x.RelatedSongId == songId);

                    if (loadedImage == null)
                    {
                        loadedImage = new Image { ImageType = ImageType.Chords, RelatedSongId = songId };
                        db.Images.Add(loadedImage);
                    }

                    using (var ms = new MemoryStream())
                    {
                        var img = await SixLabors.ImageSharp.Image.LoadAsync(file.OpenReadStream());
                        img.Mutate(x => x.Resize(0, 1000));
                        await img.SaveAsPngAsync(ms);
                        loadedImage.ImageData = ms.ToArray();
                        loadedImage.LastUsed = DateTime.Now;
                        await db.SaveChangesAsync();
                    }
                }
            }

            return songId;
        }

        [HttpGet("songImage/{songId}")]
        public byte[] GetSongImage(int songId)
        {
            using (var db = new ImagesContext())
            {
                var image = db.Images.SingleOrDefault(x => x.RelatedSongId == songId);
                return image?.ImageData;
            }
        }

        [HttpDelete("songImage/{songId}")]
        public void DeleteSongImage(int songId)
        {
            using (var db = new ImagesContext())
            {
                var image = db.Images.SingleOrDefault(x => x.RelatedSongId == songId);
                if (image != null)
                {
                    db.Images.Remove(image);
                    db.SaveChanges();
                }
            }
        }
    }
}