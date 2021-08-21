using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace shipmanagement.dal.Interface
{
    public interface IRepository<T>
    {
        public  Task AddAsync(T entity);
        public Task<T> GetAsync(Expression<Func<T, bool>> filter);
        public Task<IEnumerable<T>> GetAsync();

        Task DeleteAsync(Expression<Func<T, bool>> filter);
        public Task CommitAsync();

    }
}
