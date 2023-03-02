using System.Text.Json.Serialization;

namespace doggies_week2.Models;

public class DogsResult
{
    public Dog[] Dogs { get; }
    public int Count { get; }

    [JsonConstructor]
    public DogsResult(IEnumerable<Dog> dogs, int count)
    {
        Dogs = dogs.ToArray();
        Count = count;
    }
}