using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.AzureADB2C.UI;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using WebToolDataAccess;
using Microsoft.EntityFrameworkCore;
using WebToolDataAccess.Interfaces;
using WebToolDataAccess.Repositories;
using WebTool.Service.Interfaces;
using WebTool.Service.Concrete;
using AutoMapper;
using WebApi;
using Newtonsoft.Json.Serialization;
using Newtonsoft.Json;
using System.Security.Claims;
using Serilog;
using Serilog.Context;

namespace WordHeroAPI
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
        {
            services.AddAuthentication(AzureADB2CDefaults.BearerAuthenticationScheme)
                .AddAzureADB2CBearer(options => Configuration.Bind("AzureAdB2C", options));


            services.AddControllers().AddNewtonsoftJson(options =>
            {
                options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
            }
           );

            services.AddDbContext<DatabaseContext>(options =>
            {
                options.UseLazyLoadingProxies(false).UseSqlServer(Configuration.GetConnectionString("DefaultConnection"));
            });

            SetUpDI(services);


            services.AddCors(o => o.AddPolicy("MyPolicy", builder =>
            {
                builder.AllowAnyOrigin()
                    .AllowAnyMethod()
                    .AllowAnyHeader();
            }));



            var mappingConfig = new MapperConfiguration(mc =>
            {
                mc.AddProfile(new MappingProfile());
            });
            IMapper mapper = mappingConfig.CreateMapper();
            services.AddSingleton(mapper);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            //app.UseHttpsRedirection();

            app.UseRouting();

            app.UseCors("MyPolicy");

            app.UseAuthentication();
            app.UseAuthorization();


            app.Use(async (httpContext, next) =>
            {
                var claims = httpContext.User as ClaimsPrincipal;
                var userId = claims.Claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value;
                LogContext.PushProperty("userGuid", userId);
                await next.Invoke();
            });

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

        }


        private void SetUpDI(IServiceCollection services)
        {
            services.AddScoped<IWordHeroRepository, WordHeroRepository>();
            services.AddScoped<IDashboardRepository, DashboardRepository>();

            services.AddScoped<IWordHeroService, WordHeroService>();
            services.AddScoped<ITeacherDashboardService, TeacherDashboardService>();

            services.AddScoped<IWordHeroShareService, WordHeroShareService>();
            services.AddScoped<IWordHeroShareRepository, WordHeroShareRepository>();

            services.AddScoped<IWordHeroExerciseService, WordHeroExerciseService>();

        }

    }
}
