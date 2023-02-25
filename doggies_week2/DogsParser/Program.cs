using System.Text.Json;
using doggies_week2.Models;
using DogsParser;

await using var outerDogs = new FileStream("breeds.json", FileMode.Open);
var dogs = await JsonSerializer.DeserializeAsync<List<DogInitial>>(outerDogs) ?? new List<DogInitial>();
var newDogs = new List<Dog>(dogs.Count);
foreach (var dog in dogs)
{
    var (minW, maxW) = GetNumberRange(dog.weight.metric);
    var (minH, maxH) = GetNumberRange(dog.height.metric);
    var (minA, maxA) = GetNumberRange(dog.life_span);
    newDogs.Add(new Dog(dog.id, dog.name, minW, maxW,
        minH, maxH, minA, maxA, dog.bred_for, dog.image.url));
}

await using var myDogs = new FileStream("myBreeds.json", FileMode.Create);
await JsonSerializer.SerializeAsync(myDogs, newDogs);

static (int min, int max) GetNumberRange(string s)
{
    var nums = MyRegex().Matches(s);
    if (nums.Count == 0) return (0, 0);
    if (nums.Count == 1)
    {
        var ret = int.Parse(nums[0].Value);
        return (ret, ret);
    }

    var a = int.Parse(nums[0].Value);
    var b = int.Parse(nums[1].Value);
    if (a > b) (a, b) = (b, a);
    return (a, b);
}

internal partial class Program
{
    [System.Text.RegularExpressions.GeneratedRegex("\\d+")]
    private static partial System.Text.RegularExpressions.Regex MyRegex();
}
