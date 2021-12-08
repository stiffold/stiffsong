using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore.Internal;

namespace StiffSonngBackend
{
    public class HeaderValidatorMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly List<string> allowedFiles = new List<string>{".js", ".html", ".ico", ".css", ".jpg"};
        

        public HeaderValidatorMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext context)
        {
            if (MustValidate(context.Request.Path.Value))
            {
                if (!context.Request.Headers.Keys.Contains("user-key"))
                {
                    context.Response.StatusCode = 400; //Bad Request                
                    await context.Response.WriteAsync("User Key is missing");
                    return;
                }

                if (context.Request.Headers["user-key"] != "stiff-song")
                {
                    context.Response.StatusCode = 401; //UnAuthorized
                    await context.Response.WriteAsync("Invalid User Key");
                    return;
                }
            }
            
            await _next.Invoke(context);  
        }

        private bool MustValidate(string pathValue)
        {
            if (pathValue == null) return false;
            if (pathValue == "/") return false;
            foreach (var allowed in allowedFiles)
            {
                if (pathValue.Contains(allowed)) return false;
            }

            return true;
        }
    }

    #region ExtensionMethod
    public static class UserKeyValidatorsExtension
    {
        public static IApplicationBuilder ApplyUserKeyValidation(this IApplicationBuilder app)
        {
            app.UseMiddleware<HeaderValidatorMiddleware>();
            return app;
        }
    }
    #endregion
}