import { useState } from "react";
import { RadioGroup } from "@headlessui/react";
import { doc, updateDoc } from "firebase/firestore";
import db from "../../firebase/config";
import { Notify } from "notiflix";

const orderStatus = [
  { name: "Placed" },
  { name: "Processing" },
  { name: "Shipped" },
  { name: "Delivered" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const OrderStatusForm = ({ order }) => {
  const [status, setStatus] = useState(order.orderStatus.status);

  const updateStatus = async (e) => {
    const today = new Date();
    const date = today.toDateString();
    const time = today.toLocaleTimeString();
    setStatus(e);
    try {
        const orderRef = doc(db, "orders", order.id);

        await updateDoc(orderRef, {
            orderStatus: {
                status: e,
                date: date,
                time: time,
            }
        }).then(() => {
            Notify.success(`Order status changed to ${e}`);
        })


    } catch (error) {
        Notify.failure(error.message);
    }
  };

  return (
    <div>
      <RadioGroup
        value={status}
        onChange={(e) => updateStatus(e)}
        className="mt-2"
      >
        <RadioGroup.Label className="sr-only">
          Change a order status
        </RadioGroup.Label>
        <div className="flex space-x-3">
          {orderStatus.map((option) => (
            <RadioGroup.Option
              key={option.name}
              value={option.name}
              className={({ active, checked }) =>
                classNames(
                  option.name === status
                    ? "cursor-pointer focus:outline-none"
                    : "",
                  active ? "ring-2 ring-offset-2 ring-purple-500" : "",
                  checked
                    ? "bg-purple-600 border-transparent text-white hover:bg-purple-700"
                    : "bg-white border-gray-200 text-gray-900 hover:bg-gray-50",
                  "border rounded-md py-3 px-3 flex items-center justify-center text-sm font-medium uppercase sm:flex-1 cursor-pointer"
                )
              }
            >
              <RadioGroup.Label as="p">{option.name}</RadioGroup.Label>
            </RadioGroup.Option>
          ))}
        </div>
      </RadioGroup>
    </div>
  );
};

export default OrderStatusForm;
