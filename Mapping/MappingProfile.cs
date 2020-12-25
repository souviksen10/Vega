using System.Linq;
using AutoMapper;
using Vega.Controllers.Resources;
using Vega.Core.Models;

namespace Vega.Mapping
{
    public class MappingProfile:Profile
    {
        public MappingProfile()
        {   
            //Domain to APIResource
            CreateMap<Photo,PhotoResource>();
            CreateMap(typeof(QueryResult<>),typeof(QueryResultResource<>));
            CreateMap<Make,MakeResource>();  
            CreateMap<Make,KeyValuePairResource>();           
            CreateMap<Model,KeyValuePairResource>();
            CreateMap<Feature,KeyValuePairResource>();
            CreateMap<Vehicle,SaveVehicleResource>()
            .ForMember(vr => vr.Contact,
             opt => opt.MapFrom(v => new ContactResource
                                        {ContactName = v.ContactName, 
                                        ContactEmail = v.ContactEmail, 
                                        ContactPhone = v.ContactPhone}))
            .ForMember(vr => vr.Features, opt => opt.MapFrom(v => v.Features.Select(vf => vf.FeatureId)));
            CreateMap<Vehicle,VehicleResource>()
            .ForMember(vr => vr.Make, opt => opt.MapFrom(v => v.Model.Make))
            .ForMember(vr => vr.Contact,
             opt => opt.MapFrom(v => new ContactResource
                                        {ContactName = v.ContactName, 
                                        ContactEmail = v.ContactEmail, 
                                        ContactPhone = v.ContactPhone}))
            .ForMember(vr => vr.Features, opt => opt.MapFrom(v => v.Features.Select(vf => new KeyValuePairResource{Id = vf.Feature.Id, Name = vf.Feature.Name})));

            //API Resource to Domain
            CreateMap<VehicleQueryResource,VehicleQuery>();
            CreateMap<SaveVehicleResource,Vehicle>()
            .ForMember(v =>v.Id, opt => opt.Ignore())
            .ForMember(v => v.ContactName, opt => opt.MapFrom(vr => vr.Contact.ContactName))
            .ForMember(v => v.ContactPhone, opt => opt.MapFrom(vr => vr.Contact.ContactPhone))
            .ForMember(v => v.ContactEmail, opt => opt.MapFrom(vr => vr.Contact.ContactEmail))
            .ForMember(v => v.Features, opt => opt.Ignore())
            .AfterMap((vr,v) => {
                //Remove unselected features
                var unselectedFeatures = v.Features.Where(f => !vr.Features.Contains(f.FeatureId)).ToList();
                foreach (var f in unselectedFeatures)                
                    v.Features.Remove(f);                   

                //Add selected features
                var addedFeatures = vr.Features.Where(id => !v.Features.Any(vf => vf.FeatureId == id)).Select(id => new VehicleFeature{FeatureId = id}).ToList();
                foreach (var f in addedFeatures)                
                    v.Features.Add(f);   
            });
        }
    }
}