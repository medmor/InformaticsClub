namespace ObserverPattern;

class Observer {
    private ConsoleColor _color;
    public Observer (ConsoleColor color){
        _color = color;
    }

    internal void ObserverQuantity(int quantity){
        Console.ForegroundColor = _color;
        Console.WriteLine($"I observer the new quantity value of {quantity}.");
        Console.ForegroundColor = ConsoleColor.White;
        {
            
        }
    }
}