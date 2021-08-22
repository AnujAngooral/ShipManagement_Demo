using AutoMapper;
using Dal.Impl;
using Microsoft.Extensions.Logging;
using shipmanagement.dal.Interface;
using shipmanagement.services.Interface;
using shipmanagement.viewmodels;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;


namespace shipmanagement.services.Impl
{
    public class ShipService : IShipService
    {
        readonly IShipRepository _shipRepository;

        private readonly IMapper _mapper;
        private readonly ILogger<ShipService> _logger;
        /// <summary>
        /// Injected logger, automapper and shiprepository.
        /// </summary>
        /// <param name="shipRepository"></param>
        /// <param name="mapper"></param>
        /// <param name="logger"></param>
        public ShipService(IShipRepository shipRepository, IMapper mapper, ILogger<ShipService> logger)
        {
            _shipRepository = shipRepository;
            _mapper = mapper;
            _logger = logger;
        }
        /// <summary>
        /// This method id used to conver the viewmodel to dto and send it to database layer to insert into db,in-memory
        /// </summary>
        /// <param name="ship"> View Model ship object</param>
        /// <returns> IsSuccess: true in case of success else false. Return created ship object with newly created id. ErrorMessage in case of any exception.</returns>
        public async Task<(bool IsSuccess, Ship Ship, string ErrorMessage)> AddAsync(shipmanagement.viewmodels.Ship ship)
        {
            try
            {
                _logger.LogInformation("About to convert ship view model to ship dto");

                var isValid = await ship.RemoveSpace()    // RemoveSpace---> Extension method to remove the space
                      .ValidateShipNameAndCode(_shipRepository); // Extension method to check if the name already exists in the database
                if (!isValid)
                    throw new Exception("Duplicate ship name or code");

                var shipDTO = _mapper.Map<shipmanagement.dal.dto.Ship>(ship);
                await _shipRepository.AddAsync(shipDTO); // add the ship object into the database
                await _shipRepository.CommitAsync(); // commit once everything is done.

                _logger.LogDebug("Ship data has been commited into the database.");

                ship.Id = shipDTO.Id;
                return (true, ship, null);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error: {ex.Message} | {ex.StackTrace}");
                return (false, null, ex.Message);
            }

        }


        /// <summary>
        /// This method id used to conver the viewmodel to dto and send it to database layer to insert into db,in-memory
        /// </summary>
        /// <param name="ship"> View Model ship object</param>
        /// <returns> IsSuccess: true in case of success else false. Return created ship object with newly created id. ErrorMessage in case of any exception.</returns>
        public async Task<(bool IsSuccess, Ship Ship, string ErrorMessage)> UpdateAsync(shipmanagement.viewmodels.Ship ship, int id)
        {
            try
            {
                ship.RemoveSpace(); // remove the extra space from the name and code .
                _logger.LogInformation($"About to get the ship by shipid: {id}");
                var shipDTO = await _shipRepository.GetAsync(x => x.Id == id);
                if (shipDTO == null)
                    throw new Exception($"Ship with id {id} not found.");

                var isAlreadyExist = await _shipRepository.GetAsync(x => x.Name.ToLower() == ship.Name.Trim().ToLower() ||
                                                      x.Code.ToLower() == ship.Code.ToLower());
                if (isAlreadyExist!=null && isAlreadyExist.Id != id)
                    throw new Exception("Ship name or code already exist.");

                if (shipDTO != null)
                    {
                        shipDTO.Name = ship.Name;
                        shipDTO.Length = ship.Length;
                        shipDTO.Code = ship.Code;
                        shipDTO.Width = ship.Width;
                    }
                await _shipRepository.CommitAsync();
                _logger.LogDebug("Ship has been updated successfully.");
                return (true, ship, null);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error: {ex.Message} | {ex.StackTrace}");
                return (false, null, ex.Message);
            }

        }

        /// <summary>
        /// Get a ship data from database based on id.
        /// </summary>
        /// <param name="Id">ship id</param>
        /// <returns>IsSuccess: true in case of success else false. Return ship object based on id. ErrorMessage in case of any exception.</returns>
        public async Task<(bool IsSuccess, Ship Ship, string ErrorMessage)> GetAsync(int id)
        {
            try
            {
                _logger.LogInformation($"Get ship by shipid: {id}");
                var shipDTO = await _shipRepository.GetAsync(x => x.Id == id);
                if (shipDTO == null)
                    throw new Exception($"Ship with id {id} not found.");
                return (true, _mapper.Map<Ship>(shipDTO), null);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error: {ex.Message} | {ex.StackTrace}");
                return (false, null, ex.Message);
            }
        }

        /// <summary>
        /// Return all the ship's available in the database.
        /// </summary>
        /// <returns>IsSuccess: true in case of success else false. Return ship's available in the database. ErrorMessage in case of any exception.</returns>
        public async Task<(bool IsSuccess, IEnumerable<Ship> Ships, string ErrorMessage)> GetAsync()
        {
            try
            {
                return (true, _mapper.Map<IEnumerable<Ship>>(await _shipRepository.GetAsync()), null);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error: {ex.Message} | {ex.StackTrace}");
                return (false, null, ex.Message);
            }
        }

        public async Task<(bool IsSuccess, string ErrorMessage)> DeleteAsync(int Id)
        {
            try
            {
                await _shipRepository.DeleteAsync(x => x.Id == Id);
                await _shipRepository.CommitAsync();
                _logger.LogDebug("Ship has been deleted successfully.");
                return (true, null);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error: {ex.Message} | {ex.StackTrace}");
                return (false, ex.Message);
            }
        }

        public Task<(bool IsSuccess, bool isValid, string ErrorMessage)> ValidateShipName()
        {
            throw new NotImplementedException();
        }
    }
}
