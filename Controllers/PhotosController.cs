using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Vega.Controllers.Resources;
using Vega.Core;
using Vega.Core.Models;

namespace Vega.Controllers
{
    [Route("/api/vehicles/{vehicleId}/photos")]
    public class PhotosController : Controller
    {
        private readonly IWebHostEnvironment host;
        private readonly IMapper mapper;
        private readonly IVehicleRepository repository;
        private readonly IPhotoRepository photoRepository;
        private readonly IUnitOfWork unitOfWork;
        private readonly PhotoSettings photoSettings;

        public PhotosController(IWebHostEnvironment host, IMapper mapper,
        IVehicleRepository repository, IPhotoRepository photoRepository, IUnitOfWork unitOfWork,IOptionsSnapshot<PhotoSettings> options)
        {
            this.photoSettings = options.Value;
            this.unitOfWork = unitOfWork;
            this.repository = repository;
            this.photoRepository = photoRepository;
            this.mapper = mapper;
            this.host = host;
        }

        [HttpGet]
        public async Task<IActionResult> GetPhotos(int vehicleId)
        {
            var photos = await photoRepository.GetPhotos(vehicleId);             
            return Ok(mapper.Map<IEnumerable<Photo>,IEnumerable<PhotoResource>>(photos));
        }

        [HttpPost]
        public async Task<IActionResult> Upload(int vehicleId, IFormFile file)
        {
            var vehicle = await repository.GetVehicle(vehicleId,includeRelated: false);

            if(vehicle == null)
                return NotFound();

            if(file == null)    return BadRequest("Null File.");
            if(file.Length == 0)    return BadRequest("Empty File.");
            if(file.Length > photoSettings.MaxBytes)    return BadRequest("Max File Size Exceeded.");
            if(!photoSettings.IsSupported(file.FileName))    
                return BadRequest("Invalid File Type.");

            var uploadsFolderPath = Path.Combine(host.WebRootPath, "uploads");
            if (!Directory.Exists(uploadsFolderPath))
                Directory.CreateDirectory(uploadsFolderPath);

            var fileName = Guid.NewGuid().ToString() + Path.GetExtension(file.FileName);
            var filePath = Path.Combine(uploadsFolderPath, fileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            var photo = new Photo { FileName = fileName };
            vehicle.Photos.Add(photo);
            await unitOfWork.CompleteAsync();

            return Ok(mapper.Map<Photo,PhotoResource>(photo));
        }
    }
}