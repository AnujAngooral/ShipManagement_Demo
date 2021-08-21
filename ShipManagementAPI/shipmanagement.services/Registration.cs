using AutoMapper;
using Microsoft.Extensions.DependencyInjection;
using shipmanagement.dal;
using shipmanagement.services.Impl;
using shipmanagement.services.Interface;

namespace shipmanagement.services
{
   public class Registration
    {/// <summary>
     /// 
     /// </summary>
     /// <param name="services"></param>
        public static void ConfigureServices(IServiceCollection services)
        {
            services.AddScoped<IShipService, ShipService>();

            Register.ConfigureServices(services);

            var mapperConfig = new MapperConfiguration(mc =>
            {
                mc.AddProfile(new MappingProfile());
            });

            IMapper mapper = mapperConfig.CreateMapper();
            services.AddSingleton(mapper);
        }
    }

    public class MappingProfile : Profile
    {
        public MappingProfile()
        {

            CreateMap<shipmanagement.viewmodels.Ship, shipmanagement.dal.dto.Ship>();
            CreateMap<shipmanagement.dal.dto.Ship, shipmanagement.viewmodels.Ship>();


        }
    }
}
