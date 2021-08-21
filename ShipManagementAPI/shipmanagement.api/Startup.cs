using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using shipmanagement.services;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;

namespace shipmanagement.api
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {// Add CORS policy
            services.AddCors(options =>
            {
                options.AddPolicy("crossOrigin",
                builder =>
                {
                    // Not a permanent solution, but just trying to isolate the problem
                    builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
                });
            });

            services.AddControllers();
            Registration.ConfigureServices(services);
            services.AddSwaggerGen();
            //services.AddSwaggerGen(c => {
            //    c.SwaggerDoc("v1.0", new Microsoft.OpenApi.Models.OpenApiInfo
            //    {
            //        Title = "My APIs",
            //        Version = "v1.0",
            //        Description = "REST APIs "
            //    });


            //    var xmlfile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
            //    var xmlpath = Path.Combine(AppContext.BaseDirectory, xmlfile);
            //    c.IncludeXmlComments(xmlpath);
            //});
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            string baseApiUrl = Configuration.GetSection("BaseApiUrl").Value;
            app.UseSwagger();
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/error");
            }
            // Hook in the global error-handling middleware
            app.UseSwaggerUI(c =>
            {
                // For Debug in Kestrel
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "Ship Management V1");

                // To deploy on IIS
                //    c.SwaggerEndpoint("" + baseApiUrl + "/swagger/v1/swagger.json", "My API V1");
                // c.SwaggerEndpoint("../swagger/v1/swagger.json", "MyAPI V1");

            });

            app.UseRouting();
            // Use the CORS policy
            app.UseCors("crossOrigin"); // second

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
