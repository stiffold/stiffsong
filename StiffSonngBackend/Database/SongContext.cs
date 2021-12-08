using System;
using Microsoft.EntityFrameworkCore;

namespace StiffSonngBackend.Database
{
    public class SongContext : DbContext
    {
        public DbSet<Song> Songs { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(Constants.ConnectionString);
        }
    }

    public class Song
    {
        public long Id { get; set; }
        public string Title { get; set; }
        public string Lyrics { get; set; }
        public string ChordsText { get; set; }
        public string Folder { get; set; }
        public DateTime? LastUsed { get; set; }
    }
}