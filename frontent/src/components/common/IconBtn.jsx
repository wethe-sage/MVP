export default function IconBtn({
  text,
  onclick,
  children,
  disabled,
  outline = false,
  customClasses,
  type,
}) {
  return (
    <button
      disabled={disabled}
      onClick={onclick}
      className={`flex items-center ${
        outline ? "border border-[#BCAD3C] bg-transparent" : "bg-[#BCAD3C]"
      } cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold text-white ${customClasses}`}
      type={type}
    >
      {children ? (
        <>
          <span className={`${outline && "text-[#BCAD3C]"}`}>{text}</span>
          {children}
        </>
      ) : (
        text
      )}
    </button>
  )
}