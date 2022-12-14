import React, { FC, InputHTMLAttributes, ReactElement, useEffect } from 'react'
import { ErrorMessage, FieldAttributes, FieldProps, getIn, useField } from 'formik'
type TextFieldProps<T> = FieldAttributes<T> & {
    className?: string;
    extraElement?: ReactElement;
}


export const TextField: FC<TextFieldProps<any>> = ({
    className,
    extraElement,
    ...props
}) => {
    const [field, meta] = useField(props)
    // console.log(meta)
    return (
        <div className={`w-full ${meta.touched && meta.error ? 'mb-5' : 'mb-2'} h-[48px] text-left`}>
            <input {...props} autoComplete='off' aria-autocomplete='none' autoCorrect='off' {...field} className={`${className} focus:outline-none border-custom-dark border-2 h-full px-5 text-[#b9bbbe] text-base w-full rounded-md placeholder:text-[#b9bbbe]`} />
            {meta.touched && meta.error && <p className='mt-2 text-red-600 text-sm'>{meta.error == 'Required' ? 'This field is required' : meta.error}</p>}
            {extraElement}
        </div>
    )
}

export const CheckBoxField: FC<FieldProps & { className?: string }> = ({
    form,
    meta,
    field,
    className,
    ...props
}) => {
    return (
        <input
            {...props}
            {...field}
            autoComplete="off"
            type="checkbox"
            className={`
      ${className != undefined && className}
      text-discord-purple bg-discord-dark-2 border-transparent rounded focus:ring-0 ring-offset-slate-900 mr-1
      `}
        />
    )
}