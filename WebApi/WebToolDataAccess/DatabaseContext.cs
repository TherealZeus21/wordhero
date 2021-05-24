using Microsoft.EntityFrameworkCore;
using WebTool.Model.DataAccess;
using WebToolDataAccess.MockData;
using WebToolDataAccess.Models;

namespace WebToolDataAccess
{
    public class DatabaseContext : DbContext
    {
        public DatabaseContext(DbContextOptions<DatabaseContext> options)
        : base(options)
        {
        }

        public DbSet<WordHero> WordHeroes { get; set; }
        public DbSet<Word> Words { get; set; }
        public DbSet<WordHeroConfig> WordHeroConfigs { get; set; }

        public DbSet<WordHeroShareData> WordHeroShareData { get; set; }
        public DbSet<WordResult> WordResults { get; set; }
        public DbSet<StudentResult> StudentResults { get; set; }

        public DbSet<Question> Questions { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            //modelBuilder.Entity<Word>()
            //    .HasData(
            //        MockDataService.Words
            //);

            //modelBuilder.Entity<WordHero>()
            //    .HasData(
            //        MockDataService.Lessons
            //);

            //modelBuilder.Entity<WordHeroConfig>()
            //    .HasData(
            //        MockDataService.WordHeroConfigs
            //);
        }
    }
}
