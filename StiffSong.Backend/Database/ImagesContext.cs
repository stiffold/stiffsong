using System;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace StiffSonngBackend.Database
{
    public class ImagesContext : DbContext
    {
        public DbSet<Image> Images { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(Constants.ConnectionString);
        }
    }

    public class Image
    {
        public long Id { get; set; }

        [Column(TypeName = "nvarchar(20)")]
        public ImageType ImageType { get; set; }
        public byte[] ImageData { get; set; }
        public long RelatedSongId { get; set; }
        public DateTime? LastUsed { get; set; }
    }

    public enum ImageType
    {
        Chords,
        Background
    }
}