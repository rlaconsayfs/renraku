using ContactManagerAPI.Entities.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace ContactManagerAPI.Repositories.Context
{
    public class ContactContext : DbContext
    {
        public ContactContext(DbContextOptions<ContactContext> options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Contact> Contacts { get; set; }
        public DbSet<PhoneNumber> PhoneNumbers { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // set table names as singular
            foreach(IMutableEntityType entityType in modelBuilder.Model.GetEntityTypes())
            {
                entityType.SetTableName(entityType.DisplayName());
            }

            // set Guid for User
            modelBuilder.Entity<User>().Property(user => user.Id).HasDefaultValueSql("newsequentialid()");

            //set Username of User as unique
            modelBuilder.Entity<User>().HasIndex(user => user.Username).IsUnique();

            // set default of User CreatedAt and UpdatedAt as current datetime
            modelBuilder.Entity<User>().Property(user => user.CreatedAt).HasDefaultValueSql("getdate()");
            modelBuilder.Entity<User>().Property(user => user.UpdatedAt).HasDefaultValueSql("getdate()");

            // set default of Contact CreatedAt and UpdatedAt as current datetime
            modelBuilder.Entity<Contact>().Property(contact => contact.CreatedAt).HasDefaultValueSql("getdate()");
            modelBuilder.Entity<Contact>().Property(contact => contact.UpdatedAt).HasDefaultValueSql("getdate()");

            // set default of Contact IsFavorite as false
            modelBuilder.Entity<Contact>().Property(contact => contact.IsFavorite).HasDefaultValue(false);

            // set default of PhoneNumber Label as "Mobile"
            modelBuilder.Entity<PhoneNumber>().Property(phoneNumber => phoneNumber.Label).HasDefaultValue("Mobile");
        }
    }
}
