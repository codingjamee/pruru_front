const RightSvg = ({
  className,
  width,
  height,
  onClick,
  cyAttribute,
}: {
  className?: string;
  width?: number;
  height?: number;
  onClick?: () => void;
  cyAttribute?: string;
}) => {
  return (
    <div data-cy={cyAttribute} className={className} onClick={onClick}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        width={width || '22px'}
        height={height || '22px'}
        strokeWidth={1.5}
        stroke="currentColor"
        className="h-6 w-6">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m8.25 4.5 7.5 7.5-7.5 7.5"
        />
      </svg>
    </div>
  );
};

export default RightSvg;
