import { useContext, useState } from "react";
import { CartContext } from "../context/shop-context";
import { useForm, SubmitHandler } from "react-hook-form";
import CheckoutItem from "../components/checkout-item";
import { useRouter } from 'next/router'

type IFormInput = {
  fullName: string;
  email: string;
  country: string;
  city: string;
  postalCode: string;
  address: string;
}

const failMsg = '提交失敗，請重新提交，或聯絡我們。';
const wrongFormatMsg = '您的表單尚未填寫完成，或內容有誤。';

export default function Checkout() {
  const { clearCart } = useContext(CartContext)
  const { register, handleSubmit, formState:{errors} } = useForm<IFormInput>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter()

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      setIsSubmitting(true); // Set submitting state to true

      const body = JSON.parse(JSON.stringify(data));
      body.checkoutId = router.query.checkoutId;
      body.cartItems = router.query.cart;
      body.subTotal = router.query.subTotal;

      const res = await fetch('/api/send-mail', {
        method: 'POST',
        body: JSON.stringify(body)
      })
      if (res.ok) {
        alert('提交成功，付款方式將會寄至您的電子信箱！');
        clearCart();
        router.push('/');
      } else {
        alert(failMsg); // Show an error message
      }
    } catch (error) {
      console.error("send-mail API call failed: ", error);
      alert(failMsg); // Show an error message
    } finally {
      setIsSubmitting(false); // Reset submitting state
    }
  };

  const onError = (errors, e) => {
    alert(wrongFormatMsg)
  };

  const { cart } = useContext(CartContext)

  function getSubTotal() {
    let total = 0
    for (let i=0; i<cart.length; i++) {
      total += cart[i].product.price * cart[i].quantity
    }
    return total
  }

  return (
    <div className="w-screen min-h-screen flex justify-between">
      <div className="w-[6%]" />
      
      <div className="w-[48%] flex flex-col p-14 items-end">
        <div className="w-full flex flex-col">
          <div className="grid grid-cols-1 gap-2 text-lg">
            <div>
              感謝您選購我們的商品！
            </div>
            <div>
              請填寫以下表單，提交後將會有專人和您聯絡，謝謝！
            </div>
          </div>
          <form 
            className="flex flex-col" 
            onSubmit={handleSubmit(onSubmit, onError)}>
            <label>基本資料</label>
            <input 
              placeholder="中文全名"
              {...register("fullName", { required: '您尚未填寫中文全名' })} 
            />
            <input
              placeholder="電子郵件"
              {...register("email", {
                required: '您尚未填寫電子郵件', 
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i ,
                  message: '電子郵件格式錯誤'
                }
              })} 
            />
            <label>寄送地址</label>
            <input 
              placeholder="國家"
              {...register("country", { required: '您尚未填寫國家' })} 
            />
            <div className="grid grid-cols-2 gap-4">
              <input 
                placeholder="城市"
                {...register("city", { required: '您尚未填寫城市' })} 
              />
              <input 
                placeholder="郵遞區號"
                {...register("postalCode", { 
                  required: '您尚未填寫郵遞區號',
                  pattern: {
                    value: /^\d+$/i ,
                    message: '郵遞區號格式錯誤'
                  }
                })} 
              />
            </div>
            <input 
              placeholder="地址"
              {...register("address", { required: '您尚未填寫地址' })} 
            />
            <button type="submit"
                    className="w-full bg-black text-white hover:bg-gray-800 
                              p-2 mt-8 rounded-md shadow-sm text-lg">
              提交表單
            </button>
          </form>
        </div>
      </div>
      
      <div className="w-[40%] border-l-[0.5px] border-l-[#8a868d55] bg-[#8a868d11] 
                    flex flex-col p-14 justify-start">
        <ul role="list" className="-my-6">
          {cart.map((cartProduct) => (
            <CheckoutItem cartProduct={cartProduct} />
          ))}
        </ul>
        <div className="mt-16 py-8 flex justify-between text-xl border-t-[1px] border-[#433e48]">
          <span>
            台幣總計（不含運費）
          </span>
          <span>
            ${getSubTotal()}
          </span>
        </div>
      </div>
      
      <div className="w-[6%] bg-[#8a868d11]" />
    </div>
  )
}