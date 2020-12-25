using System.Collections.Generic;
using System.Threading.Tasks;
using Vega.Core.Models;

namespace Vega.Core
{
    public interface IVehicleRepository
    {
         Task<Vehicle> GetVehicle(int id, bool includeRelated = true);
         Task<QueryResult<Vehicle>> GetVehicles(VehicleQuery queryObj);
         void Add(Vehicle vehicle);
         void Remove(Vehicle vehicle);
    }
}