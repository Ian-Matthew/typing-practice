import classnames from "classnames";
export function Button({
  className,
  ...props
}: React.ComponentProps<"button">) {
  const classNames = classnames(
    "px-4 py-2 text-white my-1 font-medium font-display bg-black rounded-md transition-all shadow-none transform translate-y-0 hover:-translate-y-0.5 hover:shadow-lg  text-center",
    className
  );
  return <button className={classNames} {...props} />;
}
