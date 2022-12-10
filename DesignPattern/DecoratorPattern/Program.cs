using System;

namespace DecoratorPattern;
					
public class Program
{
	public static void Main()
	{
		var simpleMessage = new SimpleMessage("any text");
		var alertMessage = new AlertMessage("any text");
		simpleMessage.PrintMessage();
		alertMessage.PrintMessage();

		var normalDecorator = new NormalDecorator(simpleMessage);
		var errorDecorator = new ErrorDecorator(alertMessage);

		normalDecorator.PrintMessage();
		errorDecorator.PrintMessage();
	}
}
