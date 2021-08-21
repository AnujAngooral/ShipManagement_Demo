using shipmanagement.dal.Interface;
using shipmanagement.viewmodels;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace shipmanagement.services
{
   public static class ShipExtension
    {
        
        public async static Task<bool> ValidateShipNameAndCode(this Ship ship,IShipRepository shipRepository) {
            var shipDTO = await shipRepository.GetAsync(x => x.Name.ToLower() == ship.Name.Trim().ToLower() || x.Code.ToLower()== ship.Code.ToLower());
            return shipDTO == null ?
                true : false;
        }
    }
}
