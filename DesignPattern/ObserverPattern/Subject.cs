namespace ObserverPattern;

class Subject {
    private int _quantity;

    public event QuantityUpdated? OnQuantityUpdated;

    public void UpdateQuantity(int value){
        _quantity += value;
        
        OnQuantityUpdated?.Invoke(value);
    }
}

public delegate void QuantityUpdated(int quantity);