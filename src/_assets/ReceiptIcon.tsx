'use client';
import { useRouter } from 'next/navigation';

const ReceiptIcon = ({
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
        width={width || '22px'}
        height={height || '22px'}
        version="1.1"
        id="_x31_6_invoice"
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        viewBox="0 0 3872.983 3872.983">
        <g>
          <path
            d="M3102.943,2723.846h-495.742c0,0-0.074-2217.49-0.094-2218.109c-0.039-1.228-0.07-2.455-0.186-3.679
		c-0.084-0.892-0.623-4.642-0.816-5.635c-0.185-0.955-0.433-1.885-0.664-2.823c-0.223-0.907-1.31-4.546-1.633-5.458
		c-0.312-0.884-0.61-1.771-0.967-2.642c-0.358-0.874-0.768-1.718-1.167-2.571c-0.407-0.872-0.801-1.747-1.254-2.603
		c-0.443-0.836-0.937-1.636-1.419-2.446c-0.487-0.822-0.957-1.648-1.488-2.45c-0.569-0.859-1.194-1.674-1.806-2.5
		c-0.519-0.699-1.01-1.411-1.564-2.092c-0.797-0.98-1.656-1.902-2.513-2.828c-0.401-0.433-0.754-0.893-1.171-1.317
		c-0.051-0.052-0.108-0.095-0.159-0.147c-1.049-1.058-2.164-2.049-3.291-3.026c-0.341-0.296-0.661-0.629-1.007-0.916
		c-1.451-1.199-2.961-2.329-4.526-3.386c-0.937-0.633-1.914-1.176-2.878-1.749c-0.67-0.399-1.315-0.834-2.002-1.206
		c-0.94-0.508-1.912-0.931-2.874-1.384c-0.763-0.362-1.506-0.758-2.288-1.086c-0.879-0.368-1.78-0.655-2.672-0.978
		c-0.903-0.328-1.789-0.69-2.711-0.974c-0.87-0.267-1.757-0.452-2.635-0.677c-0.964-0.248-1.914-0.534-2.896-0.733
		c-1.855-0.376-3.725-0.661-5.602-0.855c-0.456-0.047-0.926-0.041-1.385-0.078c-1.473-0.117-2.948-0.218-4.425-0.224
		c-0.077,0-0.152-0.011-0.229-0.011c-0.627,0-1.234,0.074-1.857,0.094c-1.225,0.038-2.45,0.07-3.671,0.185
		c-0.895,0.084-1.767,0.236-2.649,0.36c-0.998,0.141-1.996,0.263-2.987,0.456c-0.961,0.187-1.897,0.436-2.841,0.669
		c-0.898,0.221-1.798,0.426-2.688,0.691c-0.938,0.28-1.848,0.617-2.765,0.941c-0.881,0.312-1.763,0.608-2.632,0.963
		c-0.869,0.357-1.707,0.764-2.554,1.16c-0.881,0.411-1.765,0.809-2.629,1.266c-0.813,0.431-1.592,0.913-2.381,1.381
		c-0.847,0.501-1.698,0.985-2.525,1.534c-0.813,0.54-1.583,1.131-2.367,1.709c-0.747,0.551-1.505,1.077-2.231,1.668
		c-0.887,0.722-1.719,1.505-2.563,2.277c-0.514,0.471-1.057,0.893-1.558,1.385l-255.603,251.391l-255.606-251.391
		c-22.697-22.315-59.1-22.321-81.797,0.006l-255.973,251.784l-255.583-246.362c-22.754-21.939-58.844-21.757-81.375,0.41
		l-255.147,250.981L811.35,466.415c-0.017-0.017-0.036-0.031-0.053-0.048c-1.345-1.346-2.758-2.626-4.229-3.836
		c-0.77-0.634-1.581-1.187-2.374-1.775c-0.734-0.544-1.443-1.116-2.203-1.625c-0.914-0.614-1.864-1.147-2.804-1.704
		c-0.695-0.412-1.371-0.853-2.084-1.236c-0.948-0.51-1.923-0.941-2.892-1.394c-0.758-0.355-1.499-0.738-2.274-1.06
		c-0.944-0.392-1.908-0.709-2.867-1.05c-0.838-0.298-1.662-0.624-2.518-0.885c-0.979-0.298-1.975-0.518-2.965-0.763
		c-0.855-0.212-1.697-0.457-2.566-0.631c-1.233-0.246-2.478-0.402-3.722-0.568c-0.642-0.085-1.269-0.216-1.918-0.28
		c-1.939-0.194-3.884-0.294-5.83-0.295c-0.003,0-0.006,0-0.01,0c-0.072,0-0.141,0.01-0.213,0.011
		c-1.847,0.006-3.694,0.099-5.534,0.28c-0.747,0.073-1.471,0.214-2.208,0.315c-1.148,0.157-2.296,0.298-3.434,0.524
		c-0.881,0.175-1.735,0.417-2.601,0.631c-0.979,0.241-1.96,0.461-2.928,0.753c-0.872,0.263-1.715,0.59-2.57,0.894
		c-0.94,0.333-1.886,0.646-2.812,1.029c-0.808,0.335-1.583,0.727-2.373,1.096c-0.937,0.438-1.878,0.856-2.795,1.347
		c-0.76,0.407-1.483,0.869-2.223,1.309c-0.893,0.53-1.795,1.037-2.665,1.619c-0.812,0.543-1.574,1.146-2.357,1.727
		c-0.742,0.551-1.499,1.068-2.22,1.659c-1.176,0.964-2.289,2-3.386,3.051c-0.278,0.266-0.578,0.494-0.852,0.767
		c-0.012,0.013-0.022,0.026-0.035,0.038c-1.357,1.354-2.645,2.777-3.863,4.259c-0.566,0.688-1.057,1.414-1.586,2.122
		c-0.611,0.815-1.246,1.61-1.814,2.458c-0.575,0.857-1.072,1.748-1.596,2.628c-0.449,0.753-0.926,1.488-1.342,2.263
		c-0.479,0.893-0.884,1.813-1.313,2.726c-0.383,0.813-0.792,1.61-1.139,2.443c-0.366,0.881-0.659,1.783-0.979,2.677
		c-0.324,0.901-0.673,1.789-0.954,2.711c-0.269,0.887-0.465,1.789-0.691,2.686c-0.24,0.949-0.509,1.886-0.702,2.853
		c-0.21,1.055-0.335,2.12-0.486,3.184c-0.117,0.821-0.277,1.628-0.359,2.459c-0.19,1.914-0.289,3.835-0.29,5.757
		c0,0.016-0.003,0.031-0.003,0.047v1458.064V3030.04c0,217.075,176.602,393.677,393.677,393.677h29.161h1560.129
		c257.274,0,466.581-209.306,466.581-466.581v-174.968C3161.266,2749.96,3135.154,2723.846,3102.943,2723.846z M828.363,3030.04
		V1965.653V648.728l196.819,197.479c11.391,11.425,26.348,17.149,41.313,17.149c14.766,0,29.543-5.576,40.897-16.745
		l255.967-251.784l255.583,246.362c22.754,21.939,58.844,21.751,81.375-0.41l255.563-251.385l255.603,251.391
		c22.697,22.315,59.097,22.315,81.794,0l197.28-194.029v2077.09H1469.911c-32.211,0-58.323,26.114-58.323,58.323v247.871
		c0,152.755-124.277,277.032-277.032,277.032h-29.161C952.64,3307.072,828.363,3182.795,828.363,3030.04z M3044.621,2957.137
		c0,192.954-156.981,349.935-349.936,349.935H1414.001c2.008-2.025,3.915-4.149,5.879-6.217c2.173-2.288,4.385-4.538,6.503-6.877
		c2.116-2.338,4.135-4.761,6.195-7.149c2.044-2.369,4.131-4.7,6.119-7.118c2.033-2.47,3.962-5.026,5.935-7.548
		c1.902-2.431,3.851-4.823,5.696-7.299c1.943-2.607,3.778-5.295,5.657-7.95c1.758-2.485,3.566-4.931,5.268-7.457
		c1.838-2.727,3.562-5.535,5.333-8.31c1.624-2.544,3.299-5.051,4.865-7.634c1.724-2.844,3.328-5.764,4.981-8.654
		c1.487-2.597,3.029-5.16,4.458-7.794c1.607-2.965,3.09-6.003,4.623-9.013c1.345-2.64,2.75-5.246,4.037-7.921
		c1.484-3.084,2.836-6.238,4.241-9.365c1.202-2.677,2.468-5.318,3.611-8.025c1.351-3.198,2.564-6.461,3.832-9.701
		c1.062-2.712,2.19-5.389,3.192-8.13c1.218-3.329,2.293-6.725,3.423-10.097c0.91-2.714,1.89-5.394,2.742-8.133
		c1.077-3.464,2.004-6.99,2.986-10.494c0.761-2.714,1.597-5.395,2.301-8.133c0.915-3.554,1.674-7.169,2.491-10.763
		c0.623-2.743,1.326-5.456,1.891-8.221c0.763-3.729,1.364-7.515,2.02-11.282c0.467-2.681,1.017-5.332,1.43-8.031
		c0.604-3.956,1.038-7.965,1.524-11.957c0.311-2.562,0.711-5.097,0.973-7.674c0.443-4.362,0.706-8.774,1.005-13.177
		c0.153-2.25,0.396-4.476,0.511-6.736c0.339-6.682,0.512-13.406,0.512-20.171v-189.548h1516.387V2957.137z"
          />
          <path
            d="M1674.04,1586.556h641.548c32.211,0,58.323-26.114,58.323-58.323s-26.111-58.323-58.323-58.323H1674.04
		c-32.211,0-58.323,26.114-58.323,58.323S1641.829,1586.556,1674.04,1586.556z"
          />
          <path
            d="M1644.879,1849.008h670.71c32.211,0,58.323-26.114,58.323-58.323c0-32.208-26.111-58.323-58.323-58.323h-670.71
		c-32.211,0-58.323,26.114-58.323,58.323C1586.556,1822.894,1612.668,1849.008,1644.879,1849.008z"
          />
          <path
            d="M1003.331,2111.459h1312.258c32.211,0,58.323-26.114,58.323-58.323c0-32.208-26.111-58.323-58.323-58.323H1003.331
		c-32.211,0-58.323,26.114-58.323,58.323C945.008,2085.345,971.119,2111.459,1003.331,2111.459z"
          />
          <path
            d="M2373.911,2315.588c0-32.208-26.111-58.323-58.323-58.323H1003.331c-32.211,0-58.323,26.114-58.323,58.323
		s26.111,58.323,58.323,58.323h1312.258C2347.8,2373.911,2373.911,2347.797,2373.911,2315.588z"
          />
          <path
            d="M1324.105,1586.556h-320.774c-32.211,0-58.323,26.114-58.323,58.323c0,32.208,26.111,58.323,58.323,58.323h131.226v87.484
		c0,32.208,26.111,58.323,58.323,58.323c32.211,0,58.323-26.114,58.323-58.323v-87.484h72.903
		c96.477,0,174.968-78.491,174.968-174.968s-78.491-174.968-174.968-174.968h-204.129c-32.16,0-58.323-26.165-58.323-58.323
		c0-32.157,26.163-58.323,58.323-58.323h320.774c32.211,0,58.323-26.114,58.323-58.323s-26.111-58.323-58.323-58.323h-189.548
		v-87.484c0-32.208-26.111-58.323-58.323-58.323c-32.211,0-58.323,26.114-58.323,58.323v87.484h-14.581
		c-96.477,0-174.968,78.49-174.968,174.968s78.491,174.968,174.968,174.968h204.129c32.16,0,58.323,26.165,58.323,58.323
		C1382.427,1560.391,1356.265,1586.556,1324.105,1586.556z"
          />
        </g>
      </svg>{' '}
    </div>
  );
};

export default ReceiptIcon;
