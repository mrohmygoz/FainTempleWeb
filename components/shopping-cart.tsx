import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useContext } from 'react'
import { AiOutlineClose } from 'react-icons/ai';
import { CartContext } from '../context/shop-context';
import ShoppingCartItem from './shopping-cart-item';
import ShoppingCartSummary from './shopping-cart-summary';

export default function ShoppingCart({ cart }) {
  const { cartOpen, setCartOpen } = useContext(CartContext)

  return (
    <Transition.Root show={cartOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-50 overflow-hidden"
        onClose={() => setCartOpen(false)}
      >
        <div className='absolute inset-0 overflow-hidden'>
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="absolute inset-0 transition-opacity bg-gray-500 bg-opacity-75" />
          </Transition.Child>

          <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <div className="w-screen max-w-md">
                <div className="flex flex-col h-full overflow-y-scroll bg-white shadow-xl">
                  <div className="flex-1 px-4 py-6 overflow-y-auto sm:px-6">
                    <div className="flex items-start justify-between">
                      <Dialog.Title className="text-2xl tracking-widest">
                        購物車
                      </Dialog.Title>
                      <div className="flex items-center ml-3 h-7">
                        <button
                          onClick={() => setCartOpen(false)}
                        >
                          <AiOutlineClose className='hover:bg-slate-200' />
                        </button>
                      </div>
                    </div>

                    <div className='mt-8'>
                      <div className='flow-root'>
                        {
                          cart.length > 0 ?
                            <ul role="list" className="-my-6 divide-y divide-[#433e48]">
                              {cart.map((cartProduct) => (
                                <ShoppingCartItem cartProduct={cartProduct} />
                              ))}
                            </ul>
                          : <div>
                              <p className='text-lg'>您的購物車目前尚無任何商品！</p>
                            </div>
                        }
                      </div>
                    </div>
                  </div>

                  {
                    cart.length > 0 ?
                      <ShoppingCartSummary cart={cart} />
                    : null
                  }
                </div>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}