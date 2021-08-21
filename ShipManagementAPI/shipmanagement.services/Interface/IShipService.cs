using shipmanagement.viewmodels;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;


namespace shipmanagement.services.Interface
{
    public interface IShipService
    {
        Task<(bool IsSuccess, Ship Ship, string ErrorMessage)> AddAsync(shipmanagement.viewmodels.Ship ship);
        Task<(bool IsSuccess, Ship Ship, string ErrorMessage)> UpdateAsync(shipmanagement.viewmodels.Ship ship, int id);
        Task<(bool IsSuccess, Ship Ship, string ErrorMessage)> GetAsync(int Id);
        Task<(bool IsSuccess, string ErrorMessage)> DeleteAsync(int Id);
        Task<(bool IsSuccess, IEnumerable<Ship> Ships, string ErrorMessage)> GetAsync();

        Task<(bool IsSuccess, bool isValid, string ErrorMessage)> ValidateShipName();
    }
}
