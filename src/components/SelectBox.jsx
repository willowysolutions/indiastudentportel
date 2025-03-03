const SelectBox = ({ label, register, options, error, Icon, onChange }) => {
	return (
		<div className=''>
			<div className='flex border-blue-500 border rounded-md'>
				<div className='flex items-center  p-3 border-r'>
					<Icon className='w-5 h-5' />
				</div>
				{/* Merge custom onChange with register's onChange */}
				<select
					{...register}
					onChange={e => {
						register.onChange(e) // react-hook-form's onChange
						onChange && onChange(e) // custom onChange
					}}
					className=' border rounded-md border-blue-300 text-gray-900 text-sm focus:border-blue-500 block w-full p-2.5 outline-none'
				>
					<option value=''>Choose a {label}</option>
					{options?.map(option => (
						<option key={option.value} value={option.value}>
							{option.label}
						</option>
					))}
				</select>
			</div>
			<div className='flex justify-end'>
				{error && (
					<p className='mt-2 text-[.8rem] text-red-600'>{error.message}</p>
				)}
			</div>
		</div>
	)
}

export default SelectBox
