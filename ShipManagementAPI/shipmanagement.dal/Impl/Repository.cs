using Microsoft.EntityFrameworkCore;
using shipmanagement.dal.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace shipmanagement.dal.Impl
{
    /// <summary>
    /// Abstract generic class which handles common functions for all the repositories.
    /// </summary>
    /// <typeparam name="T">Entity</typeparam>
    public abstract class Repository<T> : IRepository<T> where T : class
    {
        internal ShipManagementDbContext dbContext;
        internal DbSet<T> dbSet;

        public Repository(ShipManagementDbContext context)
        {
            this.dbContext = context;
            this.dbSet = context.Set<T>();
        }
        /// <summary>
        /// Add an entity to database
        /// </summary>
        /// <param name="entity">Entity to store in the database</param>
        /// <returns>Newly created entity</returns>
        public async Task AddAsync(T entity)
        {
            await dbContext.AddAsync(entity);
        }

        /// <summary>
        /// Get the entity based on the filter
        /// </summary>
        /// <param name="filter">pass the filter like id==1, etc</param>
        /// <returns>first matched entity</returns>
        public async Task<T> GetAsync(Expression<Func<T, bool>> filter)
        {
            return await dbSet.FirstOrDefaultAsync(filter);
        }


        public Task DeleteAsync(Expression<Func<T, bool>> filter)
        {
            var itemToDelete = dbSet.First(filter);
            dbContext.Remove(itemToDelete);
            return Task.CompletedTask;
        }
        /// <summary>
        /// Get collection of entities
        /// </summary>
        /// <returns>collection of entities</returns>
        public async Task<IEnumerable<T>> GetAsync()
        {
            return await dbSet.ToListAsync();
        }

        /// <summary>
        /// Save changes on entity
        /// </summary>
        /// <returns></returns>
        public async Task CommitAsync()
        {
            await dbContext.SaveChangesAsync();
        }
    }
}
