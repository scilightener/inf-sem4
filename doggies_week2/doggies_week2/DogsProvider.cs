using System.Collections.Immutable;
using System.Text.Json;
using doggies_week2.Models;

namespace doggies_week2;

public static class DogsProvider
{
    private static readonly ImmutableDictionary<int, Dog> Dogs = LoadDogs();
    
    private static ImmutableDictionary<int, Dog> LoadDogs()
    {
        var loadedDogs = new Dictionary<int, Dog>();
        using var fs = new FileStream("myBreeds.json", FileMode.Open);
        var dogsList = JsonSerializer.Deserialize<List<Dog>>(fs) ?? new List<Dog>();
        foreach (var dog in dogsList)
            loadedDogs[dog.Id] = dog;
        return loadedDogs.ToImmutableDictionary();
    }

    public static IEnumerable<Dog> GetAll() => Dogs.Values;

    public static Dog GetById(int id) => Dogs.TryGetValue(id, out var value) ? value : new Dog();

    public static DogsResult GetWithFilters(string beginLetter, string endLetter,
        int beginWeight, int endWeight,
        int beginHeight, int endHeight,
        int beginAge, int endAge,
        int pageId, int pageSize)
    {
        var dogs = Dogs.Values
            .Where(dog => dog.BreedName.FirstOrDefault().CompareTo(beginLetter.FirstOrDefault()) >= 0 &&
                          dog.BreedName.FirstOrDefault().CompareTo(endLetter.FirstOrDefault()) <= 0)
            .Where(dog => beginWeight <= dog.AvgWeight &&
                          dog.AvgWeight <= endWeight)
            .Where(dog => beginHeight <= dog.AvgHeight &&
                          dog.AvgHeight <= endHeight)
            .Where(dog => beginAge <= dog.AvgAge &&
                          dog.AvgAge <= endAge);
        var count = dogs.Count();
        dogs = dogs.Skip((pageId - 1) * pageSize).Take(pageSize);
        return new DogsResult(dogs, count);
    }
}
