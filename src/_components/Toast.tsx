'use client';
import {
  Children,
  ReactElement,
  SetStateAction,
  cloneElement,
  createContext,
  // useContext,
  useEffect,
  useState,
} from 'react';
import BackDrop from './BackDrop';
import Portal from './Portal';

interface ToastContextType {
  show: boolean;
  setShow: React.Dispatch<SetStateAction<boolean>>;
}

interface ToastPropsType {
  children: ReactElement | ReactElement[];
  time?: number;
  show?: boolean;
  setShow?: React.Dispatch<SetStateAction<boolean>>;
  position?: { x: number; y: number };
  toastPosCls?: 'top' | 'middle' | 'bottom';
}

const ToastContext = createContext<ToastContextType | null>(null);

export const ToastProvider = (props: ToastPropsType) => {
  const [show, setShow] = useState(false);
  const value = { show, setShow };
  return (
    <ToastContext.Provider value={value}>
      {props.children}
    </ToastContext.Provider>
  );
};

const Toast = ({
  children,
  time = 1000,
  setShow,
  show,
  position,
  toastPosCls = 'middle',
  ...props
}: ToastPropsType) => {
  const onClickBackDrop = () => {
    setShow?.(false);
  };

  const positionStyle = {
    position: 'relative',
    left: position && `${position.x + 20}px`,
    top: position && `${position.y + 50}px`,
  };

  const positionedElement = Children.map(children, (ch) => {
    return cloneElement(ch, {
      ...props,
      style: positionStyle,
      toastPosCls: toastPosCls,
      show,
    });
  });

  useEffect(() => {
    const timeoutShow = setTimeout(() => {
      setShow?.(false);
    }, time);
    return () => {
      clearTimeout(timeoutShow);
    };
  }, [show]);

  return (
    <>
      {show && (
        <Portal portalTargetId="toast">
          <BackDrop onClick={onClickBackDrop} />
          <div className="absolute h-screen w-screen whitespace-pre-line">
            {positionedElement}
          </div>
        </Portal>
      )}
    </>
  );
};

export default Toast;
