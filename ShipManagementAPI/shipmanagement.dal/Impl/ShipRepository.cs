using shipmanagement.dal;
using shipmanagement.dal.dto;
using shipmanagement.dal.Impl;
using shipmanagement.dal.Interface;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Dal.Impl
{
    public class ShipRepository : Repository<Ship>, IShipRepository
    {
        public ShipRepository(ShipManagementDbContext context) : base(context) { }
        public void Dispose()
        {
          //  throw new NotImplementedException();
        }
    }
}
