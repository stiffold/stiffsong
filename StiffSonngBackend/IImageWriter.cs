using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace StiffSonngBackend
{
    public interface IImageWriter
    {
        Task<string> UploadImage(IFormFile file);
    }
}