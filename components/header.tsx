"use client";


import { client } from '@/sanity/lib/client';
import { ClerkLoaded, SignInButton, UserButton, useUser } from '@clerk/nextjs'
import { PackageIcon, TrolleyIcon } from '@sanity/icons';


 function header() {
    const { user } = useUser();
    // console.log(user);

    const createClerkPasskey = async ()=> {
        try{
            const response = await user?.createPasskey();
            console.log(response);
        }catch(error) {
            console.error("Error",JSON.stringify(error,null,2));
        }

    }


  return (
    <header className='
    flex flex-wrap
     justify-between 
     items-center 
     px-4 
     py-2'>
        {/* Top row */}
        <div className='flex w-full flex-wrap justify-between items-center'>
    <a  href ="/" className='
    text-2xl
     font-bold
     text-blue-500 
     hover:opacity-50
      cursor-pointer 
     mx-auto
      sm:mx-0
    '>
        Shpr
        </a>
        <form action="/search" className='
        w-full
         sm:w-auto
          sm:flex-1 
          sm:mx-4
           mt-2
            sm:mt-0'>
            <input type="text" name='query' placeholder='Search for products' 
            className='
            bg-gray-100
             text-gray-800
              px-4 
              py-2
             rounded
              focus:outline-none 
              focus:ring-2
               focus:ring-blue-600
            focus:opacity-50
             border
              w-full 
             max-w-4xl
             '
            />

        </form>
        <div className='flex items-center space-x-4 mt-4 sm:mt-0 flex-1 sm:flex-none'>
    <a 
        href='/Basket' 
        className='
        flex-1 relative 
        flex justify-center 
        sm:justify-start
         sm:flex-none 
         items-center 
         space-x-2
          bg-blue-500
          hover:bg-blue-700
           text-white 
           font-bold 
           py-2 
           px-4 rounded'
    >
        <TrolleyIcon className='w-6 h-6'/>
        <span>My Basket</span>
    </a>
    <ClerkLoaded>
        {user && (
            <a href='/orders'
            className='
            flex-1 relative
             flex justify-center 
             sm:justify-start 
             sm:flex-none
              items-center
              space-x-2
               bg-blue-500
             hover:bg-blue-700
              text-white 
              font-bold 
              py-2 
              px-4 
              rounded'
              >
                <PackageIcon className='w-6 h-6'/>
                <span>My Orders</span>              
             </a>
        )}

        {user ? (
            <div className='flex items-center space-x-2'>
                <UserButton/>
                <div className='hidden sm:block text-xs'>
                    <p className='text-gray-400'>Welcome Back</p>
                    <p className='font-bold'>{user.fullName} ! </p>

                </div>

            </div>
        ) : (
            <SignInButton mode='modal'/>

        )}
        
       {user?.passkeys.length === 0 && (
        <button
        onClick={createClerkPasskey}
        className='bg-white
        hover:bg-blue-700
        hover:text-white
        animate-pulse
        text-blue-500
        font-bold
        py-2
        px-4
        rounded
        border-blue-300 border'>
            Create passkey
        </button>
       )}



    </ClerkLoaded>
</div>

    </div>

    </header>
  )
}

export default header;

