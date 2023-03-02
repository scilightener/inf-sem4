namespace patternBuilderFeb25;

public class BurgerBuilder
{
    private readonly Burger _burger = new();

    public void AddCutlet() => _burger.Add(new Cutlet());

    public void AddSalad() => _burger.Add(new Salad());

    public void AddBread() => _burger.Add(new Bread());

    public void AddCheese() => _burger.Add(new Cheese());

    public void Fry() => _burger.Fry();

    public void Pack() => _burger.Pack();

    public Burger Build() => _burger.Build();
}