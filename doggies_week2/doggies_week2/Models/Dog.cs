using System.Text.Json.Serialization;

namespace doggies_week2.Models;

public class Dog
{
    [JsonConstructor]
    public Dog(int id, string? breedName, int minWeight, int maxWeight,
        int minHeight, int maxHeight, int minAge, int maxAge, string? bredFor, string? imageUrl)
    {
        Id = id;
        BreedName = breedName;
        MinWeight = minWeight;
        MaxWeight = maxWeight;
        MinHeight = minHeight;
        MaxHeight = maxHeight;
        MinAge = minAge;
        MaxAge = maxAge;
        BredFor = bredFor;
        ImageUrl = imageUrl;
    }

    public Dog() { }

    public int Id { get; }
    public string? BreedName { get; }
    public int MinWeight { get; }
    public int MaxWeight { get; }
    public int MinHeight { get; }
    public int MaxHeight { get;}
    public int MinAge { get; }
    public int MaxAge { get; }
    public string? BredFor { get; }
    public string? ImageUrl { get; }
}