import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { FaEye, FaEyeSlash, FaCloudUploadAlt, FaUniversity, FaArrowLeft } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";
import imageCompression from "browser-image-compression";
import { getStateList } from "../../../../Redux/features/University/UniversitySlice";
import { UpdateAdminCollege } from "../../../../Redux/features/admin/AdminSlice";
import { resolveCollegeMediaUrl } from "../../../../api/constants";

const AdminEditCollege = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [logoPreview, setLogoPreview] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    const collegeData = location.state?.college;
    const StateLists = useSelector((state) => state?.university?.stateList);

    useEffect(() => {
        dispatch(getStateList());
        if (!collegeData) {
            toast.error("No college data found");
            navigate("/admin/colleges");
        }
    }, [dispatch, collegeData, navigate]);

    useEffect(() => {
        if (StateLists) {
            setIsLoading(false);
        }
    }, [StateLists]);

    useEffect(() => {
        if (collegeData) {
            setLogoPreview(
                resolveCollegeMediaUrl(
                    collegeData.logo_url,
                    collegeData.logo,
                    "logo"
                )
            );
            setImagePreview(
                resolveCollegeMediaUrl(
                    collegeData.image_url,
                    collegeData.image,
                    "image"
                )
            );
        }
    }, [collegeData]);

    const initialValues = {
        name: collegeData?.name || "",
        university_name: collegeData?.university_name || "",
        email: collegeData?.email || "",
        password: "", // Leave blank if not changing
        contact: collegeData?.contact || "",
        established_year: collegeData?.established_year || "",
        accrediction_grade: collegeData?.accrediction_grade || "",
        naac_grade: collegeData?.naac_grade || "",
        nirf_ranking: collegeData?.nirf_ranking || "",
        pin_code: collegeData?.pin_code || "",
        state_id: collegeData?.state_id || "",
        district: collegeData?.district || collegeData?.location || "",
        country: collegeData?.country || "",
        street: collegeData?.street || "",
        address: collegeData?.address || "",
        link: collegeData?.link || "",
        college_details: collegeData?.college_details || "",
        college_highlights: collegeData?.college_highlights || "",
        logo: null,
        image: null,
        activeStatus: collegeData?.user?.active_status ? "true" : "false",
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .required("Name is required")
            .min(3, "Name must be at least 3 characters")
            .max(255, "Name must be at most 255 characters"),
        university_name: Yup.string().required("University name is required"),
        email: Yup.string().email("Invalid email").required("Email is required"),
        contact: Yup.string()
            .nullable()
            .matches(/^\+?[0-9]{7,15}$/, {
                message: "Enter a valid contact number",
                excludeEmptyString: true,
            }),
        established_year: Yup.string()
            .nullable()
            .matches(/^\d{4}$/, {
                message: "Enter a valid four-digit year",
                excludeEmptyString: true,
            }),
        pin_code: Yup.string()
            .nullable()
            .matches(/^[0-9]{4,10}$/, {
                message: "Enter a valid pincode",
                excludeEmptyString: true,
            }),
        state_id: Yup.mixed().nullable(),
        district: Yup.string().nullable(),
        country: Yup.string().nullable(),
        street: Yup.string().nullable(),
        address: Yup.string().nullable(),
        accrediction_grade: Yup.string().nullable(),
        naac_grade: Yup.string().nullable(),
        nirf_ranking: Yup.string().nullable(),
        college_details: Yup.string().nullable(),
        college_highlights: Yup.string().nullable(),
    });

    const compressImage = async (file) => {
        const options = {
            maxSizeMB: 0.2,
            maxWidthOrHeight: 1024,
            useWebWorker: true,
        };
        try {
            const compressedFile = await imageCompression(file, options);
            return compressedFile;
        } catch (error) {
            console.error("Image compression error:", error);
            return file;
        }
    };

    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    };

    const validateFile = (file) => {
        if (!file) return true;
        if (file.size > 6 * 1024 * 1024) {
            toast.error("File size should not exceed 6MB.");
            return false;
        }
        if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
            toast.error("Only JPEG, PNG and WEBP formats are supported.");
            return false;
        }
        return true;
    };

    const handleFileUpload = (e, setFieldValue, type) => {
        const file = e.target.files?.[0];
        if (!file || !validateFile(file)) return;

        const previewURL = URL.createObjectURL(file);
        if (type === "logo") setLogoPreview(previewURL);
        if (type === "image") setImagePreview(previewURL);
        setFieldValue(type, file);
    };

    const prepareImageForUpload = async (value) => {
        if (!(value instanceof File)) return undefined;

        const compressedFile = await compressImage(value);
        return convertToBase64(compressedFile);
    };

    const onSubmit = async (values, { setSubmitting }) => {
        try {
            const updateData = { ...values };

            const base64Logo = await prepareImageForUpload(values.logo);
            const base64Image = await prepareImageForUpload(values.image);

            if (base64Logo) {
                updateData.logo = base64Logo;
            } else {
                delete updateData.logo;
            }

            if (base64Image) {
                updateData.image = base64Image;
            } else {
                delete updateData.image;
            }

            if (!updateData.password) {
                delete updateData.password;
            }

            delete updateData.activeStatus;

            await dispatch(
                UpdateAdminCollege({ id: collegeData.id, data: updateData })
            ).unwrap();

            toast.success("College updated successfully!");
            setTimeout(() => {
                navigate("/admin/colleges");
            }, 1200);
        } catch (error) {
            console.error("Error occurred during update:", error);
            toast.error(
                error?.message ||
                error?.error ||
                "College update failed. Please try again."
            );
        } finally {
            setSubmitting(false);
        }
    };

    const formFields = [
        { id: "name", placeholder: "College Name", label: "College Name", type: "text" },
        { id: "university_name", placeholder: "University Name", label: "University Name", type: "text" },
        { id: "email", placeholder: "Email Address", label: "Email", type: "email" },
        {
            id: "password",
            placeholder: "Leave empty to keep current password",
            label: "Password",
            type: showPassword ? "text" : "password",
        },
        { id: "contact", placeholder: "Contact Number", label: "Contact", type: "text" },
        { id: "established_year", placeholder: "Established Year", label: "Established Year", type: "text" },
        {
            id: "accrediction_grade",
            placeholder: "e.g., UGC, NAAC, AICTE",
            label: "Accreditation",
            type: "text",
        },
        {
            id: "naac_grade",
            placeholder: "Select NAAC Grade",
            label: "NAAC Grade",
            type: "select",
            options: ["B", "B+", "A", "A+", "A++"],
        },
        { id: "nirf_ranking", placeholder: "NIRF Ranking", label: "NIRF Ranking", type: "text" },
        { id: "pin_code", placeholder: "Pincode", label: "Pincode", type: "text" },
        { id: "state_id", placeholder: "Select State", label: "State", type: "select" },
        { id: "district", placeholder: "District", label: "District", type: "text" },
        { id: "country", placeholder: "Country", label: "Country", type: "text" },
        { id: "street", placeholder: "Street", label: "Street", type: "text" },
        { id: "address", placeholder: "Full Address", label: "Address", type: "text" },
        { id: "link", placeholder: "College CRM Link", label: "CRM Link", type: "text" },
        {
            id: "college_details",
            placeholder: "Describe College Details",
            label: "College Details",
            type: "textarea",
        },
        {
            id: "college_highlights",
            placeholder: "Describe College Highlights",
            label: "College Highlights",
            type: "textarea",
        },
    ];

    const requiredFieldIds = new Set(["name", "university_name", "email"]);

    return (
        <div className="min-h-screen p-6 font-poppins">
            <ToastContainer />
            <div className="bg-white/90 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl w-full overflow-hidden">

                {/* Header */}
                <div className="bg-slate-50 px-6 py-5 border-b border-slate-200 flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                            <FaUniversity className="text-indigo-600" />
                            Edit College
                        </h2>
                        <p className="text-slate-500 text-xs mt-1">Update college information in the system.</p>
                    </div>
                    <button
                        onClick={() => navigate('/admin/colleges')}
                        className="flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors text-xs font-medium border border-slate-200 bg-white px-3 py-1.5 rounded-lg shadow-sm hover:shadow-md"
                    >
                        <FaArrowLeft /> Back to Colleges
                    </button>
                </div>

                <div className="p-6 md:p-8">
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={onSubmit}
                        enableReinitialize={true}
                    >
                        {({ setFieldValue, isSubmitting }) => (
                            <Form className="space-y-8">

                                {/* Image Upload Section */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="bg-slate-50 p-6 rounded-xl border border-dashed border-slate-300 hover:border-blue-400 transition-colors">
                                        <label className="block mb-4 font-semibold text-slate-700">College Logo</label>
                                        <div className="flex items-center gap-6">
                                            <div className="w-24 h-24 bg-white rounded-lg shadow-sm border border-slate-200 flex items-center justify-center overflow-hidden">
                                                {logoPreview ? (
                                                    <img
                                                        src={logoPreview}
                                                        alt="Logo"
                                                        className="w-full h-full object-contain"
                                                        onError={() => setLogoPreview(null)}
                                                    />
                                                ) : (
                                                    <FaCloudUploadAlt className="text-4xl text-slate-300" />
                                                )}
                                            </div>
                                            <div className="flex-1">
                                                <input
                                                    type="file"
                                                    id="logo"
                                                    name="logo"
                                                    accept="image/jpeg,image/png,image/webp"
                                                    onChange={(e) => handleFileUpload(e, setFieldValue, "logo")}
                                                    className="block w-full text-sm text-slate-500
                                      file:mr-4 file:py-2 file:px-4
                                      file:rounded-full file:border-0
                                      file:text-sm file:font-semibold
                                      file:bg-blue-50 file:text-blue-700
                                      hover:file:bg-blue-100 transition-all cursor-pointer"
                                                />
                                                <ErrorMessage name="logo" component="div" className="text-rose-500 text-xs mt-2" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-slate-50 p-6 rounded-xl border border-dashed border-slate-300 hover:border-blue-400 transition-colors">
                                        <label className="block mb-4 font-semibold text-slate-700">College Cover Image</label>
                                        <div className="flex items-center gap-6">
                                            <div className="w-32 h-24 bg-white rounded-lg shadow-sm border border-slate-200 flex items-center justify-center overflow-hidden">
                                                {imagePreview ? (
                                                    <img
                                                        src={imagePreview}
                                                        alt="Preview"
                                                        className="w-full h-full object-cover"
                                                        onError={() => setImagePreview(null)}
                                                    />
                                                ) : (
                                                    <FaCloudUploadAlt className="text-4xl text-slate-300" />
                                                )}
                                            </div>
                                            <div className="flex-1">
                                                <input
                                                    type="file"
                                                    id="image"
                                                    name="image"
                                                    accept="image/jpeg,image/png,image/webp"
                                                    onChange={(e) => handleFileUpload(e, setFieldValue, "image")}
                                                    className="block w-full text-sm text-slate-500
                                      file:mr-4 file:py-2 file:px-4
                                      file:rounded-full file:border-0
                                      file:text-sm file:font-semibold
                                      file:bg-blue-50 file:text-blue-700
                                      hover:file:bg-blue-100 transition-all cursor-pointer"
                                                />
                                                <ErrorMessage name="image" component="div" className="text-rose-500 text-xs mt-2" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Form Fields Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                                    {formFields.map(({ id, placeholder, label, type, options }) => (
                                        <div key={id} className={`flex flex-col ${type === 'textarea' ? 'md:col-span-3' : ''}`}>
                                            <label htmlFor={id} className="mb-1 text-xs font-bold text-slate-600 ml-1 uppercase tracking-wide">
                                                {label}
                                                {requiredFieldIds.has(id) && (
                                                    <span className="text-rose-500"> *</span>
                                                )}
                                            </label>
                                            <div className="relative">
                                                {type === "select" ? (
                                                    <Field
                                                        as="select"
                                                        id={id}
                                                        name={id}
                                                        className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all placeholder:text-slate-400 text-slate-700 text-sm appearance-none"
                                                    >
                                                        <option value="">Select {label}</option>
                                                        {id === "state_id" ? (
                                                            StateLists && StateLists.length > 0 ? (
                                                                StateLists.map((state) => (
                                                                    <option key={state.id} value={state.id}>{state.state}</option>
                                                                ))
                                                            ) : (
                                                                <option value="" disabled>{isLoading ? "Loading..." : "No states available"}</option>
                                                            )
                                                        ) : (
                                                            options?.map((opt) => (
                                                                <option key={opt} value={opt}>{opt}</option>
                                                            ))
                                                        )}
                                                    </Field>
                                                ) : type === "textarea" ? (
                                                    <Field
                                                        as="textarea"
                                                        id={id}
                                                        name={id}
                                                        rows="3"
                                                        className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all placeholder:text-slate-400 text-slate-700 text-sm resize-none"
                                                        placeholder={placeholder}
                                                    />
                                                ) : (
                                                    <Field
                                                        id={id}
                                                        name={id}
                                                        type={type}
                                                        className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all placeholder:text-slate-400 text-slate-700 text-sm"
                                                        placeholder={placeholder}
                                                    />
                                                )}

                                                {/* Password Toggle */}
                                                {id === "password" && (
                                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 cursor-pointer hover:text-blue-500 transition-colors" onClick={() => setShowPassword(!showPassword)}>
                                                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                                                    </div>
                                                )}
                                            </div>
                                            <ErrorMessage name={id} component="div" className="text-rose-500 text-xs mt-1 ml-1" />
                                        </div>
                                    ))}
                                </div>

                                <div className="pt-4 border-t border-slate-100">
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl shadow-md hover:shadow-lg transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                                Updating...
                                            </>
                                        ) : (
                                            <>
                                                <FaUniversity className="text-lg" />
                                                Update College
                                            </>
                                        )}
                                    </button>
                                </div>

                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    );
};

export default AdminEditCollege;
