namespace DecoratorPattern;

class NormalDecorator : MessageDecorator {
    public NormalDecorator(Message message) : base(message){}

    public override void PrintMessage()
    {
        Console.ForegroundColor = ConsoleColor.Green;
        _message.PrintMessage();
        Console.ForegroundColor = ConsoleColor.White;
    }
}