namespace DecoratorPattern;

class ErrorDecorator : MessageDecorator
{
    public ErrorDecorator(Message message) : base(message) {}
    public override void PrintMessage()
    {
        Console.ForegroundColor = ConsoleColor.Red;
        _message.PrintMessage();
        Console.ForegroundColor = ConsoleColor.White;
    }
}