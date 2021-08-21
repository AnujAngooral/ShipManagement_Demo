using System;
using System.Collections.Generic;
using System.Text;

namespace shipmanagement.viewmodels
{
    public static class ShipExtension
    {
        public  static Ship RemoveSpace(this Ship ship)
        {

            ship.Name = ship.Name.Trim();
            ship.Code = ship.Code.Trim();

            return ship;
        }
    }
}
