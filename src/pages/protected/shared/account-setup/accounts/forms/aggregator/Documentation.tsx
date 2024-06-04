// import { UploadDoc } from "@/assets/icons";
import axiosInstance from "@/api/axiosInstance";
import { RootState } from "@/app/store";
import { Button, DropBox, Dropdown } from "@/components/ui";
import { idTypes } from "@/constants";
import { setUserDocs } from "@/features/userSlice";
import { OrgDocInfoForm } from "@/types/general";
import { uniqueObjectsByIdType } from "@/utils";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Oval } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
// import { CameraIcon } from "@heroicons/react/24/outline";

type Props = {
  formState: OrgDocInfoForm;
  setFormState: React.Dispatch<React.SetStateAction<OrgDocInfoForm>>;
};

const Documentation = ({ formState, setFormState }: Props) => {
  const dispatch = useDispatch();

  const doc = uniqueObjectsByIdType(
    useSelector((state: RootState) => state.user?.user?.doc ?? null)
  );

  const userData = useSelector((state: RootState) => state.user?.user);

  const setContactDoc = useMutation({
    mutationFn: (docData: FormData) =>
      axiosInstance.post(`/users/upload/doc`, docData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }),
    mutationKey: ["doc-submission"],
    onError: (error: any) => {
      toast.error(error.response.data.message);
    },
    onSuccess: (data) => {
      toast.success(`${data.data.message}`, {
        duration: 10000,
      });
      console.log(data);
      dispatch(setUserDocs(data.data.data.doc));
      // navigate("/dashboard");
    },
  });

  const setCertOfInc = useMutation({
    mutationFn: (docData: FormData) =>
      axiosInstance.post(`/users/org/upload/doc`, docData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }),
    mutationKey: ["cert-of-inc-submission"],
    onError: (error: any) => {
      toast.error(error.response.data.message);
    },
    onSuccess: (data) => {
      toast.success(`${data.data.message}`, {
        duration: 10000,
      });
      dispatch(setUserDocs(data.data.data.doc));
      // navigate("/dashboard");
    },
  });

  const setLetterOfAuth = useMutation({
    mutationFn: (docData: FormData) =>
      axiosInstance.post(`/users/org/upload/doc`, docData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }),
    mutationKey: ["letter-of-auth-submission"],
    onError: (error: any) => {
      toast.error(error.response.data.message);
    },
    onSuccess: (data) => {
      toast.success(`${data.data.message}`, {
        duration: 10000,
      });

      dispatch(setUserDocs(data.data.data.doc));
      // navigate("/dashboard");
    },
  });

  const setCertOfAuth = useMutation({
    mutationFn: (docData: FormData) =>
      axiosInstance.post(`/users/org/upload/doc`, docData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }),
    mutationKey: ["cert-of-auth-submission"],
    onError: (error: any) => {
      toast.error(error.response.data.message);
    },
    onSuccess: (data) => {
      toast.success(`${data.data.message}`, {
        duration: 10000,
      });

      dispatch(setUserDocs(data.data.data.doc));
      // navigate("/dashboard");
    },
  });

  const handleDocSubmission = () => {
    const formData = new FormData();

    if (formState.contactDoc === null) {
      return;
    }
    if (formState.contactDoc !== null) {
      formData.append("idType", formState.idType.value);
      formData.append("file", formState.contactDoc[0]);
    }
    setContactDoc.mutate(formData);
  };
  const handleCertOfIncSubmission = () => {
    const formData = new FormData();

    if (formState.certOfInc === null) {
      return;
    }
    if (formState.certOfInc !== null) {
      formData.append("idType", "Certificate of Incorporation");
      formData.append("file", formState.certOfInc[0]);
    }

    setCertOfInc.mutate(formData);
  };
  const handleCertOfAuthSubmission = () => {
    const formData = new FormData();

    if (formState.certOfAuth === null) {
      return;
    }
    if (formState.certOfAuth !== null) {
      formData.append("idType", "Certificate of Authorization");
      formData.append("file", formState.certOfAuth[0]);
    }
    setCertOfAuth.mutate(formData);
  };
  const handleLetterOfAuthSubmission = () => {
    const formData = new FormData();

    if (formState.letterOfAuth === null) {
      return;
    }
    if (formState.letterOfAuth !== null) {
      formData.append("idType", "Letter of Authorization");
      formData.append("file", formState.letterOfAuth[0]);
    }
    setCertOfAuth.mutate(formData);
  };

  console.log(doc);

  return (
    <div className="">
      <div className="p-6 px-14 pt-10 bg-white my-10 pb-20 rounded-xl flex flex-col gap-y-6">
        <p className="font-poppins font-semibold text-lg">
          Identity Verification
        </p>
        <p>
          Upload Valid ID card ( Valid passport data page, Driver's license,
          Resident permit, or any other valid Government Issued means of
          identification.) *
        </p>
        <div className="mb-10 pb-20 flex flex-col gap-y-6">
          {!Boolean(
            (doc as any[]).filter(
              (doc) =>
                doc.idType !== "Certificate of Incorporation" &&
                doc.idType !== "Certificate of Authorization"
            ).length
          ) && (
            <Dropdown
              name="idType"
              labelClassName="mb-4 text-[#000000_!important]"
              options={idTypes}
              label="ID Card type"
              wrapperClassName="bg-gray-100 w-full"
              placeholder="Select ID card type"
              value={formState.idType}
              onOptionChange={(value) =>
                setFormState((prev) => ({
                  ...prev,
                  idType: value,
                }))
              }
            />
          )}
          {/* Contact user doc */}
          <div>
            <p className="text-black">ID of contact person *</p>

            {!Boolean(
              (doc as any[]).filter(
                (doc) =>
                  doc.idType !== "Certificate of Incorporation" &&
                  doc.idType !== "Certificate of Authorization"
              ).length
            ) && (
              <DropBox
                value={formState.contactDoc}
                setFiles={setFormState}
                docName="contactDoc"
              />
            )}

            <div className="mt-2 flex justify-start">
              {Boolean(
                (doc as any[]).filter(
                  (doc) =>
                    doc.idType !== "Certificate of Incorporation" &&
                    doc.idType !== "Certificate of Authorization"
                ).length
              ) ? (
                <Button
                  disabled={setContactDoc.isPending}
                  variant={"outline"}
                  className="text-white bg-green-500"
                >
                  <span>Submitted</span>
                </Button>
              ) : (
                <>
                  {Boolean(formState.contactDoc !== null) && (
                    <Button
                      disabled={setContactDoc.isPending}
                      className="text-white"
                      onClick={handleDocSubmission}
                    >
                      {setContactDoc.isPending ? (
                        <Oval
                          visible={setContactDoc.isPending}
                          height="20"
                          width="20"
                          color="#ffffff"
                          ariaLabel="oval-loading"
                          wrapperStyle={{}}
                          wrapperClass=""
                        />
                      ) : (
                        <span>Upload</span>
                      )}
                    </Button>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Cert of Inc */}
          <div>
            <p className="text-black">Certificate of Incorporation *</p>
            {!Boolean(
              (doc as any[]).filter(
                (doc) => doc.idType === "Certificate of Incorporation"
              ).length
            ) && (
              <DropBox
                value={formState.certOfInc}
                setFiles={setFormState}
                docName="certOfInc"
              />
            )}
            <div className="mt-2 flex justify-start">
              {Boolean(
                (doc as any[]).filter(
                  (doc) => doc.idType === "Certificate of Incorporation"
                ).length
              ) ? (
                <Button
                  disabled={setCertOfInc.isPending}
                  variant={"outline"}
                  className="text-white bg-green-500"
                >
                  <span>Submitted</span>
                </Button>
              ) : (
                <>
                  {Boolean(formState.certOfInc !== null) && (
                    <Button
                      disabled={setCertOfInc.isPending}
                      className="text-white"
                      onClick={handleCertOfIncSubmission}
                    >
                      {setCertOfInc.isPending ? (
                        <Oval
                          visible={setCertOfInc.isPending}
                          height="20"
                          width="20"
                          color="#ffffff"
                          ariaLabel="oval-loading"
                          wrapperStyle={{}}
                          wrapperClass=""
                        />
                      ) : (
                        <span>Upload</span>
                      )}
                    </Button>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Letter of auth */}
          <div>
            <p className="text-black">
              Letter of authorization to open account *
            </p>
            {!Boolean(
              (doc as any[]).filter(
                (doc) => doc.idType === "Certificate of Authorization"
              ).length
            ) && (
              <DropBox
                value={formState.certOfAuth}
                setFiles={setFormState}
                docName="certOfAuth"
              />
            )}
            <div className="mt-2 flex justify-start">
              {Boolean(
                (doc as any[]).filter(
                  (doc) => doc.idType === "Certificate of Authorization"
                ).length
              ) ? (
                <Button
                  disabled={setCertOfAuth.isPending}
                  variant={"outline"}
                  className="text-white bg-green-500"
                >
                  <span>Submitted</span>
                </Button>
              ) : (
                <>
                  {Boolean(formState.certOfAuth !== null) && (
                    <Button
                      disabled={setCertOfAuth.isPending}
                      className="text-white"
                      onClick={handleCertOfAuthSubmission}
                    >
                      {setCertOfAuth.isPending ? (
                        <Oval
                          visible={setCertOfAuth.isPending}
                          height="20"
                          width="20"
                          color="#ffffff"
                          ariaLabel="oval-loading"
                          wrapperStyle={{}}
                          wrapperClass=""
                        />
                      ) : (
                        <span>Upload</span>
                      )}
                    </Button>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Letter of auth */}
          {(userData?.roles[0] === "INSURANCE" ||
            userData?.roles[0] === "FINANCIAL_INSTITUTION") && (
            <div>
              <p className="text-black">
                Certificate of registration with regulator *
              </p>
              {!Boolean(
                (doc as any[]).filter(
                  (doc) => doc.idType === "Letter of Authorization"
                ).length
              ) && (
                <DropBox
                  value={formState.letterOfAuth}
                  setFiles={setFormState}
                  docName="letterOfAuth"
                />
              )}
              <div className="mt-2 flex justify-start">
                {Boolean(
                  (doc as any[]).filter(
                    (doc) => doc.idType === "Letter of Authorization"
                  ).length
                ) ? (
                  <Button
                    disabled={setLetterOfAuth.isPending}
                    variant={"outline"}
                    className="text-white bg-green-500"
                  >
                    <span>Submitted</span>
                  </Button>
                ) : (
                  <>
                    {Boolean(formState.letterOfAuth !== null) && (
                      <Button
                        disabled={setLetterOfAuth.isPending}
                        className="text-white"
                        onClick={handleLetterOfAuthSubmission}
                      >
                        {setLetterOfAuth.isPending ? (
                          <Oval
                            visible={setLetterOfAuth.isPending}
                            height="20"
                            width="20"
                            color="#ffffff"
                            ariaLabel="oval-loading"
                            wrapperStyle={{}}
                            wrapperClass=""
                          />
                        ) : (
                          <span>Upload</span>
                        )}
                      </Button>
                    )}
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Documentation;
