
namespace DecoratorPattern;

abstract class Message : IMessage {
	protected string _text;
	public Message(string text) {
		_text = text;
	}
	abstract public void PrintMessage();
}