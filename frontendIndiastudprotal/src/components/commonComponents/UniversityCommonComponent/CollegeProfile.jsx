import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";

function CollegeProfile() {
  return (
    <div className="p-6 md:p-8 w-full max-w-5xl mx-auto">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Header */}
        <div className="bg-slate-50 px-6 py-5 border-b border-slate-200 flex items-center justify-between">
           <div>
               <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                  <UserCircleIcon className="w-6 h-6 text-indigo-600" />
                  University Profile
               </h2>
               <p className="text-slate-500 text-xs mt-1">Manage public facing information.</p>
           </div>
        </div>

        <div className="p-6 md:p-8">
            <form>
             <div className="flex items-center gap-6 mb-8 bg-slate-50 p-4 rounded-xl border border-dashed border-slate-300">
                <UserCircleIcon
                  aria-hidden="true"
                  className="size-16 text-slate-300"
                />
                <button
                  type="button"
                  className="rounded-lg bg-white px-3 py-2 text-xs font-semibold text-slate-700 shadow-sm ring-1 ring-inset ring-slate-300 hover:bg-slate-50"
                >
                  Upload Logo
                </button>
              </div>
            <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-6 border-b border-slate-100 pb-8 mb-8">
              <div className="sm:col-span-3">
                <label
                  htmlFor="college-name"
                  className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5 ml-0.5"
                >
                  College Name
                </label>
                <div className="mt-1">
                  <input
                    id="college-name"
                    name="college-name"
                    type="text"
                    className="block w-full rounded-lg bg-slate-50 px-3 py-2 text-slate-700 shadow-sm ring-1 ring-inset ring-slate-200 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 border-0"
                  />
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="university-name"
                  className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5 ml-0.5"
                >
                  University
                </label>
                <div className="mt-1">
                  <input
                    id="university-name"
                    name="university-name"
                    type="text"
                    className="block w-full rounded-lg bg-slate-50 px-3 py-2 text-slate-700 shadow-sm ring-1 ring-inset ring-slate-200 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 border-0"
                  />
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="email"
                  className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5 ml-0.5"
                >
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    className="block w-full rounded-lg bg-slate-50 px-3 py-2 text-slate-700 shadow-sm ring-1 ring-inset ring-slate-200 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 border-0"
                  />
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="contact"
                  className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5 ml-0.5"
                >
                  Contact Number
                </label>
                <div className="mt-1">
                  <input
                    id="contact"
                    name="contact"
                    type="text"
                    className="block w-full rounded-lg bg-slate-50 px-3 py-2 text-slate-700 shadow-sm ring-1 ring-inset ring-slate-200 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 border-0"
                  />
                </div>
              </div>
              <div className="sm:col-span-2 sm:col-start-1">
                <label
                  htmlFor="ugc"
                  className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5 ml-0.5"
                >
                  UGC/NAAC/AICTE
                </label>
                <div className="mt-1">
                  <input
                    id="ugc"
                    name="ugc"
                    type="text"
                    className="block w-full rounded-lg bg-slate-50 px-3 py-2 text-slate-700 shadow-sm ring-1 ring-inset ring-slate-200 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 border-0"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="naac"
                  className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5 ml-0.5"
                >
                  NAAC Grade
                </label>
                <div className="mt-1">
                  <input
                    id="naac"
                    name="naac"
                    type="text"
                    className="block w-full rounded-lg bg-slate-50 px-3 py-2 text-slate-700 shadow-sm ring-1 ring-inset ring-slate-200 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 border-0"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="nirf"
                  className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5 ml-0.5"
                >
                  NIRF Ranking
                </label>
                <div className="mt-1">
                  <input
                    id="nirf"
                    name="nirf"
                    type="text"
                    className="block w-full rounded-lg bg-slate-50 px-3 py-2 text-slate-700 shadow-sm ring-1 ring-inset ring-slate-200 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 border-0"
                  />
                </div>
              </div>
              <div className="col-span-full">
                <label
                  htmlFor="street-address"
                  className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5 ml-0.5"
                >
                 Full address
                </label>
                <div className="mt-1">
                  <input
                    id="street-address"
                    name="street-address"
                    type="text"
                    autoComplete="street-address"
                    className="block w-full rounded-lg bg-slate-50 px-3 py-2 text-slate-700 shadow-sm ring-1 ring-inset ring-slate-200 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 border-0"
                  />
                </div>
              </div>
              <div className="sm:col-span-2 sm:col-start-1">
                <label
                  htmlFor="street"
                  className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5 ml-0.5"
                >
                  Street
                </label>
                <div className="mt-1">
                  <input
                    id="street"
                    name="street"
                    type="text"
                    className="block w-full rounded-lg bg-slate-50 px-3 py-2 text-slate-700 shadow-sm ring-1 ring-inset ring-slate-200 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 border-0"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="district"
                  className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5 ml-0.5"
                >
                  District
                </label>
                <div className="mt-1">
                  <input
                    id="district"
                    name="district"
                    type="text"
                    className="block w-full rounded-lg bg-slate-50 px-3 py-2 text-slate-700 shadow-sm ring-1 ring-inset ring-slate-200 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 border-0"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="state"
                  className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5 ml-0.5"
                >
                  State
                </label>
                <div className="mt-1 grid grid-cols-1">
                  <select
                    id="state"
                    name="state"
                    className="col-start-1 row-start-1 w-full appearance-none rounded-lg bg-slate-50 py-2 pr-8 pl-3 text-slate-700 outline-none ring-1 ring-inset ring-slate-200 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 border-0"
                  >
                    <option>United States</option>
                    <option>Canada</option>
                    <option>Mexico</option>
                  </select>
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="established-year"
                  className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5 ml-0.5"
                >
                  Established Year
                </label>
                <div className="mt-1">
                  <input
                    id="established-year"
                    name="established-year"
                    type="text"
                    className="block w-full rounded-lg bg-slate-50 px-3 py-2 text-slate-700 shadow-sm ring-1 ring-inset ring-slate-200 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 border-0"
                  />
                </div>
              </div>
              <div className="sm:col-span-4">
                <div>
                  <div className="sm:col-span-4">
                    <div className="mt-1">
                      <label
                        htmlFor="crm-link"
                        className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5 ml-0.5"
                      >
                        College CRM Link
                      </label>
                      <div className="flex items-center rounded-lg bg-slate-50 px-3 py-2 outline-none ring-1 ring-inset ring-slate-200 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                        <span className="select-none text-slate-500 sm:text-sm">
                          college.com/
                        </span>
                        <input
                          id="crm-link"
                          name="crm-link"
                          type="text"
                          placeholder="janesmith"
                          className="block flex-1 border-0 bg-transparent py-0 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-span-full">
                <label
                  htmlFor="about"
                  className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5 ml-0.5"
                >
                  About College
                </label>
                <div className="mt-1">
                  <textarea
                    id="about"
                    name="about"
                    rows={3}
                    className="block w-full rounded-lg bg-slate-50 px-3 py-2 text-slate-700 shadow-sm ring-1 ring-inset ring-slate-200 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 border-0"
                    defaultValue={""}
                  />
                </div>
                <p className="mt-1 text-xs text-slate-500">
                  Write a few sentences about College.
                </p>
              </div>{" "}
              <div className="col-span-full">
                <label
                  htmlFor="highlights"
                  className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5 ml-0.5"
                >
                  College Highlight
                </label>
                <div className="mt-1">
                  <textarea
                    id="highlights"
                    name="highlights"
                    rows={3}
                    className="block w-full rounded-lg bg-slate-50 px-3 py-2 text-slate-700 shadow-sm ring-1 ring-inset ring-slate-200 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 border-0"
                    defaultValue={""}
                  />
                </div>
                <p className="mt-1 text-xs text-slate-500">
                  Write a few sentences about College Highlights.
                </p>
              </div>
              <div className="col-span-full">
                <label
                  htmlFor="cover-photo"
                  className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5 ml-0.5"
                >
                  Upload a College Image
                </label>
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-slate-300 px-6 py-10 bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer">
                  <div className="text-center">
                    <PhotoIcon
                      aria-hidden="true"
                      className="mx-auto size-12 text-slate-300"
                    />
                    <div className="mt-4 flex text-sm leading-6 text-slate-600 bg-transparent justify-center">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-md bg-transparent font-semibold text-indigo-600 focus-within:outline-none hover:text-indigo-500"
                      >
                        <span>Upload a College image</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only"
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs leading-5 text-slate-500">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                </div>
              </div>
            </div>

        <div className="mt-6 flex items-center justify-end gap-x-4 border-t border-slate-100 pt-6">
          <button
            type="button"
            className="text-sm font-semibold leading-6 text-slate-600 hover:text-slate-900"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-bold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-all"
          >
            Save Changes
          </button>
        </div>
      </form>
      </div>
      </div>
    </div>
  );
}

export default CollegeProfile;
