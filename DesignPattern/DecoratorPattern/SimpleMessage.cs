
namespace DecoratorPattern;

class SimpleMessage : Message {
	public SimpleMessage(string text) : base(text) {}
	public override void PrintMessage() {
		Console.WriteLine(_text);
	}
}