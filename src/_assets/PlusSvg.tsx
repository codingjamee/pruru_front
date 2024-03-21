const PlusSvg = ({
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
        strokeWidth="1.5"
        stroke="currentColor"
        width={width || '22px'}
        height={height || '22px'}
        className="h-6 w-6">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
        />
      </svg>
    </div>
  );
};

export default PlusSvg;
