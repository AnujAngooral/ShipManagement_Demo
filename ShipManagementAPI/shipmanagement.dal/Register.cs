using Dal.Impl;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using shipmanagement.dal.Interface;
using System;
using System.Collections.Generic;
using System.Text;

namespace shipmanagement.dal
{
    public static class Register
    {
        public static void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<ShipManagementDbContext>(opt =>
                                                   opt.UseInMemoryDatabase("ShipManagement"));
            services.AddScoped<IShipRepository, ShipRepository>();
        }
    }
}
