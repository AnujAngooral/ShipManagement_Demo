using shipmanagement.dal.dto;
using shipmanagement.dal.Interface;
using System;
using System.Collections.Generic;
using System.Text;

namespace shipmanagement.dal.Interface
{
   public interface IShipRepository:IRepository<Ship>, IDisposable
    {
    }
}
