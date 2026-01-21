const SelectBox = ({ label, register, options, error, onChange }) => {
	return (
		<div className="flex flex-col">
            {label && (
                <label className="mb-1.5 text-sm font-semibold text-slate-700 ml-1">
                    {label}
                </label>
            )}
			<div className='relative'>
				{/* Note: Icon prop is removed from usage to match Admin design, but kept in signature if passed to avoid errors, or we can just ignore it */}
				<select
					{...register}
					onChange={e => {
                        if (register && register.onChange) register.onChange(e);
						onChange && onChange(e)
					}}
					className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all placeholder:text-slate-400 text-slate-700 appearance-none"
				>
					<option value=''>Choose a {label}</option>
					{options?.map(option => (
						<option key={option.value} value={option.value}>
							{option.label}
						</option>
					))}
				</select>
                {/* Add a custom arrow if needed, or rely on browser default. standard admin uses browser default usually or a specific icon. for now appearance-none needs an icon or we allow default appearance. AdminAddCollege uses appearance-none but I don't see an icon added. I will use standard appearance for now or rely on specific CSS */}
			</div>
			
            {error && <div className="text-rose-500 text-xs mt-1 ml-1">{error.message || error}</div>}
		</div>
	)
}

export default SelectBox
