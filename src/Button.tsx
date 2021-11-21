import classnames from "classnames";
export function Button({
  className,
  ...props
}: React.ComponentProps<"button">) {
  const classNames = classnames(
    "px-4 my-1 rounded-md transition-all shadow-none transform translate-y-0 hover:-translate-y-0.5 hover:shadow-lg border-2 border-black text-center",
    className
  );
  return <button className={classNames} {...props} />;
}
