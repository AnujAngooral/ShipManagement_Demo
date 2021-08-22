using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using shipmanagement.api;
using shipmanagement.dal;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;

namespace shipmanagement.integrationtest
{
    public class IntegrationTest: WebApplicationFactory<Startup>
    {
       protected readonly HttpClient client;

        
        protected IntegrationTest()
        {
            var factory = new WebApplicationFactory<Startup>();
                //.WithWebHostBuilder(builder =>
                //{

                //    builder.ConfigureServices(services =>
                //    {

                //        services.RemoveAll(typeof(ShipManagementDbContext));
                //        services.AddDbContext<ShipManagementDbContext>(opt =>
                //                                  opt.UseInMemoryDatabase("ShipManagement"));

                //    });
                //});
            client = factory. CreateDefaultClient();
        }
    }

    public class MyApplicationFactory : WebApplicationFactory<Startup>
    {
        protected override IWebHostBuilder CreateWebHostBuilder()
        {
            return WebHost.CreateDefaultBuilder();
        }

        protected override void ConfigureWebHost(IWebHostBuilder builder)
        {
            builder.UseStartup<Startup>();

            base.ConfigureWebHost(builder);
        }
    }
}
