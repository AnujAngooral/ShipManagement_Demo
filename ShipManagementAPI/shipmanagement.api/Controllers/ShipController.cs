using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using shipmanagement.services.Interface;
using shipmanagement.viewmodels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace shipmanagement.api.Controllers
{

    [Route("api")]

    public class ShipController : Controller
    {
        private readonly ILogger<ShipController> _logger;
        private readonly IShipService IShipService;

        /// <summary>
        /// This method is used to inject the logger and shipservice
        /// </summary>
        /// <param name="logger"></param>
        /// <param name="IShipService"></param>
        public ShipController(ILogger<ShipController> logger, IShipService IShipService)
        {
            _logger = logger;
            this.IShipService = IShipService;
        }

        /// <summary>
        /// Add a ship into the database.
        /// </summary>
        /// <remarks>
        /// 
        /// <param name="model">Ship Model</param>
        /// <returns>A newly created Ship</returns>
        /// <response code="201">Returns the newly created ship</response>
        /// <response code="500">In case of any error</response> 
        [HttpPost]
        [Route("ship")]
        [ProducesResponseType(typeof(Ship), (int)System.Net.HttpStatusCode.Created)]
        public async Task<IActionResult> Add([FromBody] Ship ship)
        {
            if (!ModelState.IsValid)
            {
                var errorList = ModelState.Values.SelectMany(m => m.Errors)
                                 .Select(e => e.ErrorMessage)
                                 .ToList();
                _logger.LogError("Error: Invalid ship");
                return BadRequest($"Invalid ship:  {String.Join(" , ", errorList)}");
            }

            var result = await IShipService.AddAsync(ship);
            if (result.IsSuccess)
                return CreatedAtRoute("get", new { id = result.Ship.Id }, result.Ship);

            return BadRequest(result.ErrorMessage);
        }


        [HttpPut]
        [Route("ship/{id}")]
        [ProducesResponseType(typeof(Ship), (int)System.Net.HttpStatusCode.Created)]
        public async Task<IActionResult> Update([FromBody] Ship model, int id)
        {
            if (!ModelState.IsValid)
            {
                var errorList = ModelState.Values.SelectMany(m => m.Errors)
                                 .Select(e => e.ErrorMessage)
                                 .ToList();
                _logger.LogError("Error: Invalid ship");
                return BadRequest($"Invalid ship:  {String.Join(" , ", errorList)}");
            }
            var result = await IShipService.UpdateAsync(model, id);

            if (result.IsSuccess)
                return Ok(result.Ship);

            return BadRequest(result.ErrorMessage);

        }

        /// <summary>
        /// Get a ship by Id
        /// </summary>
        /// <returns>matched ship object</returns>
        [HttpGet]
        [Route("ship/{id}", Name = "get")]
        public async Task<IActionResult> Get(int id)
        {
            var result = await IShipService.GetAsync(id);

            if (result.IsSuccess)
                return Ok(result.Ship);

            return NotFound($"Ship with id {id} not found.");

        }

        /// <summary>
        /// List of ship's available in the system.
        /// </summary>
        /// <returns>List of all the ship object in the database.</returns>
        [HttpGet]
        [Route("ship")]
        public async Task<IActionResult> Get()
        {
            var result = await IShipService.GetAsync();

            if (result.IsSuccess)
                return Ok(result.Ships);

            return StatusCode(500, "Internal Server Error");

        }

        [HttpDelete]
        [Route("ship/{id}", Name = "delete")]
        public async Task<IActionResult> Delete(int id)
        {
            var result = await IShipService.DeleteAsync(id);

            if (result.IsSuccess)
                return NoContent();

            return BadRequest(result.ErrorMessage);


        }

        [HttpGet]
        [Route("ship/name/{name}/validate")]
        public async Task<IActionResult> ValidateShipName(string name)
        {

            var result = await IShipService.ValidateShipName(name);

            if (result.IsSuccess)
                return Ok(result.isValid);

            return BadRequest(result.ErrorMessage);
        }
        [HttpGet]
        [Route("ship/code/{code}/validate")]
        public async Task<IActionResult> ValidateShipCode(string code)
        {

            var result = await IShipService.ValidateShipCode(code);

            if (result.IsSuccess)
                return Ok(result.isValid);

            return BadRequest(result.ErrorMessage);
        }
    }
}
