import React from 'react'

export default function Input({
   name = 'input',
   label = name,
   onChange,
   value,
   isRequired = false,
   disabled = false,
   ...props
}) {
   const enabledInput =
      'peer block w-full appearance-none rounded-t-lg border-b border-gray-500 bg-gray-100 px-2.5 pb-2.5 pt-4 text-sm text-gray-700 hover:bg-white focus:border-blue-600 focus:bg-inherit focus:outline-none focus:ring-0'
   const disabledInput =
      'peer block w-full appearance-none rounded-t-lg border-b border-gray-300 bg-gray-100 px-2.5 pb-2.5 pt-4 text-sm text-gray-500'

   const enabledLabel =
      'peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:bg-inherit peer-focus:px-2 peer-focus:text-blue-600'
   return (
      <div className="relative">
         <input
            type={props.type}
            name={name}
            value={value}
            onChange={onChange}
            className={!disabled ? enabledInput : disabledInput}
            placeholder={props.placeholder ? props.placeholder : ''}
            required={isRequired}
            disabled={disabled}
         />
         <label
            className={`absolute top-2 left-1 z-10 origin-[0] 
                     -translate-y-4 scale-75 transform bg-transparent 
                     px-2 text-sm text-gray-500 duration-300 
                     peer-placeholder-shown:top-1/2 
                     peer-placeholder-shown:-translate-y-1/2 
                     peer-placeholder-shown:scale-100 ${
                        !disabled ? enabledLabel : ''
                     }`}>
            {label}
         </label>
      </div>
   )
}
