namespace patternBuilderFeb25;

using System.Text;

public class Burger : Ingredient
{
    private List<Ingredient> _parts = new();

    public Burger() {}

    public Burger(List<Ingredient> ingredients) => _parts = ingredients;

    public void Add(Ingredient part)
    {
        _parts.Add(part);
        Price += part.Price;
    }

    public void Fry()
    {
        if (_parts.Count > 0) _parts[^1].IsFried = true;
    }

    public void Pack()
    {
        var newBurger = new Burger(_parts) {IsPacked = true};
        _parts = new List<Ingredient> { newBurger };
    }

    public string Log(int nestedness = -1)
    {
        var output = new StringBuilder();
        foreach (var ingredient in _parts)
            if (ingredient is Burger burger)
                output.Append(new string(' ', 2 * nestedness + 2) + "packed\n" +
                              burger.Log(nestedness + 1) +
                              new string(' ', 2 * nestedness + 2) + "packed\n");
            else output.Append(new string(' ', 2 * nestedness + 2) + ingredient + "\n");

        return output.ToString();
    }
        
    public Burger Build() => this;
}