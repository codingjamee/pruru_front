'use client';
import { useRouter } from 'next/navigation';

const AddList = ({
  width,
  height,
  path,
}: {
  width?: number;
  height?: number;
  path?: string;
}) => {
  const router = useRouter();
  const onClick = () => {
    path && router.push(path);
  };

  return (
    <div onClick={onClick}>
      <svg
        version="1.1"
        id="Capa_1"
        xmlns="http://www.w3.org/2000/svg"
        width={width || '22px'}
        height={height || '22px'}
        viewBox="0 0 792 792">
        <g>
          <g>
            <path d="M216,684h216c0-12.42,1.584-24.48,4.536-36H216V684z" />
            <polygon points="612,792 612,720 684,720 684,648 612,648 612,576 540,576 540,648 468,648 468,720 540,720 540,792 		" />
            <path d="M576,540H216v36h264.744C506.124,553.608,539.496,540,576,540z" />
            <rect x="216" y="216" width="360" height="36" />
            <rect x="216" y="432" width="360" height="36" />
            <path
              d="M684,158.4L526.896,0H125.46c0,0-17.46,0-17.46,17.604V774.36C108,792,125.46,792,125.46,792h355.284
       c-11.664-10.296-21.636-22.464-29.484-36H144V36h360v108c0,36,36,36,36,36h108v379.26c13.536,7.849,25.704,17.82,36,29.484V158.4z
       "
            />
            <rect x="216" y="108" width="216" height="36" />
            <rect x="216" y="324" width="360" height="36" />
          </g>
        </g>
      </svg>
    </div>
  );
};

export default AddList;
