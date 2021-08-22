using FluentAssertions;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using Xunit;

namespace shipmanagement.integrationtest
{
    [TestCaseOrderer("shipmanagement.integrationtest.PriorityOrderer", "shipmanagement.integrationtest")]
    public class ShipControllerTests : MyApplicationFactory
    {

        [Fact, TestPriority(0)]
        public async Task GetAll_Ships()
        {

            var client = this.CreateDefaultClient();

            var response = await client.GetAsync("/api/ship");

            response.StatusCode.Should().Be(System.Net.HttpStatusCode.OK);

            List<Ship> ships = await Newtonsoft.Json.JsonConvert.DeserializeObjectAsync<List<Ship>>
                                    (await response.Content.ReadAsStringAsync());

        }

        [Fact, TestPriority(1)]
        public async Task Create_Ships()
        {
            Ship newship = new Ship
            {
                Code = "AAAA-1111-A1",
                Length = 12,
                Width = 12,
                Name = "HPC Ship"
            };

            var client = this.CreateDefaultClient();

            var response = await client.PostAsync("/api/ship", new StringContent(JsonSerializer.Serialize(newship), Encoding.UTF8, "application/json"));

            response.StatusCode.Should().Be(System.Net.HttpStatusCode.Created);


        }

        [Fact, TestPriority(2)]
        public async Task Get_Ship()
        {
            var client = this.CreateDefaultClient();

            var response = await client.GetAsync($"/api/ship/{1}");
            var dtoShip = await Newtonsoft.Json.JsonConvert.DeserializeObjectAsync<Ship>(await response.Content.ReadAsStringAsync());
            response.StatusCode.Should().Be(System.Net.HttpStatusCode.OK);

            dtoShip.Should().NotBeNull();
        }

        [Fact, TestPriority(3)]
        public async Task Delete_Ships()
        {
            var client = this.CreateDefaultClient();

            var response = await client.DeleteAsync($"/api/ship/{1}");

           
            response.StatusCode.Should().Be(System.Net.HttpStatusCode.NoContent);

           

        }

        


        [Fact, TestPriority(4)]
        public async Task Update_Ships()
        {
            Ship newship;
            Ship updatedShip;
            Ship dtoShip;
            using (var client = this.CreateDefaultClient())
            {
                newship = new Ship
                {
                    Code = "AAAA-1111-A1",
                    Length = 12,
                    Width = 12,
                    Name = "HPC Ship"
                };
                await client.PostAsync("/api/ship",
                    new StringContent(JsonSerializer.Serialize(newship), Encoding.UTF8, "application/json"));
            }

            using (var client = this.CreateDefaultClient())
            {
                updatedShip = newship;
                updatedShip.Id = 2;
                updatedShip.Name = "HPC Ship2";
                updatedShip.Length = 13;
                updatedShip.Width = 13;
                updatedShip.Code = "AAAA-1111-B1";

                var response = await client.PutAsync($"/api/ship/{2}",
                    new StringContent(JsonSerializer.Serialize(updatedShip), Encoding.UTF8, "application/json"));

                dtoShip = await Newtonsoft.Json.JsonConvert.DeserializeObjectAsync<Ship>(await response.Content.ReadAsStringAsync());

                response.StatusCode.Should().Be(System.Net.HttpStatusCode.OK);
            }


            dtoShip.Id.Should().BeLessOrEqualTo(updatedShip.Id);
            dtoShip.Name.Should().Be(updatedShip.Name);
            dtoShip.Length.Should().BeLessOrEqualTo(updatedShip.Length);
            dtoShip.Width.Should().BeLessOrEqualTo(updatedShip.Width);
            dtoShip.Code.Should().Be(updatedShip.Code);


        }
    }
}
