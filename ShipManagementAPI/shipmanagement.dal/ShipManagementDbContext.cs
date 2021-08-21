using Microsoft.EntityFrameworkCore;
using shipmanagement.dal.dto;
using System;
using System.Collections.Generic;
using System.Text;

namespace shipmanagement.dal
{
    public class ShipManagementDbContext : DbContext
    {
        public ShipManagementDbContext(DbContextOptions<ShipManagementDbContext> options)
                 : base(options)
        {

        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Ship>()
         .HasIndex(u => u.Name)
         .IsUnique();

        }
        public DbSet<Ship> ship { get; set; }
    }
}
