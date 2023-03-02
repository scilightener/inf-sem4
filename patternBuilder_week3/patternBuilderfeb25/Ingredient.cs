namespace patternBuilderFeb25;

public abstract class Ingredient
{
    public int Price { get; set; }
    public bool IsFried { get; set; }
    public bool IsPacked { get; set; }
    public string Name { get; set; }

    public override string ToString() => Name + $" priced: {Price}" + (IsFried ? " fried" : "");
}