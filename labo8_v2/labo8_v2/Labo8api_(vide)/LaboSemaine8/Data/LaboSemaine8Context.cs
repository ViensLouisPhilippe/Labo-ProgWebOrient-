using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using LaboSemaine8.Models;

namespace LaboSemaine8.Data
{
    public class LaboSemaine8Context : DbContext
    {
        public LaboSemaine8Context (DbContextOptions<LaboSemaine8Context> options)
            : base(options)
        {
        }

        public DbSet<LaboSemaine8.Models.Animal> Animal { get; set; } = default!;
    }
}
