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

    public static IEnumerable<Dog> GetWithFilters(int pageId, int pageSize)
    {
        return Dogs.Values.Skip((pageId - 1) * pageSize).Take(pageSize);
    }
}
