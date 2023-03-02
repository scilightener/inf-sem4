using patternBuilderFeb25;

var builder = new BurgerBuilder();
builder.Pack();
builder.Pack();
builder.Pack();
builder.AddCutlet();
builder.AddBread();
builder.AddCutlet();
builder.AddCutlet();
builder.Pack();
builder.AddSalad();
builder.Pack();
var burger = builder.Build();
Console.WriteLine(burger.Log());
Console.WriteLine($"Total price is {burger.Price}");