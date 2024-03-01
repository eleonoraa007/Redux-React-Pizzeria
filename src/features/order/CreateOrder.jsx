// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );

import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, getCart, getTotalCartPrice } from "../cart/cartSlice";
import EmptyCart from "../cart/EmptyCart";
import {createOrder} from "../../services/apiRestaurant";
import {formatCurrency} from "../../utils/helpers";
import store from "../../store";
import { useState } from "react";
import { fetchAddress } from "../user/userSlice";

function CreateOrder() {
  const navigation = useNavigation();
  const isSubmiting = navigation.state === "submitting";
  const {username, status: addressStatus, position, address, error: errorAddress} = useSelector(state => state.user);

  const isLoadingAddress = addressStatus === 'loading';

  const formErrors = useActionData();
  const dispatch = useDispatch();

  const [withPriority, setWithPriority] = useState(false);
  const cart = useSelector(getCart);
  const totalCartPrice = useSelector(getTotalCartPrice);
  const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0;
  const totalPrice = totalCartPrice + priorityPrice

  if(!cart.length) return <EmptyCart />

  return (
    <div className="py-6 px-4">
      <h2 className="mb-8 text-xl font-semibold">Ready to order? Lets go!</h2>

      {/* <Form method="POST" action="/order/new"> */}
      <Form method="POST">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <input className="input grow" type="text" name="customer" defaultValue={username} required />
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input className="input w-full" type="tel" name="phone" required />
            {formErrors?.phone && <p className="text-xs mt-2 p-2 text-red-700 bg-red-100 rounded-md">{formErrors.phone}</p>}
          </div>
        </div>

        {/* Button is absolute and the closest parent is relative */}
        
        {/* If we don't declare pixels in border, by default it is 1px */}
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center relative">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input className="input w-full"
               type="text" name="address" disabled={isLoadingAddress}
               defaultValue={address} required />
               {addressStatus === 'error' && <p className="text-xs mt-2 p-2 text-red-700 bg-red-100 rounded-md">{errorAddress}</p>}
          </div>
          {!position.latitude && !position.longitude && (
            <span className="absolute z-50 right-1 top-[34px] sm:right-1 sm:top-[2.5px] md:top-[5px]">
              <Button disabled={isLoadingAddress} type="small" onClick={(e) => {
                  e.preventDefault();
                  dispatch(fetchAddress())
                }}>Get position</Button>
            </span>
          )}
        </div>

        <div className="mb-12 flex gap-5 items-center">
          <input
            className="h-6 w-6 accent-yellow-400 focus:outline-none
            focus:ring focus:ring-yellow-400 focus:ring-offset-2"
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority" className="font-medium">Want to yo give your order priority?</label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)}/>
          <input type="hidden" name="position" value={position.longitude && position.latitude ? `${position.latitude},${position.longitude}` : ""} />
          <Button disabled={isSubmiting || isLoadingAddress} type="primary">
            {isSubmiting ? 'Placing order...': `Order now from ${formatCurrency(totalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({request}) {
  const formData = await request.formData();
  //transforms list of "formData" into an Object (data)
  const data = Object.fromEntries(formData);

  const order = {
    ...data, 
    cart: JSON.parse(data.cart),
    priority: data.priority === "true",

  };

  const errors = {};
  if(!isValidPhone(order.phone)) errors.phone = "Please give us your correct" + 
   "phone number. We might need it to contact you.";
  
  if(Object.keys(errors).length > 0) return errors;

  //if everything is okay create new order and redirect
  const newOrder = await createOrder(order);

  store.dispatch(clearCart);

  return redirect(`/order/${newOrder.id}`);
  // return null;
}

export default CreateOrder;
