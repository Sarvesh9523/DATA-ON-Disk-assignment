export default function OrderForm({ onSubmit }) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className="mt-4 flex flex-col gap-2"
    >
      <input type="text" placeholder="Your Name" required className="border p-2 rounded" />
      <input type="text" placeholder="Address" required className="border p-2 rounded" />
      <button type="submit" className="bg-green-500 text-white p-2 rounded">Place Order</button>
    </form>
  );
}
