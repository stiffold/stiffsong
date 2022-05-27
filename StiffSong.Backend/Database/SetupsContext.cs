using System;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace StiffSonngBackend.Database
{
    public class SetupsContext : DbContext
    {
        public DbSet<Setup> Setups { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(Constants.ConnectionString);
        }
    }

    public class Setup
    {
        public long Id { get; set; }
        public string Songs { get; set; }
        public string Images { get; set; }
        public string Videos { get; set; }
        public string Configuration { get; set; }
        public DateTime? LastUsed { get; set; }
    }
}