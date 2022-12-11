namespace FlixOne.InventoryManagement.Repository;


public class Inventory {
    int _quantity;
    private Object _lock = new Object();

    public void RemoveQuantity(int amount){
        lock (_lock){
            if(_quantity - amount < 0){
                throw new Exception("Cannot remove more than we have!");
            }
            _quantity -= amount;
        }
    }
}